import { getWithToken } from "./DashboardService";

export const GetAllActivities = async (url, token) => {
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
