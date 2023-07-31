import { logger, level } from "../../config/logger.js";
import { serverError, successResponse } from "../../utils/utility.js";
import * as offerRepo from "../../repositories/admin/offer.js";

export const addOffer = async (req, res) => {
  logger.log(level.debug, `>> addOffer()`);
  const session = res.locals.shopify.session;

  try {
    const result = await offerRepo.addOffer(req.body, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< addOffer err=${err}`);
    serverError(res);
  }
};

export const getOfferById = async (req, res) => {
  logger.log(level.debug, `>> getOfferById()`);
  const session = res.locals.shopify.session;

  try {
    const result = await offerRepo.getOfferById(req.query, session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getOfferById err=${err}`);
    serverError(res);
  }
};

export const editOffer = async (req, res) => {
  logger.log(level.debug, `>> editOffer()`);

  try {
    const result = await offerRepo.editOffer(req.query, req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< editOffer err=${err}`);
    serverError(res);
  }
};

export const deleteOffer = async (req, res) => {
  logger.log(level.debug, `>> deleteOffer()`);

  try {
    const result = await offerRepo.deleteOffer(req.query);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< deleteOffer err=${err}`);
    serverError(res);
  }
};

export const duplicateOffer = async (req, res) => {
  logger.log(level.debug, `>> duplicateOffer()`);

  try {
    const result = await offerRepo.duplicateOffer(req.body);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< duplicateOffer err=${err}`);
    serverError(res);
  }
};

export const getAllOffers = async (req, res) => {
  logger.log(level.debug, `>> getAllOffers()`);
  const session = res.locals.shopify.session;

  try {
    const result = await offerRepo.getAllOffers(session);
    successResponse(res, result);
  } catch (err) {
    logger.log(level.error, `<< getAllOffers err=${err}`);
    serverError(res);
  }
};
