import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  activity_id: {
    type: String,
    default: uuidv4,
  },
  action: String, //First offer displayed - No action was taken by the customer
  actions_data: String,
  customer_firstname: String,
  customer_lastname: String,
  customer_id: Number,
  funnel_id: {
    type: String,
    ref: "funnel",
  },
  offer_id: {
    type: String,
    ref: "offer",
  },
  order_id: Number,
  order_name: String,
  shop: String,
  value: String, //₹320.00 (+₹57.60 tax)
  template_id: {
    type: String,
    ref: "thank_you",
  },
};

const modelName = "activity";

export let ActivityModel = DBOperation.createModel(modelName, schema);

let activityModel = new SchemaModel(ActivityModel);
export default activityModel;
