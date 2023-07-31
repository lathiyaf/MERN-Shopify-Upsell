import { Router } from "express";
const routes = new Router();
import * as activityCtrl from "../../controllers/admin/activity.controller.js";

const PATH = {
  ROOT: "/",
};

/**
 * @api {GET} /api/activity
 * @desc Get all activities
 * @access Private
 * **/
routes.route(PATH.ROOT).get(activityCtrl.getAllActivities);

export default routes;
