import axios from "axios";

const API_URL = "http://localhost:4005/api/students/";

export const fetchStudents = () => {
  return axios.get(API_URL);
};

export const createStudent = (studentData) => {
  return axios.post(API_URL, studentData);
};

export const updateStudent = (id, studentData) => {
  return axios.put(`${API_URL}${id}`, studentData);
};

export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}${id}`);
};
export const loginStudent = (email, password) => {
  return axios.post(`${API_URL}login`, { email, password });
};
