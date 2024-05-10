import axios from "axios";

const API_URL = "http://localhost:4005/api/contents/";

export const fetchContents = () => {
  return axios.get(API_URL);
};

export const createContent = (contentData) => {
  return axios.post(API_URL, contentData);
};

export const updateContent = (id, contentData) => {
  return axios.put(`${API_URL}${id}`, contentData);
};

export const deleteContent = (id) => {
  return axios.delete(`${API_URL}${id}`);
};
