import DBOperation from "../services/database_operation.js";
import SchemaModel from "../services/schema_model.js";
import { v4 as uuidv4 } from "uuid";

const schema = {
  survey_id: {
    type: String,
    default: uuidv4,
  },
  title: String,
  question_answer: [
    {
      _id: false,
      question: String,
      answer_type: String,
      options: [String],
      answer: String,
    },
  ],
  shop: String,
};

const modelName = "survey";

export let SurveyModel = DBOperation.createModel(modelName, schema);

let surveyModel = new SchemaModel(SurveyModel);
export default surveyModel;
