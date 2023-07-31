import axios from "axios";
import { DEV_URL } from "./url";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
    } else {
      return Promise.reject(error);
    }
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (url, paydata) => {
    return axios.post(DEV_URL + url, paydata);
  },
  get: (url) => {
    return axios.get(DEV_URL + url);
  },
  delete: (url, paydata) => {
    return axios.delete(DEV_URL + url, paydata);
  },
  put: (url, paydata) => {
    return axios.put(DEV_URL + url, paydata);
  },
};
