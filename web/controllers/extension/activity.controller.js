import { logger, level } from "../../config/logger.js";
import { serverError, successResponse } from "../../utils/utility.js";
import * as activityRepo from "../../repositories/extension/activity.js";

export const addActivity = async (req, res) => {
  logger.log(level.debug, `>> addActivity()`);

  try {
    const result = await activityRepo.addActivity(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addActivity error=${err}`);
    serverError(res);
  }
};
