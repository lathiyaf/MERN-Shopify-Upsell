import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  impression_id: {
    type: String,
    default: uuidv4,
  },
  customer_id: Number,
  discount_value_per: Number,
  funnel_id: {
    type: String,
    ref: "funnels",
  },
  location_no: String,
  offer_id: {
    type: String,
    ref: "offers",
  },
  order_id: {
    type: Number,
    ref: "orders",
  },
  offer_name: String,
  shop: String,
  thankyou_page_id: String,
};

const modelName = "impression";

export let ImpressionModel = DBOperation.createModel(modelName, schema);

let impressionModel = new SchemaModel(ImpressionModel);
export default impressionModel;
