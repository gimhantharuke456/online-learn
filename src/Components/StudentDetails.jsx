import { Tag, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

const StudentDetails = ({ id }) => {
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4005/api/students/${id}`
      );
      setStudent(response.data);
    } catch (error) {
      message.error("Error fetching student");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{student?.studentName}</p>
      <p>{student?.email}</p>
      <Tag style={{ width: 100 }}>{student?.itNumber}</Tag>
    </div>
  );
};

export default StudentDetails;
