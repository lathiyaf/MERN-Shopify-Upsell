import { logger, level } from "../../config/logger.js";
import * as surveyRepo from "../../repositories/admin/survey.js";
import { serverError, successResponse } from "../../utils/utility.js";

export const createSurvey = async (req, res) => {
  logger.log(level.debug, `>> createSurvey()`);
  const session = res.locals.shopify.session;

  try {
    const result = await surveyRepo.createSurvey(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< createSurvey error=${err}`);
    serverError(res);
  }
};

export const getAllSurveys = async (req, res) => {
  logger.log(level.debug, `>> getAllSurveys()`);
  const session = res.locals.shopify.session;

  try {
    const result = await surveyRepo.getAllSurveys(session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllSurveys error=${err}`);
    serverError(res);
  }
};

export const updateSurvey = async (req, res) => {
  logger.log(level.debug, `>> updateSurvey()`);

  try {
    const result = await surveyRepo.updateSurvey(req.query, req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< updateSurvey error=${err}`);
    serverError(res);
  }
};

export const deleteSurvey = async (req, res) => {
  logger.log(level.debug, `>> deleteSurvey()`);

  try {
    const result = await surveyRepo.deleteSurvey(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< deleteSurvey error=${err}`);
    serverError(res);
  }
};

export const getSurveyById = async (req, res) => {
  logger.log(level.debug, `>> getSurveyById()`);

  try {
    const result = await surveyRepo.getSurveyById(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getSurveyById error=${err}`);
    serverError(res);
  }
};
