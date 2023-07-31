import { logger, level } from "../../config/logger.js";
import {
  badRequestError,
  serverError,
  successResponse,
} from "../../utils/utility.js";
import * as extensionRepo from "../../repositories/extension/extension.js";

export const signChangeset = async (req, res) => {
  logger.log(level.debug, `>> signChangeset()`);

  try {
    const result = await extensionRepo.signChangeset(req.body);
    if (result.error) return badRequestError(res, result);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< signChangeset error=${err}`);
    serverError(res);
  }
};

export const getProducts = async (req, res) => {
  logger.log(level.debug, `>> getProducts()`);

  try {
    const result = await extensionRepo.getProducts(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getProducts error=${err}`);
    serverError(res);
  }
};

export const nextFunnel = async (req, res) => {
  logger.log(level.debug, `>> nextFunnel()`);

  try {
    const result = await extensionRepo.nextFunnel(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< nextFunnel error=${err}`);
    serverError(res);
  }
};

export const addImpression = async (req, res) => {
  logger.log(level.debug, `>> addImpression()`);

  try {
    const result = await extensionRepo.addImpression(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addImpression error=${err}`);
    successResponse(res);
  }
};

export const addActivity = async (req, res) => {
  logger.log(level.debug, `>> addActivity()`);

  try {
    const result = await extensionRepo.addActivity(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addActivity error=${err}`);
    serverError(res);
  }
};

export const offerAccept = async (req, res) => {
  logger.log(level.debug, `>> offerAccept()`);

  try {
    const result = await extensionRepo.offerAccept(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< offerAccept error=${err}`);
    serverError(res);
  }
};

export const addFunnelOrder = async (req, res) => {
  logger.log(level.debug, `>> addFunnelOrder()`);

  try {
    const result = await extensionRepo.addFunnelOrder(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addFunnelOrder error=${err}`);
    serverError(res);
  }
};

export const getDefaultTyPage = async (req, res) => {
  logger.log(level.debug, `>> getDefaultTyPage()`);

  try {
    const result = await extensionRepo.getDefaultTyPage(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getDefaultTyPage error=${err}`);
    serverError(res);
  }
};

export const generateReorder = async (req, res) => {
  logger.log(level.debug, `>> generateReorder()`);

  try {
    const result = await extensionRepo.generateReorder(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< generateReorder error=${err}`);
    serverError(res);
  }
};

export const saveBirthday = async (req, res) => {
  logger.log(level.debug, `>> saveBirthday()`);

  try {
    const result = await extensionRepo.saveBirthday(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< saveBirthday error=${err}`);
    serverError(res);
  }
};

export const surveySubmit = async (req, res) => {
  logger.log(level.debug, `>> surveySubmit()`);

  try {
    const result = await extensionRepo.surveySubmit(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< surveySubmit error=${err}`);
    serverError(res);
  }
};

export const productComment = async (req, res) => {
  logger.log(level.debug, `>> productComment()`);

  try {
    const result = await extensionRepo.productComment(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< productComment error=${err}`);
    serverError(res);
  }
};

export const getUpsellProduct = async (req, res) => {
  logger.log(level.debug, `>> getUpsellProduct()`);

  try {
    const result = await extensionRepo.getUpsellProduct(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getUpsellProduct error=${err}`);
    serverError(res);
  }
};
