import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  offer_accept_id: {
    type: String,
    default: uuidv4,
  },
  order_id: {
    type: String,
    ref: "orders",
  },
  funnel_id: {
    type: String,
    ref: "funnels",
  },
  funnel_offer_id: {
    type: String,
    ref: "funnel_offers",
  },
  is_accept: {
    type: Boolean,
    default: false,
  },
  shop: String,
};

const modelName = "offer_accept";

export let OfferAcceptModel = DBOperation.createModel(modelName, schema);

let offerAcceptModel = new SchemaModel(OfferAcceptModel);
export default offerAcceptModel;
