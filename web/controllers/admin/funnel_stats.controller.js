import { logger, level } from "../../config/logger.js";
import { serverError, successResponse } from "../../utils/utility.js";
import * as funnelStatsRepo from "../../repositories/admin/funnel_stats.js";

export const todayFunnelStats = async (req, res) => {
  logger.log(level.debug, `>> todayFunnelStats()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelStatsRepo.todayFunnelStats(req.query, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< todayFunnelStats error=${err}`);
    serverError(res);
  }
};

export const lastDayFunnelStats = async (req, res) => {
  logger.log(level.debug, `>> lastDayFunnelStats()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelStatsRepo.lastDayFunnelStats(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< lastDayFunnelStats error=${err}`);
    serverError(res);
  }
};

export const monthFunnelStats = async (req, res) => {
  logger.log(level.debug, `>> monthFunnelStats()`);
  const session = res.locals.shopify.session;

  try {
    if (req.query.month === "this") {
      const result = await funnelStatsRepo.thisMonthFunnelStats(session);
      successResponse(res, result);
    }
    if (req.query.month === "last") {
      const result = await funnelStatsRepo.lastMonthFunnelStats(session);
      successResponse(res, result);
    }
  } catch (err) {
    logger.log(level.error, `<< monthFunnelStats error=${err}`);
    serverError(res);
  }
};

export const dynamicFunnelStats = async (req, res) => {
  logger.log(level.debug, `>> dynamicFunnelStats()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelStatsRepo.dynamicFunnelStats(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< dynamicFunnelStats error=${err}`);
    serverError(res);
  }
};
