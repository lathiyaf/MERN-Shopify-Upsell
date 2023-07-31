import { logger, level } from "../../config/logger.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import * as pipeline from "../../aggregate_pipeline/extension.js";
import funnelModel from "../../models/funnel.js";
import {
  getOptionsJson,
  standardStructureStringToJson,
} from "../../utils/utility.js";
import orderModel from "../../models/order.js";
import productModel from "../../models/product.js";
import funnelOfferModel from "../../models/funnel_offer.js";
import impressionModel from "../../models/impression.js";
import activityModel from "../../models/activity.js";
import offerAcceptModel from "../../models/offer_accept.js";
import funnelOrderModel from "../../models/funnel_order.js";
import { ShopifySessionModel } from "../../models/session.js";
import shopify from "../../shopify.js";
import tyPageModel from "../../models/thank_you_page.js";
import sectionModel from "../../models/section.js";
import birthdayModel from "../../models/birthday.js";
import surveyModel from "../../models/survey.js";
import submitSurveyModel from "../../models/submit_survery.js";
import moment from "moment-timezone";
import productCommentModel from "../../models/product_comment.js";

export const signChangeset = async (body) => {
  logger.log(level.info, `>> signChangeset()`);
  let data = {};

  const decodedToken = jwt.verify(body.token, process.env.SHOPIFY_API_SECRET);
  const decodedReferenceId =
    decodedToken.input_data.initialPurchase.referenceId;

  if (decodedReferenceId !== body.referenceId) {
    data = {
      error: true,
    };
    return data;
  }

  const payload = {
    iss: process.env.SHOPIFY_API_KEY,
    jti: uuidv4(),
    iat: Date.now(),
    sub: body.referenceId,
    changes: body.changes,
  };
  const token = jwt.sign(payload, process.env.SHOPIFY_API_SECRET);
  data = {
    error: false,
    token,
  };
  return data;
};

export const getProducts = async (body) => {
  logger.log(level.info, `>> getProducts()`);

  const filter = {
    shop: body.initialData.shop.domain,
  };
  const funnelData = await funnelModel.aggregate(pipeline.pipelineForFunnel());

  const extraParams = standardStructureStringToJson({ page: "1", limit: "1" });
  const options = getOptionsJson(extraParams);
  const orderData = await orderModel.get({}, "", options);

  const productData = await productModel.aggregate(
    pipeline.pipelineForProducts(filter)
  );

  const data = {
    message: "Product data fetched successfully",
    data: {
      ...funnelData[0].funnelData,
      ...productData[0],
      product_id: productData[0].id,
      product_title: productData[0].title,
      images: productData[0].images,
      order_data: orderData[0],
    },
    order_data: {
      id: orderData[0].id,
      name: orderData[0].name,
      note: orderData[0].note,
      note_attributes: orderData[0].note_attributes,
      order_status_url: orderData[0].order_status_url,
    },
    line_items: orderData[0].line_items[0].id,
  };
  return data;
};

export const nextFunnel = async (body) => {
  const { funnel_id, funnel_offer_id } = body;
  let filterOffer = { funnel_id, parent_id: funnel_offer_id };
  const filterProduct = { shop: body.shop };

  const offerData = await funnelOfferModel.get(filterOffer);
  const extraParams = standardStructureStringToJson({ page: "1", limit: "1" });
  const options = getOptionsJson(extraParams);
  const orderData = await orderModel.get({}, "", options);
  const [nextUpsell] = offerData.filter((item) => item.type === "upsell");
  const [nextDownsell] = offerData.filter((item) => item.type === "downsell");
  const productData = await productModel.aggregate(
    pipeline.pipelineForProducts(filterProduct)
  );

  let upsell = {
    ...(nextUpsell && nextUpsell._doc),
    ...productData[0],
    product_id: productData[0].id,
    product_title: productData[0].title,
    images: productData[0].images,
    order_data: orderData[0],
  };
  let downSell = {
    ...(nextDownsell && nextDownsell._doc),
    ...productData[0],
    product_id: productData[0].id,
    product_title: productData[0].title,
    images: productData[0].images,
    order_data: orderData[0],
  };

  let data = {
    message: "Next funnel data fetched successfully",
    upsell,
    downSell,
  };
  return data;
};

export const addImpression = async (body) => {
  logger.log(level.info, `>> addImpression()`);

  if (body.impressionId === false) {
    let addedImpression = await impressionModel.add({ ...body });
    const data = {
      message: "Impression added successfully",
      impression_id: addedImpression.impression_id,
    };
    return data;
  } else {
    await impressionModel.update(
      {
        impression_id: body.impressionId,
      },
      { $set: { ...body } }
    );
    const data = {
      message: "Impression updated successfully",
    };
    return data;
  }
};

export const addActivity = async (body) => {
  logger.log(level.info, `>> addActivity()`);

  if (body.activityId === false) {
    let addedActivity = await activityModel.add({ ...body });
    const data = {
      message: "Activity added successfully",
      activity_id: addedActivity.activity_id,
    };
    return data;
  } else {
    await activityModel.add({ ...body });
    const data = {
      message: "Activity updated successfully",
    };
    return data;
  }
};

export const offerAccept = async (body) => {
  logger.log(level.info, `>> offerAccept()`);
  const { is_accept } = body;

  if (is_accept) {
    await offerAcceptModel.add({ ...body });
    const data = {
      message: "Offer accepted successfully",
    };
    return data;
  } else {
    await offerAcceptModel.add({ ...body });
    const data = {
      message: "Offer declined successfully",
    };
    return data;
  }
};

export const addFunnelOrder = async (body) => {
  logger.log(level.info, `>> addFunnelOrder()`);
  await funnelOrderModel.add({ ...body });

  const [session] = await ShopifySessionModel.find({ shop: body.shop });

  let orderData = await orderModel.get({ id: body.order_id });
  if (orderData && orderData.length > 0) {
    orderData = orderData[0];
    if (orderData.note_attributes.length === 0) {
      const order = new shopify.api.rest.Order({ session: session });
      order.id = body.order_id;
      order.note_attributes = [
        {
          name: "Shopify Upsell App",
          value: `\nfunnel_id: ${body.funnel_id} `,
        },
      ];

      await order.save({
        update: true,
      });
    }
  }

  const data = {
    message: "Funnel order created successfully",
  };
  return data;
};

export const getDefaultTyPage = async (body) => {
  logger.log(level.info, `>> getDefaultTyPage()`);

  const [session] = await ShopifySessionModel.find({ shop: body.shop });

  const customerData = await shopify.api.rest.Customer.find({
    session: session,
    customer_id: body.customer_id,
  });

  const thankyouData = await tyPageModel.aggregate([
    { $match: { is_default: true } },
    {
      $unwind: "$left_section_data",
    },
    {
      $lookup: {
        from: "sections",
        let: {
          sectionID: "$left_section_data.id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$row_section_id", "$$sectionID"] },
                  { $eq: ["$section_id", "$$sectionID"] },
                ],
              },
            },
          },
        ],
        as: "sectionData",
      },
    },
    { $unwind: "$sectionData" },
    {
      $group: {
        _id: "$_id",
        section_data: { $push: "$sectionData" },
        customer_information_after_html: {
          $first: "$customer_information_after_html",
        },
        order_confirm_after_html: {
          $first: "$order_confirm_after_html",
        },
        order_confirm_before_html: {
          $first: "$order_confirm_before_html",
        },
        funnel_id: { $first: "$funnel_id" },
      },
    },
  ]);

  const [orderData] = await orderModel.get({
    id: body.order_id,
  });

  const surveyData = await submitSurveyModel.get(
    {
      customer_id: body.customer_id,
      shop: body.shop,
    },
    "-customer_id -question_answer -shop -submit_date -submit_survey_id -updated_at -_id -created_at -__v"
  );

  const productCommData = await productCommentModel.get(
    {
      order_id: body.order_id,
      shop: body.shop,
    },
    "-_id -shop -customer_id -order_id -product_id -item_title -product_title -variant_title -customer_name -product_comment_id -created_at -updated_at -__v"
  );

  const [sectionData] = await sectionModel.get({ section_id: "23" });

  let prdCommObj = {};
  if (productCommData.length > 0) {
    productCommData.map((prd) => {
      prdCommObj = {
        ...prdCommObj,
        [prd.variant_id]: prd.comment,
      };
    });
  }

  let response = {
    thankyou_data: thankyouData,
    order_data: orderData,
    is_birthday_submitted: customerData?.note !== null ? true : false,
    surveyData: surveyData,
    product_comment: {
      prod_comm_arr: prdCommObj,
      is_show: sectionData.is_product_comment,
    },
  };

  const data = {
    message: "Thank you page data fetched successfully",
    data: response,
  };
  return data;
};

export const generateReorder = async (body) => {
  logger.log(level.info, `>> generateReorder()`);

  const [session] = await ShopifySessionModel.find({ shop: body.shop });
  const [sectionData] = await sectionModel.get({
    row_section_id: body.row_section_id,
  });

  let arr = [];
  body.order_detail.line_items.length > 0 &&
    body.order_detail.line_items.map((item) => {
      let amount =
        sectionData?.selected_discount_type === "percentage"
          ? ((item.price * sectionData?.discount_value) / 100).toFixed(2)
          : sectionData?.discount_value;
      let obj = {
        variant_id: item.variant_id,
        quantity: item.quantity,
        applied_discount: {
          amount: amount,
          description: "Description",
          title: sectionData?.discount_name,
          value: sectionData?.discount_value,
          value_type: sectionData?.selected_discount_type,
        },
      };
      arr.push(obj);
    });

  const draft_order = new shopify.api.rest.DraftOrder({ session: session });
  draft_order.billing_address = body.order_detail.billing_address;
  draft_order.customer = {
    id: body.customer_id,
  };
  draft_order.line_items = arr;
  draft_order.note_attributes = [
    {
      name: "Shopify Upsell App",
      value: `\nfunnel_id: ${body.funnel_id} `,
    },
  ];
  draft_order.shipping_address = body.order_detail.shipping_address;
  draft_order.shipping_line = body.order_detail.shipping_rate;
  await draft_order.save({
    update: true,
  });

  let data = {
    message: "Reorder successfully",
    invoice_url: draft_order.invoice_url,
  };
  return data;
};

export const saveBirthday = async (body) => {
  logger.log(level.info, `>> saveBirthday()`);
  const [session] = await ShopifySessionModel.find({ shop: body.shop });

  const birthdayData = await birthdayModel.get({
    customer_id: body.customer_id,
  });

  if (birthdayData.length === 0) {
    const customerData = await shopify.api.rest.Customer.find({
      session: session,
      id: body.customer_id,
    });
    await birthdayModel.add({
      ...body,
      dob: body.birthday,
      ...customerData,
    });

    const customer = new shopify.api.rest.Customer({ session: session });
    customer.id = body.customer_id;
    customer.note = `Birthday : ${body.birthday};`;
    await customer.save({
      update: true,
    });
  }
  const data = {
    message: "Birthday saved successfully",
  };
  return data;
};

export const surveySubmit = async (body) => {
  logger.log(level.info, `>> surveySubmit()`);

  const [surveyData] = await surveyModel.get({
    survey_id: body.survey_id,
  });

  let arr = [];
  if (surveyData.question_answer.length > 0) {
    surveyData.question_answer.map((que, i) => {
      Object.values(body.answer).map((ans, index) => {
        if (i === index) {
          let obj = {
            question: que.question,
            answer: ans,
          };
          arr.push(obj);
        }
      });
    });
  }

  await submitSurveyModel.add({
    ...body,
    submit_date: moment().format("L"),
    question_answer: arr,
  });

  const data = {
    message: "Survey submitted successfully.",
  };
  return data;
};

export const productComment = async (body) => {
  logger.log(level.info, `>> productComment()`);

  const productData = await productCommentModel.get({
    order_id: body.order_id,
    product_id: body.product_id,
  });

  if (productData.length === 0) {
    await productCommentModel.add({ ...body });
    const data = {
      message: "Product comment added successfully",
    };
    return data;
  }
};

export const getUpsellProduct = async (query) => {
  logger.log(level.info, `>> getUpsellProduct()`);

  const productData = await productModel.aggregate(
    pipeline.pipelineForProducts({ shop: query.shop })
  );
  const data = {
    message: "Product data fetched successfully",
    data: productData[0],
  };
  return data;
};
