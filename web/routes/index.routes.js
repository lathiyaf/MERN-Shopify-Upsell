import { Router } from "express";
const routes = new Router();
import funnelRoutes from "./admin/funnel.routes.js";
import offerRoutes from "./admin/offer.routes.js";
import thankyouRoutes from "./admin/thankyou.routes.js";
import surveyRoutes from "./admin/survey.routes.js";
import statsRoutes from "./admin/statistics.routes.js";
import funnelStatsRoutes from "./admin/funnel_stats.routes.js";
import tyPageStatsRoutes from "./admin/ty_page_stats.routes.js";
import activityRoutes from "./admin/activity.routes.js";

const PATH = {
  ROOT: "/",
  FUNNEL: "/funnel",
  OFFER: "/offer",
  THANK_YOU: "/thankyou",
  SURVEY: "/survey",
  STATS: "/statistics",
  FUNNEL_STATS: "/funnel/statistics",
  TY_STATS: "/template/statistics",
  ACTIVITY: "/activity",
};

routes.use(PATH.ACTIVITY, activityRoutes);

routes.use(PATH.SURVEY, surveyRoutes);

routes.use(PATH.THANK_YOU, thankyouRoutes);

routes.use(PATH.OFFER, offerRoutes);

routes.use(PATH.FUNNEL, funnelRoutes);

routes.use(PATH.TY_STATS, tyPageStatsRoutes);

routes.use(PATH.FUNNEL_STATS, funnelStatsRoutes);

routes.use(PATH.STATS, statsRoutes);

export default routes;
