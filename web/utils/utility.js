import HTTPStatus from "http-status";
import qs from "qs";

export const sendJSONResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

export const createSuccessResponseJSON = (data) => {
  const response = {
    data: data,
  };
  return response;
};

export const successResponse = (res, data) => {
  let code, response;
  code = HTTPStatus.OK;
  response = createSuccessResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const createErrorResponseJSON = (error) => {
  const errorResponse = {
    error: error,
  };
  return errorResponse;
};

export const serverError = (res) => {
  let code, response;
  const data = {
    message: "err_500",
  };
  code = HTTPStatus.INTERNAL_SERVER_ERROR;
  response = createErrorResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const badRequestError = (res, errors) => {
  let code, response;
  const error = typeof errors === "object" ? errors.array()[0].msg : errors;
  const data = {
    message: error,
  };
  code = HTTPStatus.BAD_REQUEST;
  response = createErrorResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const standardStructureStringToJson = (queryString) => {
  return qs.parse(queryString);
};

export const standardStructureJsonToString = (standardJson) => {
  return qs.stringify(standardJson);
};

export const getOptionsJson = (extraParams) => {
  const json = {};
  if (extraParams.limit) {
    json.limit = Number(extraParams.limit);
  }
  if (extraParams.page) {
    json.page = Number(extraParams.page);
  }
  if (extraParams.sort) {
    json.sort = extraParams.sort;
  } else {
    json.sort = "-created_at";
  }
  return json;
};

export const getOptionsPipelineJson = (extraParams) => {
  const json = {};
  if (extraParams.search) {
    json.search = extraParams.search;
  }
  if (extraParams.limit) {
    json.limit = Number(extraParams.limit);
  }
  if (extraParams.page || extraParams.limit) {
    let page = Number(extraParams.page);
    let limit = Number(extraParams.limit);
    json.skip = page > 0 ? (page - 1) * limit : 0;
    json.limit = limit;
  }

  return json;
};
