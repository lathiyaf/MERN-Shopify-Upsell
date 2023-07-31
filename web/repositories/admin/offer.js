import { logger, level } from "../../config/logger.js";
import funnelOfferModel from "../../models/funnel_offer.js";
import offerModel from "../../models/offer.js";

export const addOffer = async (body, session) => {
  logger.log(level.info, `>> addOffer()`);
  let offerData = await offerModel.add({
    ...body,
  });
  await funnelOfferModel.add({
    ...body,
    shop: session.shop,
    offer_id: offerData.offer_id,
  });
  const data = {
    message: "Offer created successfully",
  };
  return data;
};

export const getOfferById = async (query, session) => {
  logger.log(level.info, `>> getOfferById()`);

  const offerData = await funnelOfferModel.get({
    shop: session.shop,
    funnel_offer_id: query.funnel_offer_id,
  });
  const data = {
    message: "Offer data fetched successfully",
    data: offerData,
  };
  return data;
};

export const editOffer = async (query, body) => {
  logger.log(level.info, `>> editOffer()`);
  await offerModel.update(
    {
      offer_id: query.offer_id,
    },
    { $set: { offer_name: body.offer_name } }
  );
  await funnelOfferModel.update(
    {
      offer_id: query.offer_id,
    },
    {
      $set: {
        ...body,
      },
    }
  );
  const data = {
    message: "Offer updated successfully",
  };
  return data;
};

export const deleteOffer = async (query) => {
  logger.log(level.info, `>> deleteOffer()`);
  await funnelOfferModel.delete({
    funnel_offer_id: query.funnel_offer_id,
  });
  const data = {
    message: "Offer deleted successfully",
  };
  return data;
};

export const duplicateOffer = async (body) => {
  logger.log(level.info, `>> duplicateOffer()`);

  const [funnelOfferData] = await funnelOfferModel.get(
    {
      funnel_offer_id: body.parent_id,
    },
    "-_id -funnel_offer_id"
  );

  if (body.thankyou_page === true) {
    await funnelOfferModel.add({
      ...body,
      offer_name: body.offer_name,
    });
    const data = {
      message: "Thank you page created successfully",
    };
    return data;
  } else {
    await funnelOfferModel.add({
      ...funnelOfferData._doc,
      offer_name: "copy_" + funnelOfferData.offer_name,
      location_no: body.location_no,
    });
    const data = {
      message: "Offer created successfully",
    };
    return data;
  }
};

export const getAllOffers = async (session) => {
  logger.log(level.info, `>> getAllOffers()`);
  let data = {};

  const offerData = await offerModel.get({
    shop: session.shop,
  });

  if (offerData && offerData.length > 0) {
    data = {
      message: "Offer data fetched successfully",
      data: offerData,
    };
  } else {
    data = {
      message: "Offer data fetched successfully",
      data: [],
    };
  }
  return data;
};
