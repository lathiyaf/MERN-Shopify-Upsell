import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  setting_id: {
    type: String,
    default: uuidv4,
  },
  email_status: {
    type: Boolean,
    default: false,
  },
  product_upsell: {
    type: Boolean,
    default: false,
  },
  product_recommd: {
    type: Boolean,
    default: false,
  },
  reorder: {
    type: Boolean,
    default: false,
  },
  reserved_time: Number,
  authorized_time: Number,
  handle_payment: String,
  handle_fulfillment: String,
  order_note_text: String,
  order_tag_status: String,
  hold_tag: {
    type: Boolean,
    default: false,
  },
  keep_conversion: {
    type: Boolean,
    default: false,
  },
};

const modelName = "setting";

export let SettingModel = DBOperation.createModel(modelName, schema);

let settingModel = new SchemaModel(SettingModel);
export default settingModel;
