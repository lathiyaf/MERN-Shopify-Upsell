import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  product_comment_id: {
    type: String,
    default: uuidv4,
  },
  shop: String,
  customer_id: String,
  order_id: String,
  product_id: String,
  variant_id: String,
  comment: String,
  item_title: String,
  product_title: String,
  variant_title: String,
  customer_name: String,
};

const modelName = "product_comment";

export let ProductCommentModel = DBOperation.createModel(modelName, schema);

let productCommentModel = new SchemaModel(ProductCommentModel);
export default productCommentModel;