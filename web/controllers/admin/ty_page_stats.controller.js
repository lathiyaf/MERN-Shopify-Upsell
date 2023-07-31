import { logger, level } from "../../config/logger.js";
import { serverError, successResponse } from "../../utils/utility.js";
import * as tyPageStatsRepo from "../../repositories/admin/ty_page_stats.js";

export const todayTyPageStats = async (req, res) => {
  logger.log(level.debug, `>> todayTyPageStats()`);
  const session = res.locals.shopify.session;

  try {
    const result = await tyPageStatsRepo.todayTyPageStats(req.query, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< todayTyPageStats error=${err}`);
    serverError(res);
  }
};

export const lastDayTyPageStats = async (req, res) => {
  logger.log(level.info, `>> lastDayTyPageStats()`);
  const session = res.locals.shopify.session;

  try {
    const result = await tyPageStatsRepo.lastDayTyPageStats(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< lastDayTyPageStats error=${err}`);
    serverError(res);
  }
};

export const monthTyPageStats = async (req, res) => {
  logger.log(level.info, `>> monthTyPageStats()`);
  const session = res.locals.shopify.session;

  try {
    if (req.query.month === "this") {
      const result = await tyPageStatsRepo.thisMonthTyPageStats(session);
      successResponse(res, result);
    }
    if (req.query.month === "last") {
      const result = await tyPageStatsRepo.lastMonthTyPageStats(session);
      successResponse(res, result);
    }
  } catch (err) {
    logger.log(level.error, `<< monthTyPageStats error=${err}`);
    serverError(res);
  }
};

export const dynamicTyPageStats = async (req, res) => {
  logger.log(level.debug, `>> dynamicTyPageStats()`);
  const session = res.locals.shopify.session;

  try {
    const result = await tyPageStatsRepo.dynamicTyPageStats(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< dynamicTyPageStats error=${err}`);
    serverError(res);
  }
};
