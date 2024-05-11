import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { loginStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await loginStudent(values.email, values.password);
      message.success("Login successful!");
      console.log("Logged in user:", response.data);
      localStorage.setItem("studentToken", response.data.token);
      localStorage.setItem("studentId", response.data.student._id);
      navigate("/student-dashboard");
    } catch (error) {
      message.error(
        "Failed to log in: " + (error.response?.data?.error || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please check the form for errors.");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Student Login" style={{ width: 300 }}>
        <Form
          name="student_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StudentLogin;
