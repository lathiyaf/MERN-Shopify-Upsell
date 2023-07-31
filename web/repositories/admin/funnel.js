import moment from "moment-timezone";
import { pipelineForDashboardFunnel } from "../../aggregate_pipeline/extension.js";
import { logger, level } from "../../config/logger.js";
import funnelModel from "../../models/funnel.js";
import funnelOfferModel from "../../models/funnel_offer.js";
import shopify from "../../shopify.js";

export const addFunnel = async (body, session) => {
  logger.log(level.info, `>> addFunnel()`);
  if (body.is_duplicate) {
    body.funnel_title = "Copy_" + body.funnel_title;
  }
  await funnelModel.add({
    ...body,
    shop: session.shop,
    conditions: JSON.stringify(body.conditions),
  });
  const data = {
    message: "Funnel added successfully",
  };
  return data;
};

export const getFunnelById = async (query, session) => {
  logger.log(level.info, `>> getFunnelById()`);

  const [funnelData] = await funnelModel.get({
    shop: session.shop,
    funnel_id: query.funnel_id,
  });
  const data = {
    message: "Funnel data get successfully",
    data: funnelData,
  };
  return data;
};

export const editFunnel = async (query, body, session) => {
  logger.log(level.info, `>> editFunnel()`);
  body.conditions = JSON.stringify(body.conditions);

  const funnelOfferData = await funnelOfferModel.get({
    funnel_id: query.funnel_id,
  });

  let updatedData = { ...body };
  let arr = [];
  if (funnelOfferData.length > 0) {
    funnelOfferData.map((offer) => {
      let obj = {
        funnel_offers_id: offer.funnel_offer_id,
      };
      arr.push(obj);
    });
    updatedData.offer_data = arr;
  }

  if (body.is_default) {
    await funnelModel.updateMany(
      { shop: session.shop },
      { $set: { is_default: false } }
    );
    updatedData.status = 1;
  }

  await funnelModel.update(
    {
      funnel_id: query.funnel_id,
    },
    { $set: updatedData }
  );
  const data = {
    message: "Funnel data save successfully",
  };
  return data;
};

export const deleteFunnel = async (query) => {
  logger.log(level.info, `>> deleteFunnel()`);
  await funnelModel.delete({
    funnel_id: query.funnel_id,
  });
  const data = {
    message: "Funnel deleted successfully",
  };
  return data;
};

export const getAllCollections = async (session) => {
  logger.log(level.info, `>> getAllCollections()`);

  const collectionData = await shopify.api.rest.CustomCollection.all({
    session,
  });
  const data = {
    message: "Collection data fetched successfully",
    data: collectionData,
  };
  return data;
};

export const getAllFunnels = async (session, options, query) => {
  logger.log(level.info, `>> getAllFunnels()`);
  let filter = { shop: session.shop };
  const { day, start_date, end_date } = query;

  if (day === "today") {
    filter = {
      ...filter,
      created_at: { $gte: new Date() },
    };
  } else if (day === "yesterday") {
    filter = {
      ...filter,
      created_at: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        $lt: new Date(),
      },
    };
  } else if (day === "last7days") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(7, "days").toDate(),
      },
    };
  } else if (day === "last30days") {
    filter = {
      ...filter,
      created_at: {
        $gte: moment().subtract(30, "days").toDate(),
      },
    };
  } else if (day === "this") {
    filter = {
      ...filter,
      created_at: {
        $gt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(),
      },
    };
  } else if (day === "last") {
    filter = {
      ...filter,
      created_at: {
        $gt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        $lt: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
        ),
      },
    };
  } else if (day === "custom") {
    filter = {
      ...filter,
      created_at: {
        $gt: moment(start_date).toDate(),
        $lt: moment(end_date).toDate(),
      },
    };
  }

  const funnelData = await funnelModel.aggregate(
    pipelineForDashboardFunnel(filter, options)
  );
  const count = await funnelModel.aggregate(
    pipelineForDashboardFunnel(filter, {}, true)
  );
  const data = {
    message: "Funnel data fetched successfully",
    data: funnelData,
    count: count[0]?.total ? count[0].total : 0,
  };
  return data;
};
