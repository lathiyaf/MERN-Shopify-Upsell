import { Router } from "express";
const routes = new Router();
import * as statsCtrl from "../../controllers/admin/statistics.controller.js";

const PATH = {
  ROOT: "/",
  LAST_DAYS: "/lastdays",
  MONTH: "/month",
  DYNAMIC_DATES: "/dynamic_dates",
};

/**
 * @api {GET} /api/statistics
 * @desc Get today statistics
 * @access Private
 * **/
routes.route(PATH.ROOT).get(statsCtrl.todayStatistics);

/**
 * @api {POST} /api/statistics/lastdays
 * @desc Get Lastday statistics
 * @access Private
 * **/
routes.route(PATH.LAST_DAYS).post(statsCtrl.lastDayStatistics);

/**
 * @api {GET} /api/statistics/month
 * @desc Get Monthly statistics
 * @access Private
 * **/
routes.route(PATH.MONTH).get(statsCtrl.monthStatistics);

/**
 * @api {POST} /api/statistics/dynamic_dates
 * @desc Get Dynamic date statistics
 * @access Private
 * **/
routes.route(PATH.DYNAMIC_DATES).post(statsCtrl.dynamicStatistics);

export default routes;
