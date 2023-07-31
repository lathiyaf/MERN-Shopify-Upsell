import { logger, level } from "../../config/logger.js";
import customerModel from "../../models/customer.js";
import orderModel from "../../models/order.js";
import productModel from "../../models/product.js";
import { ShopifySessionModel } from "../../models/session.js";

export const orderCreate = async (body, shop) => {
  logger.log(level.info, `>> orderCreate()`);
  const orderData = await orderModel.get({ id: body.id });

  if (orderData.length === 0) {
    await orderModel.add({ ...body, shop });
    logger.log(level.info, `>> order created successfully`);
  } else {
    logger.log(level.info, `>> order already exists`);
  }
};

export const deleteApp = async (shopDomain) => {
  logger.log(level.info, `>> deleteApp()`);
  await ShopifySessionModel.deleteOne({
    shop: shopDomain,
  });
};

export const updateOrder = async (body, shop) => {
  logger.log(level.info, `>> updateOrder()`);
  await orderModel.update({ id: body.id }, { $set: { ...body, shop } });
  logger.log(level.info, `>> Order updated successfully`);
};

export const createCustomer = async (body, shop) => {
  logger.log(level.info, `>> createCustomer()`);

  const customerData = await customerModel.get({ cid: body.id });
  if (customerData.length === 0) {
    await customerModel.add({ ...body, cid: body.id, shop });
    logger.log(level.info, `>> Customer created successfully`);
  } else {
    logger.log(level.info, `>> Customer already exists.`);
  }
};

export const updateCustomer = async (body, shop) => {
  logger.log(level.info, `>> updateCustomer()`);
  const customerData = await customerModel.get({ cid: body.id });

  if (customerData.length === 0) {
    await customerModel.add({ ...body, shop, cid: body.id });
    logger.log(level.info, `>> Customer created successfully`);
  } else {
    await customerModel.update({ cid: body.id }, { $set: { ...body, shop } });
    logger.log(level.info, `>> Customer updated successfully`);
  }
};

export const updateProduct = async (body, shop) => {
  logger.log(level.info, `>> updateProduct`);

  const productData = await productModel.get({ id: body.id });

  if (productData.length === 0) {
    await productModel.add({ ...body, shop });
    logger.log(level.info, `>> product created successfully`);
  } else {
    await productModel.update({ id: body.id }, { $set: { ...body, shop } });
    logger.log(level.info, `>> product already exists`);
  }
};
