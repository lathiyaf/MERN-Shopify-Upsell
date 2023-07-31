import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  offer_id: {
    type: String,
    default: uuidv4,
  },
  offer_name: String,
};

const modelName = "offer";

export let OfferModel = DBOperation.createModel(modelName, schema);

let offerModel = new SchemaModel(OfferModel);
export default offerModel;
