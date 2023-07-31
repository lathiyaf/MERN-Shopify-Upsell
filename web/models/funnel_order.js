import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  funnel_order_id: {
    type: String,
    default: uuidv4,
  },
  checkout_token: String,
  customer_id: Number,
  final_price: Number,
  funnel_id: {
    type: String,
    ref: "funnels",
  },
  funnel_offer_id: {
    type: String,
    ref: "funnel_offers",
  },
  order_id: {
    type: Number,
    ref: "orders",
  },
  qty: Number,
  subtotal_price: Number,
  total_discount: Number,
  total_price: Number,
  total_tax: Number,
  variant_id: Number,
  shop: String,
  discount_price: Number,
  thankyou_page_id: String,
};

const modelName = "funnel_order";

export let FunnelOrderModel = DBOperation.createModel(modelName, schema);

let funnelOrderModel = new SchemaModel(FunnelOrderModel);
export default funnelOrderModel;
