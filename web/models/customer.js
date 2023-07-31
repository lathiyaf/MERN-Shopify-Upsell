import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  customer_id: {
    type: String,
    default: uuidv4,
  },
  cid: Number, // shopify customer id
  email: String,
  first_name: String,
  last_name: String,
  note: String,
  shop: String,
};

const modelName = "customer";

export let CustomerModel = DBOperation.createModel(modelName, schema);

let customerModel = new SchemaModel(CustomerModel);
export default customerModel;
