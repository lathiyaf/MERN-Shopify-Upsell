import { logger, level } from "../../config/logger.js";
import orderModel from "../../models/order.js";
import * as pipeline from "../../aggregate_pipeline/extension.js";
import funnelOrderModel from "../../models/funnel_order.js";
import moment from "moment-timezone";
import offerAcceptModel from "../../models/offer_accept.js";

// ? Remaining Statistics
/**
 * Value per order
 * ROI
 * AOV increase
 * Conversion rate
 */

export const todayStatistics = async (day, session) => {
  logger.log(level.info, `>> todayStatistics()`);
  let hours = 0;
  let hoursData = [];
  let funnelOrderHoursData = [];
  let offset = 5.5;
  let totalCount = 0;
  let offerData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let declineOfferData = [];

  while (hours <= 23) {
    let nextHours = hours + 4;
    let ampm;
    let twelveHourFormat;

    if (hours === 0 || hours === 12) {
      twelveHourFormat = 12;
      ampm = hours < 12 ? "am" : "pm";
    } else {
      twelveHourFormat = hours % 12;
      ampm = hours < 12 ? "am" : "pm";
    }

    let formattedTime = twelveHourFormat + ampm;

    if (formattedTime === "0am") {
      formattedTime = "12am";
    }
    //! Original Order Data
    const countOrderDays = await countData(
      hours,
      nextHours,
      day,
      orderModel,
      offset,
      session.shop
    );
    hoursData.push({
      key: formattedTime,
      value: Number(countOrderDays),
    });
    totalOrderCount += Number(countOrderDays);
    //! Dashboard Funnel Order Data
    const countDays = await countFunnelOrderData(
      hours,
      nextHours,
      day,
      funnelOrderModel,
      offset,
      session.shop
    );
    funnelOrderHoursData.push({
      key: formattedTime,
      value: countDays.toFixed(2),
    });
    totalCount = totalCount + countDays;
    //! Accept Offer Data
    const offerCount = await acceptTodayOfferData(
      hours,
      nextHours,
      day,
      offerAcceptModel,
      offset,
      session.shop
    );
    offerData.push({
      key: formattedTime,
      value: offerCount,
    });
    //! Decline Offer Data
    const declineOfferCount = await acceptTodayDeclineOfferData(
      hours,
      nextHours,
      day,
      offerAcceptModel,
      offset,
      session.shop
    );
    declineOfferData.push({
      key: formattedTime,
      value: declineOfferCount,
    });
    totalOfferCount = totalOfferCount + offerCount;
    hours = hours + 4;
  }

  let data = {
    compare_data: hoursData,
    compare_data1: funnelOrderHoursData,
    total_revenue: totalCount.toFixed(2),
    accept_offer_data: offerData,
    total_offer_accepted: totalOfferCount,
    revenue_ratio:
      totalOrderCount > 0
        ? ((totalCount / totalOrderCount) * 100).toFixed(2)
        : 0,
    decline_offer_data: declineOfferData,
  };

  return data;
};

export const countData = async (hours, nextHours, day, Model, offset, shop) => {
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
  };
  if (day === "today") {
    filter = {
      ...filter,
      shop,
      $and: [
        { created_at: { $gte: getTodayTime(hours, offset) } },
        { created_at: { $lt: getTodayTime(nextHours, offset) } },
      ],
    };
  }
  if (day === "yesterday") {
    filter = {
      ...filter,
      shop,
      $and: [
        { created_at: { $gte: getYesterdayTime(hours, offset) } },
        { created_at: { $lt: getYesterdayTime(nextHours, offset) } },
      ],
    };
  }

  const hoursCount = await Model.aggregate(
    pipeline.pipelineForOrderStats(filter)
  );
  return hoursCount.length > 0 ? hoursCount[0].totalAmount : 0;
};

export const countFunnelOrderData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {};
  if (day === "today") {
    filter = {
      ...filter,
      shop,
      $and: [
        { created_at: { $gte: getTodayTime(hours, offset) } },
        { created_at: { $lt: getTodayTime(nextHours, offset) } },
      ],
    };
  }
  if (day === "yesterday") {
    filter = {
      ...filter,
      shop,
      $and: [
        { created_at: { $gte: getYesterdayTime(hours, offset) } },
        { created_at: { $lt: getYesterdayTime(nextHours, offset) } },
      ],
    };
  }

  const hoursCount = await Model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return hoursCount.length > 0 ? hoursCount[0].totalAmount : 0;
};

export const getTodayTime = (hours, offset) => {
  let event = new Date();
  event.setHours(event.getHours() + offset);
  if (offset > 0) {
    event.setUTCHours(hours, 0, 0, 0);
    event.setUTCHours(event.getUTCHours() - offset);
  }
  if (offset < 0) {
    event.setUTCHours(hours, 0, 0, 0);
    event.setUTCHours(event.getUTCHours() - offset);
  }
  if (offset === 0 || !offset) {
    event.setUTCHours(hours, 0, 0, 0);
  }

  event.toISOString();
  return event;
};

export const getYesterdayTime = (hours, offset) => {
  let event = new Date();
  event.setDate(event.getDate() - 1);
  event.setHours(event.getHours() + offset);

  if (offset > 0) {
    event.setUTCHours(hours, 0, 0, 0);
    event.setUTCHours(event.getUTCHours() - offset);
  }
  if (offset < 0) {
    event.setUTCHours(hours, 0, 0, 0);
    event.setUTCHours(event.getUTCHours() - offset);
  }
  if (offset === 0 || !offset) {
    event.setUTCHours(hours, 0, 0, 0);
  }

  event.toISOString();

  return event;
};

export const lastDayStatistics = async (body, session) => {
  logger.log(level.info, `>> lastDayStatistics()`);
  let { days } = body;
  let daysData = [];
  let funnelOrderData = [];
  let totalCount = 0;
  let acceptOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let declineOfferData = [];

  while (days > 0) {
    let event = new Date();
    event.setDate(event.getDate() - days + 1);
    //! Original Order Data
    const countDays = await countDaysData(days, orderModel, session.shop);
    daysData.push({
      key: moment(event).format("MMM DD"),
      value: Number(countDays),
    });
    totalOrderCount += Number(countDays);
    //! Dashboard Funnel Order Data
    const countOrderDays = await countFODaysData(
      days,
      funnelOrderModel,
      session.shop
    );
    funnelOrderData.push({
      key: moment(event).format("MMM DD"),
      value: countOrderDays.toFixed(2),
    });
    totalCount = totalCount + countOrderDays;
    //! Accept Offer Data
    const countOfferData = await acceptLastDaysOfferData(
      days,
      offerAcceptModel,
      session.shop
    );
    acceptOfferData.push({
      key: moment(event).format("MMM DD"),
      value: countOfferData,
    });
    totalOfferCount = totalOfferCount + countOfferData;
    //! Decline Offer Data
    const countDeclineOfferData = await acceptLastDaysDeclineOfferData(
      days,
      offerAcceptModel,
      session.shop
    );
    declineOfferData.push({
      key: moment(event).format("MMM DD"),
      value: countDeclineOfferData,
    });
    days--;
  }
  let data = {
    compare_data: daysData,
    compare_data1: funnelOrderData,
    total_revenue: totalCount.toFixed(2),
    accept_offer_data: acceptOfferData,
    total_offer_accepted: totalOfferCount,
    revenue_ratio:
      totalOrderCount > 0
        ? ((totalCount / totalOrderCount) * 100).toFixed(2)
        : 0,
    decline_offer_data: declineOfferData,
  };
  return data;
};

export const countDaysData = async (day, Model, shop) => {
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
    $and: [
      { created_at: { $gte: getDay(day) } },
      {
        created_at: { $lt: getDay(day - 1) },
      },
    ],
    shop,
  };
  const daysCount = await Model.aggregate(
    pipeline.pipelineForOrderStats(filter)
  );
  return daysCount.length > 0 ? daysCount[0].totalAmount : 0;
};

export const getDay = (day) => {
  let event = new Date();
  event.setDate(event.getDate() - day + 1);
  event.setHours(0, 0, 0, 0);
  event.toISOString();
  return event;
};

export const countFODaysData = async (day, Model, shop) => {
  let filter = {
    shop,
    $and: [
      { created_at: { $gte: getDay(day) } },
      {
        created_at: { $lt: getDay(day - 1) },
      },
    ],
  };
  const daysCount = await Model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return daysCount.length > 0 ? daysCount[0].totalAmount : 0;
};

export const thisMonthStatistics = async (session) => {
  logger.log(level.info, `>> thisMonthStatistics()`);
  let day = 0;
  let thisMonthData = [];
  let thisMonthOrderData = [];
  let totalCount = 0;
  let thisMonthOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let declineMonthOfferData = [];

  while (
    moment().endOf("month").toDate() >=
    moment().startOf("month").add(day, "days").toDate()
  ) {
    //! Original Order Data
    const monthCount = await countMonthData(orderModel, day, session.shop);
    thisMonthData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: Number(monthCount),
    });
    totalOrderCount += Number(monthCount);
    //! Dashboard Funnel Order Data
    const monthOrderCount = await countOrderMonthData(
      funnelOrderModel,
      day,
      session.shop
    );
    thisMonthOrderData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: monthOrderCount.toFixed(2),
    });
    totalCount = totalCount + monthOrderCount;
    //! Accept Offer Data
    const offerCount = await acceptThisMonthOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    thisMonthOfferData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: offerCount,
    });
    totalOfferCount = totalOfferCount + offerCount;
    //! Decline Offer Data
    const declineOfferCount = await acceptThisMonthDeclineOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    declineMonthOfferData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: declineOfferCount,
    });
    day++;
  }
  let data = {
    compare_data: thisMonthData,
    compare_data1: thisMonthOrderData,
    total_revenue: totalCount.toFixed(2),
    accept_offer_data: thisMonthOfferData,
    total_offer_accepted: totalOfferCount,
    revenue_ratio:
      totalOrderCount > 0
        ? ((totalCount / totalOrderCount) * 100).toFixed(2)
        : 0,
    decline_offer_data: declineMonthOfferData,
  };
  return data;
};

export const countMonthData = async (Model, day, shop) => {
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
    $and: [
      {
        created_at: {
          $gte: moment().startOf("month").add(day, "days").toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.aggregate(
    pipeline.pipelineForOrderStats(filter)
  );
  return dataCount.length > 0 ? dataCount[0].totalAmount : 0;
};

export const countOrderMonthData = async (Model, day, shop) => {
  let filter = {
    $and: [
      {
        created_at: {
          $gte: moment().startOf("month").add(day, "days").toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return dataCount.length > 0 ? dataCount[0].totalAmount : 0;
};

export const lastMonthStatistics = async (session) => {
  logger.log(level.debug, `>> lastMonthStatistics()`);
  let day = 0;
  let lastMonthData = [];
  let lastMonthOrderdata = [];
  let totalCount = 0;
  let lastMonthOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let lastMonthDeclineOfferData = [];

  while (
    moment().endOf("month").subtract(1, "months").toDate() >=
    moment().startOf("month").subtract(1, "months").add(day, "days").toDate()
  ) {
    //! Original Order Data
    const monthsCount = await countLastMonthData(orderModel, day, session.shop);
    lastMonthData.push({
      key: moment()
        .startOf("month")
        .subtract(1, "months")
        .add(day, "days")
        .format("MMM DD"),
      value: Number(monthsCount),
    });
    totalOrderCount += Number(monthsCount);
    //! Dashboard Funnel Order Data
    const monthsOrderCount = await countLastMonthOrderData(
      funnelOrderModel,
      day,
      session.shop
    );
    lastMonthOrderdata.push({
      key: moment()
        .startOf("month")
        .subtract(1, "months")
        .add(day, "days")
        .format("MMM DD"),
      value: monthsOrderCount.toFixed(2),
    });
    totalCount = totalCount + monthsOrderCount;
    //! Accept Offer Data
    const offerCount = await acceptLastMonthOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    lastMonthOfferData.push({
      key: moment()
        .startOf("month")
        .subtract(1, "months")
        .add(day, "days")
        .format("MMM DD"),
      value: offerCount,
    });
    totalOfferCount = totalOfferCount + offerCount;
    //! Decline Offer Data
    const declineOfferCount = await acceptLastMonthDeclineOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    lastMonthDeclineOfferData.push({
      key: moment()
        .startOf("month")
        .subtract(1, "months")
        .add(day, "days")
        .format("MMM DD"),
      value: declineOfferCount,
    });
    day++;
  }

  let data = {
    compare_data: lastMonthData,
    compare_data1: lastMonthOrderdata,
    total_revenue: totalCount.toFixed(2),
    accept_offer_data: lastMonthOfferData,
    total_offer_accepted: totalOfferCount,
    revenue_ratio:
      totalOrderCount > 0
        ? ((totalCount / totalOrderCount) * 100).toFixed(2)
        : 0,
    decline_offer_data: lastMonthDeclineOfferData,
  };
  return data;
};

export const countLastMonthData = async (Model, day, shop) => {
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
    $and: [
      {
        created_at: {
          $gte: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day, "days")
            .toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.aggregate(
    pipeline.pipelineForOrderStats(filter)
  );
  return dataCount.length > 0 ? dataCount[0].totalAmount : 0;
};

export const countLastMonthOrderData = async (Model, day, shop) => {
  let filter = {
    $and: [
      {
        created_at: {
          $gte: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day, "days")
            .toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return dataCount.length > 0 ? dataCount[0].totalAmount : 0;
};

export const dynamicStatistics = async (body, session) => {
  logger.log(level.info, `>> dynamicStatistics()`);
  const diffTime = Math.abs(
    new Date(body.end_date) - new Date(body.start_date)
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let totalCount = 0;
  let totalOfferCount = 0;
  let totalOrderCount = 0;

  if (diffDays > 90) {
    let startDate = new Date(body.start_date);
    let endDate = new Date(body.end_date);
    let startMonth = startDate.getMonth() + 1;
    let endMonth = endDate.getMonth() + 2;
    let startYear = startDate.getFullYear();
    let endYear = endDate.getFullYear();
    let daysData = [];
    let orderDaysData = [];
    let acceptOfferData = [];
    let totalOfferCount = 0;
    let totalOrderCount = 0;
    let declineOfferData = [];

    while (startYear <= endYear || startMonth === endMonth) {
      if (startMonth === 13) {
        startMonth = 1;
        startYear++;
      }
      if (startYear === endYear && startMonth === endMonth) {
        daysData.push(...daysData);
        orderDaysData.push(...orderDaysData);
        acceptOfferData.push(...acceptOfferData);
        declineOfferData.push(...declineOfferData);
        let resultOrder = 0;
        daysData.forEach((number) => {
          resultOrder += Number(number.value);
        });
        let result = 0;
        orderDaysData.forEach((number) => {
          result += Number(number.value);
        });
        let resultOffer = 0;
        acceptOfferData.forEach((number) => {
          resultOffer += number.value;
        });
        let resultDeclineOffer = 0;
        declineOfferData.forEach((number) => {
          resultDeclineOffer += number.value;
        });
        let data = {
          compare_data: daysData,
          compare_data1: orderDaysData,
          total_revenue: result.toFixed(2),
          accept_offer_data: acceptOfferData,
          total_offer_accepted: resultOffer,
          revenue_ratio:
            resultOrder > 0 ? ((result / resultOrder) * 100).toFixed(2) : 0,
          decline_offer_data: resultDeclineOffer,
        };
        return data;
      }
      //! Original Order Data
      const dynamicDataCount = await countDynamicMonthData(
        orderModel,
        startMonth,
        startYear,
        session.shop
      );
      daysData.push({
        key: startMonth + "-" + startYear,
        value: Number(dynamicDataCount),
      });
      totalOrderCount += Number(dynamicDataCount);
      //! Dashboard Funnel Order Data
      const dynamicOrderDataCount = await countDynamicOrderMonthData(
        funnelOrderModel,
        startMonth,
        startYear,
        session.shop
      );
      orderDaysData.push({
        key: startMonth + "-" + startYear,
        value: dynamicOrderDataCount.toFixed(2),
      });
      totalCount = totalCount + dynamicOrderDataCount;
      //! Accept Offer Data
      const offerCount = await acceptDynamicOfferMonthData(
        offerAcceptModel,
        startMonth,
        startYear,
        session.shop
      );
      acceptOfferData.push({
        key: startMonth + "-" + startYear,
        value: offerCount,
      });
      totalOfferCount = totalOfferCount + offerCount;
      //! Decline Offer Data
      const declineOfferCount = await acceptDynamicDeclineOfferMonthData(
        offerAcceptModel,
        startMonth,
        startYear,
        session.shop
      );
      declineOfferData.push({
        key: startMonth + "-" + startYear,
        value: declineOfferCount,
      });
      startMonth++;
    }
    let data = {
      compare_data: daysData,
      compare_data1: orderDaysData,
      total_revenue: totalCount.toFixed(2),
      accept_offer_data: acceptOfferData,
      total_offer_accepted: totalOfferCount,
      revenue_ratio:
        totalOrderCount > 0
          ? ((totalCount / totalOrderCount) * 100).toFixed(2)
          : 0,
      decline_offer_data: declineOfferData,
    };
    return data;
  } else {
    let daysData = [];
    let orderDaysData = [];
    let offerAcceptData = [];
    let offerDeclineData = [];
    while (diffDays >= 0) {
      let startDate = new Date(body.end_date);
      let endDate = new Date(body.end_date);
      startDate.setDate(startDate.getDate() - diffDays);
      endDate.setDate(endDate.getDate() - diffDays + 1);
      //! Original Order Data
      const dynamicDataCount = await countDynamicDaysData(
        orderModel,
        startDate,
        endDate,
        session.shop
      );
      daysData.push({
        key: moment(startDate).format("YYYY-MM-DD"),
        value: Number(dynamicDataCount),
      });
      totalOrderCount += Number(dynamicDataCount);
      //! Dashboard Funnel Order Data
      const dynamicOrderDataCount = await countOrderDynamicDaysData(
        funnelOrderModel,
        startDate,
        endDate,
        session.shop
      );
      orderDaysData.push({
        key: moment(startDate).format("YYYY-MM-DD"),
        value: dynamicOrderDataCount.toFixed(2),
      });
      totalCount = totalCount + dynamicOrderDataCount;
      //! Accept Offer Data
      const offerCount = await acceptDynamicOfferData(
        offerAcceptModel,
        startDate,
        endDate,
        session.shop
      );
      offerAcceptData.push({
        key: moment(startDate).format("YYYY-MM-DD"),
        value: offerCount,
      });
      totalOfferCount = totalOfferCount + offerCount;
      //! Decline Offer Data
      const declineOfferCount = await acceptDynamicOfferData(
        offerAcceptModel,
        startDate,
        endDate,
        session.shop
      );
      offerDeclineData.push({
        key: moment(startDate).format("YYYY-MM-DD"),
        value: declineOfferCount,
      });
      diffDays--;
    }
    let data = {
      compare_data: daysData,
      compare_data1: orderDaysData,
      total_revenue: totalCount.toFixed(2),
      accept_offer_data: offerAcceptData,
      total_offer_accepted: totalOfferCount,
      revenue_ratio:
        totalOrderCount > 0
          ? ((totalCount / totalOrderCount) * 100).toFixed(2)
          : 0,
      decline_offer_data: offerDeclineData,
    };
    return data;
  }
};

export const countDynamicDaysData = async (model, startDate, endDate, shop) => {
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
    $and: [
      { created_at: { $gte: startDate } },
      {
        created_at: { $lt: endDate },
      },
    ],
    shop,
  };
  const daysCount = await model.aggregate(
    pipeline.pipelineForOrderStats(filter)
  );
  return daysCount.length > 0 ? daysCount[0].totalAmount : 0;
};

export const countOrderDynamicDaysData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    $and: [
      { created_at: { $gte: startDate } },
      {
        created_at: { $lt: endDate },
      },
    ],
    shop,
  };
  const daysCount = await model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return daysCount.length > 0 ? daysCount[0].totalAmount : 0;
};

export const countDynamicMonthData = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
    $and: [
      {
        created_at: {
          $gte: firstDay,
        },
      },
      {
        created_at: {
          $lt: lastDay,
        },
      },
    ],
    shop,
  };
  const dataCount = await model.aggregate(
    pipeline.pipelineForOrderStats(filter)
  );
  return dataCount.length > 0 ? dataCount[0].totalAmount : 0;
};

export const countDynamicOrderMonthData = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    $and: [
      {
        created_at: {
          $gte: firstDay,
        },
      },
      {
        created_at: {
          $lt: lastDay,
        },
      },
    ],
    shop,
  };
  const dataCount = await model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return dataCount.length > 0 ? dataCount[0].totalAmount : 0;
};

export const acceptTodayOfferData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    is_accept: true,
    shop,
  };
  if (day === "today") {
    filter = {
      ...filter,
      $and: [
        { created_at: { $gte: getTodayTime(hours, offset) } },
        { created_at: { $lt: getTodayTime(nextHours, offset) } },
      ],
    };
  }
  if (day === "yesterday") {
    filter = {
      ...filter,
      $and: [
        { created_at: { $gte: getYesterdayTime(hours, offset) } },
        { created_at: { $lt: getYesterdayTime(nextHours, offset) } },
      ],
    };
  }

  const hoursCount = await Model.count(filter);
  return hoursCount;
};

export const acceptTodayDeclineOfferData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    is_accept: false,
    shop,
  };
  if (day === "today") {
    filter = {
      ...filter,
      $and: [
        { created_at: { $gte: getTodayTime(hours, offset) } },
        { created_at: { $lt: getTodayTime(nextHours, offset) } },
      ],
    };
  }
  if (day === "yesterday") {
    filter = {
      ...filter,
      $and: [
        { created_at: { $gte: getYesterdayTime(hours, offset) } },
        { created_at: { $lt: getYesterdayTime(nextHours, offset) } },
      ],
    };
  }

  const hoursCount = await Model.count(filter);
  return hoursCount;
};

export const acceptLastDaysOfferData = async (day, Model, shop) => {
  let filter = {
    is_accept: true,
    $and: [
      { created_at: { $gte: getDay(day) } },
      {
        created_at: { $lt: getDay(day - 1) },
      },
    ],
    shop,
  };
  const daysCount = await Model.count(filter);
  return daysCount;
};

export const acceptLastDaysDeclineOfferData = async (day, Model, shop) => {
  let filter = {
    shop,
    is_accept: false,
    $and: [
      { created_at: { $gte: getDay(day) } },
      {
        created_at: { $lt: getDay(day - 1) },
      },
    ],
  };
  const daysCount = await Model.count(filter);
  return daysCount;
};

export const acceptThisMonthOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: true,
    $and: [
      {
        created_at: {
          $gte: moment().startOf("month").add(day, "days").toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.count(filter);
  return dataCount;
};

export const acceptThisMonthDeclineOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: false,
    $and: [
      {
        created_at: {
          $gte: moment().startOf("month").add(day, "days").toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.count(filter);
  return dataCount;
};

export const acceptLastMonthOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: true,
    $and: [
      {
        created_at: {
          $gte: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day, "days")
            .toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.count(filter);
  return dataCount;
};

export const acceptLastMonthDeclineOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: false,
    $and: [
      {
        created_at: {
          $gte: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day, "days")
            .toDate(),
        },
      },
      {
        created_at: {
          $lt: moment()
            .startOf("month")
            .subtract(1, "months")
            .add(day + 1, "days")
            .toDate(),
        },
      },
    ],
    shop,
  };
  const dataCount = await Model.count(filter);
  return dataCount;
};

export const acceptDynamicOfferData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    is_accept: true,
    $and: [
      { created_at: { $gte: startDate } },
      {
        created_at: { $lt: endDate },
      },
    ],
    shop,
  };
  const daysCount = await model.count(filter);
  return daysCount;
};

export const acceptDynamicOfferMonthData = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    is_accept: true,
    $and: [
      {
        created_at: {
          $gte: firstDay,
        },
      },
      {
        created_at: {
          $lt: lastDay,
        },
      },
    ],
    shop,
  };
  const dataCount = await model.count(filter);
  return dataCount;
};

export const acceptDynamicDeclineOfferMonthData = async (
  model,
  month,
  year,
  shop
) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    is_accept: false,
    $and: [
      {
        created_at: {
          $gte: firstDay,
        },
      },
      {
        created_at: {
          $lt: lastDay,
        },
      },
    ],
    shop,
  };
  const dataCount = await model.count(filter);
  return dataCount;
};
