import { logger, level } from "../../config/logger.js";
import {
  getOptionsPipelineJson,
  serverError,
  standardStructureStringToJson,
  successResponse,
} from "../../utils/utility.js";
import * as activityRepo from "../../repositories/admin/activity.js";

export const getAllActivities = async (req, res) => {
  logger.log(level.debug, `>> getAllActivities()`);
  const session = res.locals.shopify.session;
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsPipelineJson(extraParams);

  try {
    const result = await activityRepo.getAllActivities(
      session,
      options,
      req.query
    );
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllActivities error=${err}`);
    serverError(res);
  }
};
