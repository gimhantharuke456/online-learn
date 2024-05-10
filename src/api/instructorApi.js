import axios from "axios";

const API_URL = "http://localhost:4005/api/instructors/";

export const fetchAllInstructors = () => {
  return axios.get(API_URL);
};

export const createInstructor = (instructorData) => {
  return axios.post(`${API_URL}/register`, instructorData);
};

export const updateInstructor = (id, instructorData) => {
  return axios.patch(`${API_URL}${id}`, instructorData);
};

export const deleteInstructor = (id) => {
  return axios.delete(`${API_URL}${id}`);
};
