import axios from "axios";

const API_URL = "http://localhost:4005/api/payments/";

export const fetchPayments = () => {
  return axios.get(API_URL);
};
