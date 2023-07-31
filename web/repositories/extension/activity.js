import { logger, level } from "../../config/logger.js";
import activityModel from "../../models/activity.js";

export const addActivity = async (body) => {
  logger.log(level.info, `>> addActivity()`);

  await activityModel.add({ ...body });
  const data = {
    message: "Activity added successfully",
  };
  return data;
};
