import {
  deleteWithToken,
  getWithToken,
  postWithToken,
  putWithToken,
} from "./DashboardService";

export const GetAllTyPages = async (url, token, payData) => {
  return new Promise((resolve, reject) => {
    return getWithToken(url, token, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const EditTyPage = async (url, token, payData) => {
  return new Promise((resolve, reject) => {
    return putWithToken(url, token, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const AddTyPage = async (url, token, payData) => {
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

export const DeleteTyPage = async (url, token) => {
  return new Promise((resolve, reject) => {
    return deleteWithToken(url, token)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetTodayTyStatistics = async (url, token) => {
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

export const GetLastDayTyDashboardStats = async (url, token, payData) => {
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

export const GetMonthTyStats = async (url, token) => {
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

export const GetCustomTyStats = async (url, token, payData) => {
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