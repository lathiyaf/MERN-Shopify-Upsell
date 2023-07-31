import { logger, level } from "../../config/logger.js";
import { constants as TOPIC } from "../../constants/topic.js";
import * as webhookRepo from "../../repositories/webhook/webhook.js";

export const webhook = async (req, res) => {
  logger.log(level.info, `>> webhook()`);
  const shop = req.header("x-shopify-shop-domain");

  try {
    switch (req.header("x-shopify-topic")) {
      case TOPIC.ORDER_CREATE: {
        await webhookRepo.orderCreate(req.body, shop);
        break;
      }
      case TOPIC.APP_UNINSTALLED: {
        await webhookRepo.deleteApp(req.body.domain);
        break;
      }
      case TOPIC.ORDER_UPDATE: {
        await webhookRepo.updateOrder(req.body, shop);
        break;
      }
      case TOPIC.CUSTOMER_CREATE: {
        await webhookRepo.createCustomer(req.body, shop);
        break;
      }
      case TOPIC.CUSTOMER_UPDATE: {
        await webhookRepo.updateCustomer(req.body, shop);
        break;
      }
      case TOPIC.PRODUCT_UPDATE: {
        await webhookRepo.updateProduct(req.body, shop);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    logger.log(level.error, `<< webhook error=${e}`);
  }
};
