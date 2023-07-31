import { logger, level } from "../../config/logger.js";
import {
  getOptionsPipelineJson,
  serverError,
  standardStructureStringToJson,
  successResponse,
} from "../../utils/utility.js";
import * as funnelRepo from "../../repositories/admin/funnel.js";

export const addFunnel = async (req, res) => {
  logger.log(level.debug, `>> addFunnel()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelRepo.addFunnel(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addFunnel error=${err}`);
    serverError(res);
  }
};

export const getFunnelById = async (req, res) => {
  logger.log(level.debug, `>> getFunnelById()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelRepo.getFunnelById(req.query, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getFunnelById error=${err}`);
    serverError(res);
  }
};

export const editFunnel = async (req, res) => {
  logger.log(level.debug, `>> editFunnel()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelRepo.editFunnel(req.query, req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `>> editFunnel err=${err}`);
    serverError(res);
  }
};

export const deleteFunnel = async (req, res) => {
  logger.log(level.debug, `>> deleteFunnel()`);

  try {
    const result = await funnelRepo.deleteFunnel(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< deleteFunnel err=${err}`);
    serverError(err);
  }
};

export const getAllCollections = async (req, res) => {
  logger.log(level.debug, `>> getAllCollections()`);
  const session = res.locals.shopify.session;

  try {
    const result = await funnelRepo.getAllCollections(session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllCollections err=${err}`);
    serverError(err);
  }
};

export const getAllFunnels = async (req, res) => {
  logger.log(level.debug, `>> getAllFunnels()`);
  const session = res.locals.shopify.session;
  const extraParams = standardStructureStringToJson(req.query);
  const options = getOptionsPipelineJson(extraParams);

  try {
    const result = await funnelRepo.getAllFunnels(session, options, req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllFunnels err=${err}`);
    serverError(err);
  }
};
