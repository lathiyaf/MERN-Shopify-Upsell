import { Router } from "express";
const routes = new Router();
import * as activityCtrl from "../../controllers/extension/activity.controller.js";

const PATH = {
  ROOT: "/",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/activity
   * @desc Add Activity
   * @access Private
   * **/
  .post(activityCtrl.addActivity);

export default routes;
