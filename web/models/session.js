import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";

const schema = {
  id: String,
  shop: String,
  state: String,
  isOnline: String,
  accessToken: String,
  scope: String,
};

const modelName = "shopify_sessions";

export let ShopifySessionModel = DBOperation.createModel(modelName, schema);

let shopifySessionModel = new SchemaModel(ShopifySessionModel);
export default shopifySessionModel;
