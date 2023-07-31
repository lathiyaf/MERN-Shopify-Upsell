import { logger, level } from "../../config/logger.js";
import funnelOrderModel from "../../models/funnel_order.js";
import orderModel from "../../models/order.js";
import {
  countData,
  countDaysData,
  countDynamicDaysData,
  countDynamicMonthData,
  countLastMonthData,
  countMonthData,
  getDay,
  getTodayTime,
  getYesterdayTime,
} from "./statistics.js";
import * as pipeline from "../../aggregate_pipeline/extension.js";
import offerAcceptModel from "../../models/offer_accept.js";
import moment from "moment-timezone";
import funnelModel from "../../models/funnel.js";
import impressionModel from "../../models/impression.js";

// ? Remaining Statistics
/**
 * Acceptence rate
 * AOV increase
 * Funnel impressions percentage
 * AOV increase percentage
 * Acceptence rate percentage
 */

export const todayFunnelStats = async (query, session) => {
  logger.log(level.info, `>> todayFunnelStats()`);
  const { day } = query;
  let hours = 0;
  let hoursData = [];
  let funnelOrderHoursData = [];
  let offset = 5.5;
  let totalCount = 0;
  let offerData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalFunnelImp = 0;
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
    //! Funnels wise Order Data
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
    totalCount += countDays;
    //! Accept Funnels Offer Data
    const offerCount = await acceptFunnelTodayOfferData(
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
    totalOfferCount += offerCount;
    //! Decline Funnels Offer Data
    const declineOfferCount = await declineFunnelTodayOfferData(
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
    //! Funnel Impression Count
    const impCount = await countTodayFunnelImp(
      hours,
      nextHours,
      day,
      impressionModel,
      offset,
      session.shop
    );
    totalFunnelImp += impCount;
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
    active_funnels: await totalActiveFunnels(session.shop),
    funnel_impressions: totalFunnelImp,
    decline_offer_data: declineOfferData,
  };
  return data;
};

export const countFunnelOrderData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    funnel_id: { $exists: true },
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
  const hoursCount = await Model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return hoursCount.length > 0 ? hoursCount[0].totalAmount : 0;
};

export const acceptFunnelTodayOfferData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    is_accept: true,
    funnel_id: { $exists: true },
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

export const declineFunnelTodayOfferData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    is_accept: false,
    funnel_id: { $exists: true },
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

export const countTodayFunnelImp = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const lastDayFunnelStats = async (body, session) => {
  logger.log(level.info, `>> lastDayFunnelStats()`);
  let { days } = body;
  let daysData = [];
  let funnelOrderData = [];
  let totalCount = 0;
  let acceptOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalFunnelImp = 0;
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
    //! Funnels wise Order Data
    const countOrderDays = await countFunnelDaysData(
      days,
      funnelOrderModel,
      session.shop
    );
    funnelOrderData.push({
      key: moment(event).format("MMM DD"),
      value: countOrderDays.toFixed(2),
    });
    totalCount = totalCount + countOrderDays;
    //! Accept Funnels Offer Data
    const countOfferData = await acceptFunnelDaysOfferData(
      days,
      offerAcceptModel,
      session.shop
    );
    acceptOfferData.push({
      key: moment(event).format("MMM DD"),
      value: countOfferData,
    });
    totalOfferCount = totalOfferCount + countOfferData;
    //! Decline Funnel Offer Data
    const countDeclineOfferData = await declineFunnelDaysOfferData(
      days,
      offerAcceptModel,
      session.shop
    );
    declineOfferData.push({
      key: moment(event).format("MMM DD"),
      value: countDeclineOfferData,
    });
    //! Funnel Impression Count
    const impCount = await countLastDayFunnelImp(
      days,
      impressionModel,
      session.shop
    );
    totalFunnelImp += impCount;
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
    active_funnels: await totalActiveFunnels(session.shop),
    funnel_impressions: totalFunnelImp,
    decline_offer_data: declineOfferData,
  };
  return data;
};

export const countFunnelDaysData = async (day, Model, shop) => {
  let filter = {
    funnel_id: { $exists: true },
    $and: [
      { created_at: { $gte: getDay(day) } },
      {
        created_at: { $lt: getDay(day - 1) },
      },
    ],
    shop,
  };
  const daysCount = await Model.aggregate(
    pipeline.pipelineForFunnelOrderStats(filter)
  );
  return daysCount.length > 0 ? daysCount[0].totalAmount : 0;
};

export const acceptFunnelDaysOfferData = async (day, Model, shop) => {
  let filter = {
    is_accept: true,
    funnel_id: { $exists: true },
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

export const declineFunnelDaysOfferData = async (day, Model, shop) => {
  let filter = {
    is_accept: false,
    funnel_id: { $exists: true },
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

export const countLastDayFunnelImp = async (day, Model, shop) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const thisMonthFunnelStats = async (session) => {
  logger.log(level.info, `>> thisMonthFunnelStats()`);
  let day = 0;
  let thisMonthData = [];
  let thisMonthOrderData = [];
  let totalCount = 0;
  let thisMonthOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalFunnelImp = 0;
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
    //! Funnels wise Order Data
    const monthOrderCount = await countFunnelOrderMonthData(
      funnelOrderModel,
      day,
      session.shop
    );
    thisMonthOrderData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: monthOrderCount.toFixed(2),
    });
    totalCount = totalCount + monthOrderCount;
    //! Accept Funnels Offer Data
    const offerCount = await acceptThisMonthFunnelOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    thisMonthOfferData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: offerCount,
    });
    totalOfferCount = totalOfferCount + offerCount;
    //! Decline Funnels Offer Data
    const declineOfferCount = await declineThisMonthFunnelOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    declineMonthOfferData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: declineOfferCount,
    });
    //! Funnel Impression Count
    const impCount = await countThisMonthFunnelImp(
      impressionModel,
      day,
      session.shop
    );
    totalFunnelImp += impCount;
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
    active_funnels: await totalActiveFunnels(session.shop),
    funnel_impressions: totalFunnelImp,
    decline_offer_data: declineMonthOfferData,
  };
  return data;
};

export const countFunnelOrderMonthData = async (Model, day, shop) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const acceptThisMonthFunnelOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: true,
    funnel_id: { $exists: true },
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

export const declineThisMonthFunnelOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: false,
    funnel_id: { $exists: true },
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

export const countThisMonthFunnelImp = async (Model, day, shop) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const lastMonthFunnelStats = async (session) => {
  logger.log(level.info, `>> lastMonthFunnelStats()`);
  let day = 0;
  let lastMonthData = [];
  let lastMonthOrderdata = [];
  let totalCount = 0;
  let lastMonthOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalFunnelImp = 0;
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
    //! Funnels wise Order Data
    const monthsOrderCount = await countLastMonthFunnelOrderData(
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
    //! Accept Funnels Offer data
    const offerCount = await acceptLastMonthFunnelOfferData(
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
    //! Decline Funnels Offer data
    const declineOfferCount = await declineLastMonthFunnelOfferData(
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
    //! Funnel Impression Count
    const impCount = await countLastMonthFunnelImp(
      impressionModel,
      day,
      session.shop
    );
    totalFunnelImp += impCount;
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
    active_funnels: await totalActiveFunnels(session.shop),
    funnel_impressions: totalFunnelImp,
    decline_offer_data: lastMonthDeclineOfferData,
  };
  return data;
};

export const countLastMonthFunnelOrderData = async (Model, day, shop) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const acceptLastMonthFunnelOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: true,
    funnel_id: { $exists: true },
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

export const declineLastMonthFunnelOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: false,
    funnel_id: { $exists: true },
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

export const countLastMonthFunnelImp = async (Model, day, shop) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const dynamicFunnelStats = async (body, session) => {
  logger.log(level.info, `>> dynamicFunnelStats()`);
  const diffTime = Math.abs(
    new Date(body.end_date) - new Date(body.start_date)
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let totalCount = 0;
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalFunnelImp = 0;

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
    let totalFunnelImp = 0;
    let funnelImpData = [];
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
        funnelImpData.push(...funnelImpData);
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
        let funnelImp = 0;
        funnelImpData.forEach((number) => {
          funnelImp += number.value;
        });
        let data = {
          compare_data: daysData,
          compare_data1: orderDaysData,
          total_revenue: result.toFixed(2),
          accept_offer_data: acceptOfferData,
          total_offer_accepted: resultOffer,
          revenue_ratio:
            resultOrder > 0 ? ((result / resultOrder) * 100).toFixed(2) : 0,
          active_funnels: await totalActiveFunnels(session.shop),
          funnel_impressions: funnelImp,
          decline_offer_data: resultDeclineOffer,
        };
        return data;
      }
      //! original Order Data
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
      //! Funnels wise Order Data
      const dynamicOrderDataCount = await funnelDynamicOrderMonthData(
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
      //! Accept Offers Data
      const offerCount = await acceptDynamicFunnelOfferMonthData(
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
      //! Decline Funnel Offer Data
      const declineOfferCount = await declineDynamicFunnelOfferMonthData(
        offerAcceptModel,
        startMonth,
        startYear,
        session.shop
      );
      declineOfferData.push({
        key: startMonth + "-" + startYear,
        value: declineOfferCount,
      });
      //! Funnel Impression Count
      const impCount = await countDynamicMonthFunnelImp(
        impressionModel,
        startMonth,
        startYear,
        session.shop
      );
      funnelImpData.push({
        key: startMonth + "-" + startYear,
        value: impCount,
      });
      totalFunnelImp += impCount;
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
      active_funnels: await totalActiveFunnels(session.shop),
      funnel_impressions: totalFunnelImp,
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
      //! Funnels wise Order Data
      const dynamicOrderDataCount = await funnelOrderDynamicDaysData(
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
      //! Accept Funnels Offer Data
      const offerCount = await acceptFunnelDynamicOfferData(
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
      //! Decline Funnel Offer Data
      const declineOfferCount = await declineFunnelDynamicOfferData(
        offerAcceptModel,
        startDate,
        endDate,
        session.shop
      );
      offerDeclineData.push({
        key: moment(startDate).format("YYYY-MM-DD"),
        value: declineOfferCount,
      });
      const impCount = await countDynamicDaysFunnelImp(
        impressionModel,
        startDate,
        endDate,
        session.shop
      );
      totalFunnelImp += impCount;
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
      active_funnels: await totalActiveFunnels(session.shop),
      funnel_impressions: totalFunnelImp,
      decline_offer_data: offerDeclineData,
    };
    return data;
  }
};

export const funnelOrderDynamicDaysData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const acceptFunnelDynamicOfferData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    is_accept: true,
    funnel_id: { $exists: true },
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

export const declineFunnelDynamicOfferData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    is_accept: false,
    funnel_id: { $exists: true },
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

export const countDynamicDaysFunnelImp = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    funnel_id: { $exists: true },
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

export const funnelDynamicOrderMonthData = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    funnel_id: { $exists: true },
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

export const acceptDynamicFunnelOfferMonthData = async (
  model,
  month,
  year,
  shop
) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    is_accept: true,
    funnel_id: { $exists: true },
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

export const declineDynamicFunnelOfferMonthData = async (
  model,
  month,
  year,
  shop
) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    is_accept: false,
    funnel_id: { $exists: true },
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

export const countDynamicMonthFunnelImp = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    funnel_id: { $exists: true },
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

export const totalActiveFunnels = async (shop) => {
  const count = await funnelModel.count({
    status: 1,
    shop,
  });
  return count;
};
