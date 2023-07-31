import { Router } from "express";
const routes = new Router();
import * as thankyouCtrl from "../../controllers/admin/thankyou.controller.js";

const PATH = {
  ROOT: "/",
  SCRIPT: "/script",
  SECTION: "/section",
  DETAILS: "/section/details",
  ALL: "/all",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/thankyou
   * @desc Add Thank you page
   * @access Private
   * **/
  .post(thankyouCtrl.createThankYouPage)
  /**
   * @api {GET} /api/thankyou
   * @desc Get Thank you page by id
   * @access Private
   * **/
  .get(thankyouCtrl.getThankYouPageById)
  /**
   * @api {PUT} /api/thankyou
   * @desc Edit Thank you page
   * @access Private
   * **/
  .put(thankyouCtrl.editThankYouPage)
  /**
   * @api {DELETE} /api/thankyou
   * @desc Delete Thank you page
   * @access Private
   * **/
  .delete(thankyouCtrl.deleteThankYouPage);

/**
 * @api {GET} /api/thankyou/all
 * @desc Get All Thank you pages
 * @access Private
 * **/
routes.get(PATH.ALL, thankyouCtrl.getAllThankYouPages);

routes
  .route(PATH.SECTION)
  /**
   * @api {POST} /api/thankyou/section
   * @desc Add Section
   * @access Private
   * **/
  .post(thankyouCtrl.addSection)
  /**
   * @api {GET} /api/thankyou/section
   * @desc Get All Selected Sections
   * @access Private
   * **/
  .get(thankyouCtrl.getAllSelectedSection)
  /**
   * @api {PUT} /api/thankyou/section
   * @desc Edit Section
   * @access Private
   * **/
  .put(thankyouCtrl.editSection)
  /**
   * @api {DELETE} /api/thankyou/section
   * @desc Delete Section
   * @access Private
   * **/
  .delete(thankyouCtrl.deleteSection);

routes
  .route(PATH.DETAILS)
  /**
   * @api {GET} /api/thankyou/section/details
   * @desc Get Section Details
   * @access Private
   * **/
  .get(thankyouCtrl.getSectionById);

routes
  .route(PATH.SCRIPT)
  /**
   * @api {GET} /api/thankyou/script
   * @desc Get all script tags
   * @access Private
   * **/
  .get(thankyouCtrl.getScriptTags)
  /**
   * @api {POST} /api/thankyou/script
   * @desc Add Script Tag
   * @access Private
   * **/
  .post(thankyouCtrl.addScriptTag)
  /**
   * @api {DELETE} /api/thankyou/script
   * @desc delete Script Tag
   * @access Private
   * **/
  .delete(thankyouCtrl.deleteScriptTag);

export default routes;
