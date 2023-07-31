import { Router } from "express";
const routes = new Router();
import * as tyPageStatsCtrl from "../../controllers/admin/ty_page_stats.controller.js";

const PATH = {
  ROOT: "/",
  LAST_DAYS: "/lastdays",
  MONTH: "/month",
  DYNAMIC_DATES: "/dynamic_dates",
};

/**
 * @api {GET} /api/template/statistics
 * @desc Get today template statistics
 * @access Private
 * **/
routes.route(PATH.ROOT).get(tyPageStatsCtrl.todayTyPageStats);

/**
 * @api {POST} /api/template/statistics/lastdays
 * @desc Get Lastday template statistics
 * @access Private
 * **/
routes.route(PATH.LAST_DAYS).post(tyPageStatsCtrl.lastDayTyPageStats);

/**
 * @api {GET} /api/template/statistics/month
 * @desc Get Monthly template statistics
 * @access Private
 * **/
routes.route(PATH.MONTH).get(tyPageStatsCtrl.monthTyPageStats);

/**
 * @api {POST} /api/template/statistics/dynamic_dates
 * @desc Get Dynamic date template statistics
 * @access Private
 * **/
routes.route(PATH.DYNAMIC_DATES).post(tyPageStatsCtrl.dynamicTyPageStats);

export default routes;
