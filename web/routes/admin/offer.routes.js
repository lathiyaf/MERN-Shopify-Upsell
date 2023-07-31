import { Router } from "express";
const routes = new Router();
import * as offerCtrl from "../../controllers/admin/offer.controller.js";

const PATH = {
  ROOT: "/",
  DUPLICATE: "/duplicate_offer",
  OFFERS: "/select_offers",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/offer
   * @desc Add Funnel Offer
   * @access Private
   * **/
  .post(offerCtrl.addOffer)
  /**
   * @api {GET} /api/offer
   * @desc Get offer by id
   * @access Private
   * **/
  .get(offerCtrl.getOfferById)
  /**
   * @api {PUT} /api/offer
   * @desc Update offer
   * @access Private
   * **/
  .put(offerCtrl.editOffer)
  /**
   * @api {DELETE} /api/offer
   * @desc Delete offer
   * @access Private
   * **/
  .delete(offerCtrl.deleteOffer);

/**
 * @api {POST} /api/offer/duplicate_offer
 * @desc Duplicate offer
 * @access Private
 * **/
routes.route(PATH.DUPLICATE).post(offerCtrl.duplicateOffer);

/**
 * @api {GET} /api/offer/select_offers
 * @desc Get all offers
 * @access Private
 * **/
routes.get(PATH.OFFERS, offerCtrl.getAllOffers);

export default routes;
