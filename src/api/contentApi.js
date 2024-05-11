import axios from "axios";

const API_URL = "http://localhost:4005/api/contents/";
const token = localStorage.getItem("token");

// Prepare headers configuration
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export const fetchContents = () => {
  return axios.get(API_URL, config);
};

export const createContent = (contentData) => {
  return axios.post(API_URL, contentData, config);
};

export const updateContent = (id, contentData) => {
  return axios.put(`${API_URL}${id}`, contentData, config);
};

export const deleteContent = (id) => {
  return axios.delete(`${API_URL}${id}`, config);
};
