import axios from "axios";

const API_URL = "http://localhost:4005/api/users/";

// Fetch token from localStorage
const token = localStorage.getItem("token");

// Prepare headers configuration
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// API methods with correct header usage
export const fetchUsers = () => axios.get(API_URL, config);
export const createUser = (userData) => axios.post(API_URL, userData, config);
export const updateUser = (id, userData) =>
  axios.patch(`${API_URL}${id}`, userData, config);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`, config);
