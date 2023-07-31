import { logger, level } from "../../config/logger.js";
import { serverError, successResponse } from "../../utils/utility.js";
import * as statsRepo from "../../repositories/admin/statistics.js";

export const todayStatistics = async (req, res) => {
  logger.log(level.debug, `>> todayStatistics()`);
  const session = res.locals.shopify.session;

  try {
    let isDay = req.query.day;
    if (req.query.day === "yesterday") {
      isDay = "yesterday";
    }
    const result = await statsRepo.todayStatistics(isDay, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< todayStatistics error=${err}`);
    serverError(res);
  }
};
//  Please see https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client for instructions on SDK initialization.

export const lastDayStatistics = async (req, res) => {
  logger.log(level.debug, `>> lastDayStatistics()`);
  const session = res.locals.shopify.session;

  try {
    const result = await statsRepo.lastDayStatistics(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< lastDayStatistics error=${err}`);
    serverError(res);
  }
};

export const monthStatistics = async (req, res) => {
  logger.log(level.debug, `>> thisMonthStatistics()`);
  const session = res.locals.shopify.session;

  try {
    if (req.query.month === "this") {
      const result = await statsRepo.thisMonthStatistics(session);
      successResponse(res, result);
    }
    if (req.query.month === "last") {
      const result = await statsRepo.lastMonthStatistics(session);
      successResponse(res, result);
    }
  } catch (err) {
    logger.log(level.error, `<< thisMonthStatistics error=${err}`);
    serverError(err);
  }
};

export const dynamicStatistics = async (req, res) => {
  logger.log(level.debug, `>> dynamicStatistics()`);
  const session = res.locals.shopify.session;

  try {
    const result = await statsRepo.dynamicStatistics(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< dynamicStatistics error=${err}`);
    serverError(err);
  }
};
