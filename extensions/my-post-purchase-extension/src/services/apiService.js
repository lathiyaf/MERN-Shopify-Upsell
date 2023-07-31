import api from "../api/api";
import { constants as API_CONST } from "../api/url";

export const GetAllProducts = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.GET_PRODUCT, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ImpressionCount = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.IMP_COUNT, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const FunnelActivity = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.FUNNEL_ACT, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const NextFunnelAPI = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.NEXT_FUNNEL, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const OfferAccept = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.OFFER_ACCEPT, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ApplyChangeset = async (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.APPLY_CHANGESET, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const FunnelOrder = async (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.FUNNEL_ORDER, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
