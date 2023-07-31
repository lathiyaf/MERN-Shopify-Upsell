import axios from "axios";

export const getWithToken = (url, token) => {
  return axios({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postWithToken = (url, token, payData) => {
  return axios({
    method: "post",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payData,
  });
};

export const putWithToken = (url, token, payData) => {
  return axios({
    method: "put",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payData,
  });
};

export const deleteWithToken = (url, token) => {
  return axios({
    method: "delete",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetTodayDashboardStatistics = async (url, token) => {
  return new Promise((resolve, reject) => {
    return getWithToken(url, token)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetLastDayDashboardStats = async (url, token, payData) => {
  return new Promise((resolve, reject) => {
    return postWithToken(url, token, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetMonthDashboardStats = async (url, token) => {
  return new Promise((resolve, reject) => {
    return getWithToken(url, token)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetCustomStats = async (url, token, payData) => {
  return new Promise((resolve, reject) => {
    return postWithToken(url, token, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
