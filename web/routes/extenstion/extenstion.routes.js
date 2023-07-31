import { Router } from "express";
const routes = new Router();
import * as extensionCtrl from "../../controllers/extension/extension.controller.js";
import activityRoutes from "../extenstion/activity.routes.js";

const PATH = {
  ROOT: "/",
  SIGN_SET: "/sign-changeset",
  PRODUCTS: "/get/products",
  NEXT_FUNNEL: "/next/funnel",
  IMPRESSION: "/funnel/impression",
  ACTIVITY: "/funnel/activity",
  ACCEPT_OFFER: "/offer/accept",
  FUNNE_ORDER: "/order/funnel",
  THANKYOU: "/thank_you",
  ACTIVITY: "/activity",
  REORDER: "/reorder",
  BIRTHDAY: "/birthday",
  SURVEY: "/survey_submit",
  PRODUCT_COMMENT: "/product_comment",
  UPSELL_PRODUCT: "/upsell_product",
};

routes.use(PATH.ACTIVITY, activityRoutes);

routes
  .route(PATH.SIGN_SET)
  /**
   * @api {POST} /api/sign-changeset
   * @desc Sign changeset api
   * @access Private
   * **/
  .post(extensionCtrl.signChangeset);

/**
 * @api {POST} /api/get/products
 * @desc Get products api
 * @access Private
 * **/
routes.route(PATH.PRODUCTS).post(extensionCtrl.getProducts);

/**
 * @api {POST} /api/next/funnel
 * @desc Next Funnel api
 * @access Private
 * **/
routes.route(PATH.NEXT_FUNNEL).post(extensionCtrl.nextFunnel);

/**
 * @api {POST} /api/funnel/impression
 * @desc Add Impression api
 * @access Private
 * **/
routes.route(PATH.IMPRESSION).post(extensionCtrl.addImpression);

/**
 * @api {POST} /api/funnel/activity
 * @desc Add Activity api
 * @access Private
 * **/
routes.route(PATH.ACTIVITY).post(extensionCtrl.addActivity);

/**
 * @api {POST} /api/offer/accept
 * @desc Offer Accept api
 * @access Private
 * **/
routes.route(PATH.ACCEPT_OFFER).post(extensionCtrl.offerAccept);

/**
 * @api {POST} /api/order/funnel
 * @desc Funnel Order api
 * @access Private
 * **/
routes.route(PATH.FUNNE_ORDER).post(extensionCtrl.addFunnelOrder);

/**
 * @api {POST} /api/thank_you
 * @desc Get default thank you page
 * @access Private
 * **/
routes.route(PATH.THANKYOU).post(extensionCtrl.getDefaultTyPage);

/**
 * @api {POST} /api/reorder
 * @desc Reorder
 * @access Private
 * **/
routes.route(PATH.REORDER).post(extensionCtrl.generateReorder);

/**
 * @api {POST} /api/birthday
 * @desc Save Birthday
 * @access Private
 * **/
routes.route(PATH.BIRTHDAY).post(extensionCtrl.saveBirthday);

/**
 * @api {POST} /api/survey_submit
 * @desc Survey Submit
 * @access Private
 * **/
routes.route(PATH.SURVEY).post(extensionCtrl.surveySubmit);

/**
 * @api {POST} /api/product_comment
 * @desc Save Product Comment
 * @access Private
 * **/
routes.route(PATH.PRODUCT_COMMENT).post(extensionCtrl.productComment);

/**
 * @api {GET} /api/upsell_product
 * @desc Get Upsell Product
 * @access Private
 * **/
routes.route(PATH.UPSELL_PRODUCT).get(extensionCtrl.getUpsellProduct);

export default routes;
