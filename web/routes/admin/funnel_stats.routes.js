import { Router } from "express";
const routes = new Router();
import * as funnelStatsCtrl from "../../controllers/admin/funnel_stats.controller.js";

const PATH = {
  ROOT: "/",
  LAST_DAYS: "/lastdays",
  MONTH: "/month",
  DYNAMIC_DATES: "/dynamic_dates",
};

/**
 * @api {GET} /api/funnel/statistics
 * @desc Get today funnel statistics
 * @access Private
 * **/
routes.route(PATH.ROOT).get(funnelStatsCtrl.todayFunnelStats);

/**
 * @api {POST} /api/funnel/statistics/lastdays
 * @desc Get Lastday funnel statistics
 * @access Private
 * **/
routes.route(PATH.LAST_DAYS).post(funnelStatsCtrl.lastDayFunnelStats);

/**
 * @api {GET} /api/funnel/statistics/month
 * @desc Get Monthly funnel statistics
 * @access Private
 * **/
routes.route(PATH.MONTH).get(funnelStatsCtrl.monthFunnelStats);

/**
 * @api {POST} /api/funnel/statistics/dynamic_dates
 * @desc Get Dynamic date funnel statistics
 * @access Private
 * **/
routes.route(PATH.DYNAMIC_DATES).post(funnelStatsCtrl.dynamicFunnelStats);

export default routes;
