import {
  deleteWithToken,
  getWithToken,
  postWithToken,
  putWithToken,
} from "./DashboardService";

export const GetAllFunnels = async (url, token) => {
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

export const EditFunnel = async (url, token, payData) => {
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

export const AddFunnel = async (url, token, payData) => {
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

export const DeleteFunnel = async (url, token) => {
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

export const GetTodayFunnelStats = async (url, token) => {
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

export const GetLastDayFunnelStats = async (url, token, payData) => {
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

export const GetMonthFunnelStats = async (url, token) => {
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

export const GetCustomFunnelStats = async (url, token, payData) => {
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
