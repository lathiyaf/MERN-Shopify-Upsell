import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Status
 * 0 - Inactive
 * 1 - Active
 */

const schema = {
  template_id: {
    type: String,
    default: uuidv4,
  },
  mode: String,
  name: String,
  page_id: String,
  premade_page_id: String,
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  store_client_id: Number,
  template_title: String,
  direction: String,
  offer_id: String,
  offer_name: String,
  parent_id: String,
  shop: String,
  store_client_id: String,
  funnel_id: {
    type: String,
    ref: "funnels",
  },
  html: Object,
  is_default: {
    type: Boolean,
    default: false,
  },
  left_section_data: [Object],
  customer_information_after_html: [String],
  order_confirm_after_html: [String],
  order_confirm_before_html: [String],
};

const modelName = "thank_you";

export let ThankYouPageModel = DBOperation.createModel(modelName, schema);

let tyPageModel = new SchemaModel(ThankYouPageModel);
export default tyPageModel;
