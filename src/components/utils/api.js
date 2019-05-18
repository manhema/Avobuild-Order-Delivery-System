import axios from "axios";
const uri =
  "https://order-delivery-rest-api-micro-service-lznirj4v3q-uc.a.run.app";

// const uri = "http://localhost:8080";

export const getOrders = async args => {
  return await axios
    .get(`${uri}/orders`, {
      params: args
    })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw Object({ success: false, message: error.response });
    });
};

export const getOrder = async args => {
  return await axios
    .get(`${uri}/order/scan`, {
      params: args
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export const recordDelivery = async params => {
  return await axios
    .post(`${uri}/order/deliver`, params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export const recordCollection = async params => {
  return await axios
    .post(`${uri}/order/collect`, params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};
