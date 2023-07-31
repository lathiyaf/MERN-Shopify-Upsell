import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  birthday_id: {
    type: String,
    default: uuidv4,
  },
  customer_id: Number, // shopify customer id
  email: String,
  first_name: String,
  last_name: String,
  dob: Date,
  shop: String,
};

const modelName = "birthday";

export let BirthdayModel = DBOperation.createModel(modelName, schema);

let birthdayModel = new SchemaModel(BirthdayModel);
export default birthdayModel;
