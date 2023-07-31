import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  submit_survey_id: {
    type: String,
    default: uuidv4,
  },
  survey_id: {
    type: String,
    ref: "survey",
  },
  title: String,
  question_answer: [
    {
      _id: false,
      question: String,
      answer: String,
    },
  ],
  order_number: Number,
  submit_date: Date,
  shop: String,
  customer_id: Number,
};

const modelName = "submit_survey";

export let SubmitSurveyModel = DBOperation.createModel(modelName, schema);

let submitSurveyModel = new SchemaModel(SubmitSurveyModel);
export default submitSurveyModel;
