import { logger, level } from "../../config/logger.js";
import funnelOrderModel from "../../models/funnel_order.js";
import offerAcceptModel from "../../models/offer_accept.js";
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
import moment from "moment-timezone";
import impressionModel from "../../models/impression.js";
import birthdayModel from "../../models/birthday.js";
import productCommentModel from "../../models/product_comment.js";
import surveyModel from "../../models/survey.js";

// ? Remaining Statistics
/**
 * ReConvert orders AOV
 * ROI
 * Thank you page conversion rate
 * Bounce rate
 * Birthdays collected
 * Product comments collected
 * Surveys answered
 */

export const todayTyPageStats = async (query, session) => {
  logger.log(level.info, `>> todayTyPageStats()`);
  const { day } = query;
  let hours = 0;
  let hoursData = [];
  let funnelOrderHoursData = [];
  let offset = 5.5;
  let totalCount = 0;
  let offerData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalStoreOrderCount = 0;
  let totalTYImp = 0;
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
    //! Thank you page wise order data
    const countDays = await countTyPageOrderData(
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
    //! Accept Thank you page Offer Data
    const offerCount = await acceptTyPageTodayOfferData(
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
    //! Decline Thank you page Offer Data
    const declineOfferCount = await declineTyPageTodayOfferData(
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
    //! Store Order Count
    const storeOrderCount = await countTodayStoreOrder(
      hours,
      nextHours,
      day,
      orderModel,
      offset,
      session.shop
    );
    totalStoreOrderCount += storeOrderCount;
    //! Thank You Page Impression Count
    const impCount = await countTodayTyImp(
      hours,
      nextHours,
      day,
      impressionModel,
      offset,
      session.shop
    );
    totalTYImp += impCount;
    hours = hours + 4;
  }

  let filter = {
    shop: session.shop,
  };

  if (day === "today") {
    filter = {
      ...filter,
      created_at: { $gte: new Date() },
    };
  } else {
    filter = {
      ...filter,
      created_at: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        $lt: new Date(),
      },
    };
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
    total_store_order: totalStoreOrderCount,
    ty_page_impressions: totalTYImp,
    decline_offer_data: declineOfferData,
    total_birthday: await birthdayModel.count(filter),
    total_product_comment: await productCommentModel.count(filter),
    total_survey: await surveyModel.count(filter),
  };
  return data;
};

export const countTyPageOrderData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const acceptTyPageTodayOfferData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    is_accept: true,
    thankyou_page_id: { $exists: true },
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

export const declineTyPageTodayOfferData = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    is_accept: false,
    thankyou_page_id: { $exists: true },
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

export const countTodayStoreOrder = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    note_attributes: { $exists: true, $eq: [] },
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

export const countTodayTyImp = async (
  hours,
  nextHours,
  day,
  Model,
  offset,
  shop
) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const lastDayTyPageStats = async (body, session) => {
  logger.log(level.info, `>> lastDayTyPageStats()`);
  let { days } = body;
  let daysData = [];
  let funnelOrderData = [];
  let totalCount = 0;
  let acceptOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalStoreOrderCount = 0;
  let totalTYImp = 0;
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
    //! Thank you page wise order data
    const countOrderDays = await countTyPageDaysData(
      days,
      funnelOrderModel,
      session.shop
    );
    funnelOrderData.push({
      key: moment(event).format("MMM DD"),
      value: countOrderDays.toFixed(2),
    });
    totalCount = totalCount + countOrderDays;
    //! Accept Thank You Page Offer Data
    const countOfferData = await acceptTyPageDaysOfferData(
      days,
      offerAcceptModel,
      session.shop
    );
    acceptOfferData.push({
      key: moment(event).format("MMM DD"),
      value: countOfferData,
    });
    totalOfferCount = totalOfferCount + countOfferData;
    //! decline Thank You Page Offer Data
    const countDeclineOfferData = await declineTyPageDaysOfferData(
      days,
      offerAcceptModel,
      session.shop
    );
    declineOfferData.push({
      key: moment(event).format("MMM DD"),
      value: countDeclineOfferData,
    });
    //! Store Order Count
    const storeOrderCount = await countLastDaysStoreOrder(
      days,
      orderModel,
      session.shop
    );
    totalStoreOrderCount += storeOrderCount;
    //! Thank You Page Impression Count
    const impCount = await countLastDaysTyImp(
      days,
      impressionModel,
      session.shop
    );
    totalTYImp += impCount;
    days--;
  }

  let filter = {
    shop: session.shop,
  };

  if (days === "7") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(7, "days").toDate(),
      },
    };
  } else {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(30, "days").toDate(),
      },
    };
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
    total_store_order: totalStoreOrderCount,
    ty_page_impressions: totalTYImp,
    decline_offer_data: declineOfferData,
    total_birthday: await birthdayModel.count(filter),
    total_product_comment: await productCommentModel.count(filter),
    total_survey: await surveyModel.count(filter),
  };
  return data;
};

export const countTyPageDaysData = async (day, Model, shop) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const acceptTyPageDaysOfferData = async (day, Model, shop) => {
  let filter = {
    is_accept: true,
    thankyou_page_id: { $exists: true },
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

export const declineTyPageDaysOfferData = async (day, Model, shop) => {
  let filter = {
    is_accept: false,
    thankyou_page_id: { $exists: true },
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

export const countLastDaysStoreOrder = async (day, Model, shop) => {
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
  const daysCount = await Model.count(filter);
  return daysCount;
};

export const countLastDaysTyImp = async (day, Model, shop) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const thisMonthTyPageStats = async (session) => {
  logger.log(level.info, `>> thisMonthTyPageStats()`);
  let day = 0;
  let thisMonthData = [];
  let thisMonthOrderData = [];
  let totalCount = 0;
  let thisMonthOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalStoreOrderCount = 0;
  let totalTYImp = 0;
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
    //! Thank you page wise order data
    const monthOrderCount = await countTyPageOrderMonthData(
      funnelOrderModel,
      day,
      session.shop
    );
    thisMonthOrderData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: monthOrderCount.toFixed(2),
    });
    totalCount = totalCount + monthOrderCount;
    //! Accept Thank You Page Offer Data
    const offerCount = await acceptThisMonthTyPageOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    thisMonthOfferData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: offerCount,
    });
    totalOfferCount = totalOfferCount + offerCount;
    //! Decline Thank You Page Offer Data
    const declineOfferCount = await declineThisMonthTyPageOfferData(
      offerAcceptModel,
      day,
      session.shop
    );
    declineMonthOfferData.push({
      key: moment().startOf("month").add(day, "days").format("MMM DD"),
      value: declineOfferCount,
    });
    //! Store Order Count
    const storeOrderCount = await countThisMonthStoreOrder(
      orderModel,
      day,
      session.shop
    );
    totalStoreOrderCount += storeOrderCount;
    //! Thank You Page Impression Count
    const impCount = await countThisMonthTyImp(
      impressionModel,
      day,
      session.shop
    );
    totalTYImp += impCount;
    day++;
  }

  let filter = {
    shop: session.shop,
    created_at: {
      $gt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      $lt: new Date(),
    },
  };

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
    total_store_order: totalStoreOrderCount,
    ty_page_impressions: totalTYImp,
    decline_offer_data: declineMonthOfferData,
    total_birthday: await birthdayModel.count(filter),
    total_product_comment: await productCommentModel.count(filter),
    total_survey: await surveyModel.count(filter),
  };
  return data;
};

export const countTyPageOrderMonthData = async (Model, day, shop) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const acceptThisMonthTyPageOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: true,
    thankyou_page_id: { $exists: true },
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

export const declineThisMonthTyPageOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: false,
    thankyou_page_id: { $exists: true },
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

export const countThisMonthStoreOrder = async (Model, day, shop) => {
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
  const dataCount = await Model.count(filter);
  return dataCount;
};

export const countThisMonthTyImp = async (Model, day, shop) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const lastMonthTyPageStats = async (session) => {
  logger.log(level.info, `>> lastMonthTyPageStats()`);
  let day = 0;
  let lastMonthData = [];
  let lastMonthOrderdata = [];
  let totalCount = 0;
  let lastMonthOfferData = [];
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalStoreOrderCount = 0;
  let totalTYImp = 0;
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
    //! Thank you page wise order data
    const monthsOrderCount = await countLastMonthTyPageOrderData(
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
    //! Accept Thank You Page Offer Data
    const offerCount = await accepeLastMonthTyPageOfferData(
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
    //! Decline Thank You Page Offer Data
    const declineOfferCount = await declineLastMonthTyPageOfferData(
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
    //! Store Order Count
    const storeOrderCount = await countLastMonthStoreOrder(
      orderModel,
      day,
      session.shop
    );
    totalStoreOrderCount += storeOrderCount;
    //! Thank You Page Impression Count
    const impCount = await countLastMonthTyImp(
      impressionModel,
      day,
      session.shop
    );
    totalTYImp += impCount;
    day++;
  }

  let filter = {
    shop: session.shop,
    created_at: {
      $gt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      $lt: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
      ),
    },
  };

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
    total_store_order: totalStoreOrderCount,
    ty_page_impressions: totalTYImp,
    decline_offer_data: lastMonthDeclineOfferData,
    total_birthday: await birthdayModel.count(filter),
    total_product_comment: await productCommentModel.count(filter),
    total_survey: await surveyModel.count(filter),
  };
  return data;
};

export const countLastMonthTyPageOrderData = async (Model, day, shop) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const accepeLastMonthTyPageOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: true,
    thankyou_page_id: { $exists: true },
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

export const declineLastMonthTyPageOfferData = async (Model, day, shop) => {
  let filter = {
    is_accept: false,
    thankyou_page_id: { $exists: true },
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

export const countLastMonthStoreOrder = async (Model, day, shop) => {
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
  const dataCount = await Model.count(filter);
  return dataCount;
};

export const countLastMonthTyImp = async (Model, day, shop) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const dynamicTyPageStats = async (body, session) => {
  logger.log(level.info, `>> dynamicTyPageStats()`);
  const diffTime = Math.abs(
    new Date(body.end_date) - new Date(body.start_date)
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let totalCount = 0;
  let totalOfferCount = 0;
  let totalOrderCount = 0;
  let totalStoreOrderCount = 0;
  let totalTYImp = 0;
  let filter = {
    shop: session.shop,
    created_at: {
      $gt: moment(body.start_date).toDate(),
      $lt: moment(body.end_date).toDate(),
    },
  };

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
    let totalStoreOrderCount = 0;
    let storeOrderData = [];
    let totalTYImp = 0;
    let tyImpData = [];
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
        tyImpData.push(...tyImpData);
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
        let resultStoreOrder = 0;
        storeOrderData.forEach((number) => {
          resultStoreOrder += number.value;
        });
        let resultTyImp = 0;
        tyImpData.forEach((number) => {
          resultTyImp += number.value;
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
          total_store_order: resultStoreOrder,
          ty_page_impressions: resultTyImp,
          decline_offer_data: resultDeclineOffer,
          total_birthday: await birthdayModel.count(filter),
          total_product_comment: await productCommentModel.count(filter),
          total_survey: await surveyModel.count(filter),
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
      //! Thank you page wise order data
      const dynamicOrderDataCount = await tyPageDynamicOrderMonthData(
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
      //! Accept Thank You Page Offer Data
      const offerCount = await acceptDynamicTyPageOfferMonthData(
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
      //! Decline Thank You Page Offer Data
      const declineOfferCount = await declineDynamicTyPageOfferMonthData(
        offerAcceptModel,
        startMonth,
        startYear,
        session.shop
      );
      declineOfferData.push({
        key: startMonth + "-" + startYear,
        value: declineOfferCount,
      });
      //! Store Order Count
      const storeOrderCount = await countDynamicMonthStoreOrder(
        orderModel,
        startMonth,
        startYear,
        session.shop
      );
      storeOrderData.push({
        key: startMonth + "-" + startYear,
        value: storeOrderCount,
      });
      totalStoreOrderCount += storeOrderCount;
      //! Thank You Page Impression Count
      const impCount = await countDynamicMonthTyImp(
        impressionModel,
        startMonth,
        startYear,
        session.shop
      );
      tyImpData.push({
        key: startMonth + "-" + startYear,
        value: impCount,
      });
      totalTYImp += impCount;
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
      total_store_order: totalStoreOrderCount,
      decline_offer_data: declineOfferData,
      total_birthday: await birthdayModel.count(filter),
      total_product_comment: await productCommentModel.count(filter),
      total_survey: await surveyModel.count(filter),
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
      //! Thank you page wise order data
      const dynamicOrderDataCount = await tyPageOrderDynamicDaysData(
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
      //! Accept Thank You Page Offer Data
      const offerCount = await acceptTyPageDynamicDaysOfferData(
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
      //! Decline Thank You Page Offer Data
      const declineOfferCount = await declineTyPageDynamicDaysOfferData(
        offerAcceptModel,
        startDate,
        endDate,
        session.shop
      );
      offerDeclineData.push({
        key: moment(startDate).format("YYYY-MM-DD"),
        value: declineOfferCount,
      });
      //! Store Order Count
      const storeOrderCount = await countDynamicDaysStoreOrder(
        orderModel,
        startDate,
        endDate,
        session.shop
      );
      totalStoreOrderCount += storeOrderCount;
      //! Thank You Page Impression Count
      const impCount = await countDynamicDaysTyImp(
        impressionModel,
        startDate,
        endDate,
        session.shop
      );
      totalTYImp += impCount;
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
      total_store_order: totalStoreOrderCount,
      ty_page_impressions: totalTYImp,
      decline_offer_data: offerDeclineData,
      total_birthday: await birthdayModel.count(filter),
      total_product_comment: await productCommentModel.count(filter),
      total_survey: await surveyModel.count(filter),
    };
    return data;
  }
};

export const tyPageOrderDynamicDaysData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const acceptTyPageDynamicDaysOfferData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    is_accept: true,
    thankyou_page_id: { $exists: true },
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

export const declineTyPageDynamicDaysOfferData = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    is_accept: false,
    thankyou_page_id: { $exists: true },
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

export const countDynamicDaysStoreOrder = async (
  model,
  startDate,
  endDate,
  shop
) => {
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
  const daysCount = await model.count(filter);
  return daysCount;
};

export const countDynamicDaysTyImp = async (
  model,
  startDate,
  endDate,
  shop
) => {
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const tyPageDynamicOrderMonthData = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    thankyou_page_id: { $exists: true },
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

export const acceptDynamicTyPageOfferMonthData = async (
  model,
  month,
  year,
  shop
) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    is_accept: true,
    thankyou_page_id: { $exists: true },
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

export const declineDynamicTyPageOfferMonthData = async (
  model,
  month,
  year,
  shop
) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    is_accept: false,
    thankyou_page_id: { $exists: true },
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

export const countDynamicMonthStoreOrder = async (model, month, year, shop) => {
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
  const dataCount = await model.count(filter);
  return dataCount;
};

export const countDynamicMonthTyImp = async (model, month, year, shop) => {
  let firstDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 1);
  let filter = {
    thankyou_page_id: { $exists: true },
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
