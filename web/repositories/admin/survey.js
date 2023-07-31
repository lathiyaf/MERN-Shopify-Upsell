import { logger, level } from "../../config/logger.js";
import surveyModel from "../../models/survey.js";

export const createSurvey = async (body, session) => {
  logger.log(level.info, `>> createSurvey()`);
  await surveyModel.add({
    ...body,
    shop: session.shop,
  });
  const data = {
    message: "Survey created successfully",
  };
  return data;
};

export const getAllSurveys = async (session) => {
  logger.log(level.info, `>> getAllSurveys()`);
  let data = {};

  const surveyData = await surveyModel.get({
    shop: session.shop,
  });

  if (surveyData && surveyData.length > 0) {
    data = {
      message: "Survey data fetched successfully",
      data: surveyData,
    };
  } else {
    data = {
      message: "Survey data fetched successfully",
      data: [],
    };
  }
  return data;
};

export const updateSurvey = async (query, body) => {
  logger.log(level.info, `>> updateSurvey()`);

  await surveyModel.update(
    {
      survey_id: query.survey_id,
    },
    {
      $set: { ...body },
    }
  );
  const data = {
    message: "Survey data updated successfully",
  };
  return data;
};

export const deleteSurvey = async (query) => {
  logger.log(level.info, `>> deleteSurvey()`);

  await surveyModel.delete({
    survey_id: query.survey_id,
  });
  const data = {
    message: "Survey data deleted successfully",
  };
  return data;
};

export const getSurveyById = async (query) => {
  logger.log(level.info, `>> getSurveyById()`);

  const [surveyData] = await surveyModel.get({
    survey_id: query.survey_id,
  });
  const data = {
    message: "Survey data fetched successfully",
    data: surveyData,
  };
  return data;
};
