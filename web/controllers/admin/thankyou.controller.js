import { logger, level } from "../../config/logger.js";
import {
  getOptionsPipelineJson,
  serverError,
  standardStructureStringToJson,
  successResponse,
} from "../../utils/utility.js";
import * as thankyouRepo from "../../repositories/admin/thankyou.js";

export const createThankYouPage = async (req, res) => {
  logger.log(level.debug, `>> createThankYouPage()`);
  const session = res.locals.shopify.session;

  try {
    const result = await thankyouRepo.createThankYouPage(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< createThankYouPage error=${err}`);
    serverError(res);
  }
};

export const getThankYouPageById = async (req, res) => {
  logger.log(level.debug, `>> getThankYouPageById()`);

  try {
    const result = await thankyouRepo.getThankYouPageById(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getThankYouPageById error=${err}`);
    serverError(res);
  }
};

export const editThankYouPage = async (req, res) => {
  logger.log(level.debug, `>> editThankYouPage()`);

  try {
    const session = res.locals.shopify.session;
    const result = await thankyouRepo.editThankYouPage(
      req.query,
      req.body,
      session
    );
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< editThankYouPage error=${err}`);
    serverError(res);
  }
};

export const deleteThankYouPage = async (req, res) => {
  logger.log(level.debug, `>> deleteThankYouPage()`);

  try {
    const result = await thankyouRepo.deleteThankYouPage(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< deleteThankYouPage error=${err}`);
    serverError(res);
  }
};

export const addSection = async (req, res) => {
  logger.log(level.debug, `>> addSection()`);

  try {
    const result = await thankyouRepo.addSection(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addSection error=${err}`);
    serverError(res);
  }
};

export const getAllSelectedSection = async (req, res) => {
  logger.log(level.debug, `>> getAllSelectedSection()`);

  try {
    const result = await thankyouRepo.getAllSelectedSection(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllSelectedSection error=${err}`);
    serverError(res);
  }
};

export const editSection = async (req, res) => {
  logger.log(level.debug, `>> editSection()`);

  try {
    const result = await thankyouRepo.editSection(req.query, req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< editSection error=${err}`);
    serverError(res);
  }
};

export const deleteSection = async (req, res) => {
  logger.log(level.debug, `>> deleteSection()`);

  try {
    const result = await thankyouRepo.deleteSection(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< deleteSection error=${err}`);
    serverError(res);
  }
};

export const getSectionById = async (req, res) => {
  logger.log(level.debug, `>> getSectionById()`);

  try {
    const result = await thankyouRepo.getSectionById(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getSectionById error=${err}`);
    serverError(res);
  }
};

export const getScriptTags = async (req, res) => {
  logger.log(level.debug, `>> getScriptTags()`);

  try {
    const session = res.locals.shopify.session;
    const result = await thankyouRepo.getScriptTags(session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getScriptTags error=${err}`);
    serverError(res);
  }
};

export const addScriptTag = async (req, res) => {
  logger.log(level.debug, `>> addScriptTag()`);

  try {
    const session = res.locals.shopify.session;
    const result = await thankyouRepo.addScriptTag(session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addScriptTag error=${err}`);
    serverError(res);
  }
};

export const deleteScriptTag = async (req, res) => {
  logger.log(level.debug, `>> deleteScriptTag()`);

  try {
    const session = res.locals.shopify.session;
    const result = await thankyouRepo.deleteScriptTag(session, req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< deleteScriptTag error=${err}`);
    serverError(res);
  }
};

export const getAllThankYouPages = async (req, res) => {
  logger.log(level.debug, `>> getAllThankYouPages()`);
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsPipelineJson(extraParams);

  try {
    const session = res.locals.shopify.session;
    const result = await thankyouRepo.getAllThankYouPages(
      session,
      options,
      req.query
    );
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllThankYouPages error=${err}`);
    serverError(res);
  }
};
