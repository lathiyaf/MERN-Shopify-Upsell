import moment from "moment-timezone";
import { pipelineForActivity } from "../../aggregate_pipeline/extension.js";
import { logger, level } from "../../config/logger.js";
import activityModel from "../../models/activity.js";

export const getAllActivities = async (session, options, query) => {
  logger.log(level.info, `>> getAllActivities()`);
  let filter = { shop: session.shop };
  const { day, start_date, end_date, type } = query;

  if (type === "funnels") {
    filter = {
      ...filter,
      funnel_id: { $exists: true },
    };
  } else if (type === "thankyou") {
    filter = {
      ...filter,
      template_id: { $exists: true },
    };
  }

  if (day === "today") {
    filter = {
      ...filter,
      created_at: { $gte: new Date() },
    };
  } else if (day === "yesterday") {
    filter = {
      ...filter,
      created_at: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        $lt: new Date(),
      },
    };
  } else if (day === "last7days") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(7, "days").toDate(),
      },
    };
  } else if (day === "last30days") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(30, "days").toDate(),
      },
    };
  } else if (day === "this") {
    filter = {
      ...filter,
      created_at: {
        $gt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(),
      },
    };
  } else if (day === "last") {
    filter = {
      ...filter,
      created_at: {
        $gt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        $lt: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
        ),
      },
    };
  } else if (day === "custom") {
    filter = {
      ...filter,
      created_at: {
        $gt: moment(start_date).toDate(),
        $lt: moment(end_date).toDate(),
      },
    };
  }

  const activityData = await activityModel.aggregate(
    pipelineForActivity(filter, options)
  );

  const count = await activityModel.aggregate(
    pipelineForActivity(filter, {}, true)
  );
  const data = {
    message: "Activity data fetched successfully",
    data: activityData,
    count: count[0]?.total ? count[0].total : 0,
  };
  return data;
};
