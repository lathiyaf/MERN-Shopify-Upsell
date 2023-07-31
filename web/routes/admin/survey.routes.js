import { Router } from "express";
const routes = new Router();
import * as surveyCtrl from "../../controllers/admin/survey.controller.js";

const PATH = {
  ROOT: "/",
  DETAILS: "/details",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/survey
   * @desc Create Survey
   * @access Private
   * **/
  .post(surveyCtrl.createSurvey)
  /**
   * @api {GET} /api/survey
   * @desc Get All Surveys
   * @access Private
   * **/
  .get(surveyCtrl.getAllSurveys)
  /**
   * @api {PUT} /api/survey
   * @desc Update Survey
   * @access Private
   * **/
  .put(surveyCtrl.updateSurvey)
  /**
   * @api {DELETE} /api/survey
   * @desc Delete Survey
   * @access Private
   * **/
  .delete(surveyCtrl.deleteSurvey);

routes
  .route(PATH.DETAILS)
  /**
   * @api {POST} /api/survey/details
   * @desc Get Survey By Id
   * @access Private
   * **/
  .get(surveyCtrl.getSurveyById);

export default routes;
