import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Status
 * 0 - Inactive
 * 1 - Active
 */

const schema = {
  funnel_id: {
    type: String,
    default: uuidv4,
  },
  conditions: String,
  funnel_title: String,
  funnel_activity: String,
  is_default: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  store_client_id: Number,
  store_name: String,
  offer_data: [
    {
      _id: false,
      funnel_offers_id: String,
    },
  ],
  shop: String,
  main_trigger: [
    {
      _id: false,
      trigger: [
        {
          _id: false,
          category: String,
          condition_type: String,
          conditions: String,
          parameter: String,
          tags: [String],
        },
      ],
    },
  ],
};

const modelName = "funnel";

export let FunnelModel = DBOperation.createModel(modelName, schema);

let funnelModel = new SchemaModel(FunnelModel);
export default funnelModel;
