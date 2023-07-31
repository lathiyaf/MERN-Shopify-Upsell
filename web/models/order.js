import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  order_id: {
    type: String,
    default: uuidv4,
  },
  id: Number,
  admin_graphql_api_id: String,
  app_id: String,
  cancelled_at: String,
  checkout_token: String,
  closed_at: String,
  currency: String,
  discount_codes: [Object],
  name: String,
  note: String,
  note_attributes: [Object],
  order_number: Number,
  order_status_url: String,
  payment_gateway_names: [String],
  subtotal_price: String,
  total_discounts: String,
  total_price: String,
  total_tax: String,
  billing_address: Object,
  customer: Object,
  discount_applications: [Object],
  fulfillments: [Object],
  line_items: [Object],
  refunds: [Object],
  tags: [String],
  shop: String,
};

const modelName = "order";

export let OrderModel = DBOperation.createModel(modelName, schema);

let orderModel = new SchemaModel(OrderModel);
export default orderModel;
