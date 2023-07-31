import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  product_id: {
    type: String,
    default: uuidv4,
  },
  body_html: String,
  handle: String,
  id: String,
  images: [Object],
  options: Object,
  product_type: String,
  published_at: Date,
  published_scope: String,
  status: String,
  tags: String,
  template_suffix: String,
  title: String,
  variants: [Object],
  vendor: String,
  shop: String,
};

const modelName = "products";

export let ProductModel = DBOperation.createModel(modelName, schema);

let productModel = new SchemaModel(ProductModel);
export default productModel;
