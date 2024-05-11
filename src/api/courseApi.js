import axios from "axios";

const API_URL = "http://localhost:4005/api/courses/";
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export const fetchCourses = () => {
  return axios.get(API_URL, config);
};

export const createCourse = (courseData) => {
  return axios.post(API_URL, courseData, config);
};

export const updateCourse = (id, courseData) => {
  return axios.put(`${API_URL}${id}`, courseData, config);
};

export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}${id}`, config);
};
