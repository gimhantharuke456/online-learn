import axios from "axios";

const ENROLLMENT_URL = "http://localhost:4005/api/enrollments/";

export const enrollStudentInCourse = (studentId, courseId) => {
  return axios.post(ENROLLMENT_URL, { studentId, courseId });
};
// Assuming the API is set up at /api/enrollments/student/:studentId
export const fetchEnrolledCourses = (studentId) => {
  return axios.get(`http://localhost:4005/api/enrollments/`);
};
