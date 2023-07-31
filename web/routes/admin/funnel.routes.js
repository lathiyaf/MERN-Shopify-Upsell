import { Router } from "express";
const routes = new Router();
import * as funnelCtrl from "../../controllers/admin/funnel.controller.js";

const PATH = {
  ROOT: "/",
  COLLECTION: "/collection",
  ALL: "/all",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/funnel
   * @desc Add Funnel
   * @access Private
   * **/
  .post(funnelCtrl.addFunnel)
  /**
   * @api {GET} /api/funnel
   * @desc Get Funnel by id
   * @access Private
   * **/
  .get(funnelCtrl.getFunnelById)
  /**
   * @api {PUT} /api/funnel
   * @desc Update Funnel
   * @access Private
   * **/
  .put(funnelCtrl.editFunnel)
  /**
   * @api {DELETE} /api/funnel
   * @desc Delete Funnel
   * @access Private
   * **/
  .delete(funnelCtrl.deleteFunnel);

routes
  .route(PATH.COLLECTION)
  /**
   * @api {GET} /api/funnel/collection
   * @desc Get All Collections
   * @access Private
   * **/
  .get(funnelCtrl.getAllCollections);

routes
  .route(PATH.ALL)
  /**
   * @api {GET} /api/funnel/all
   * @desc Get All funnels
   * @access Private
   * **/
  .get(funnelCtrl.getAllFunnels);

export default routes;
