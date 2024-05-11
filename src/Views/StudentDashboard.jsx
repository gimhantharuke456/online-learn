import React, { useEffect, useState } from "react";
import { Card, Input, Button, Form, message, Select, Row, Col } from "antd";
import {
  enrollStudentInCourse,
  fetchEnrolledCourses,
} from "../api/enrollmentApi";

import { fetchCourses } from "../api/courseApi";
import { loadStripe } from "@stripe/stripe-js";
const STRIPE_PUBLIC_KEY =
  "pk_test_51PFCPmRwBaJjxNyjVJ9jS4AvCKpbaGbeQqWQYccjp9X6Rr1ayQSsN8RbnLhaev4ct23Ub4Mjccx7AmB3PIW9okDz00zhoVFzU1";
const STRIPE_SECRET_KEY =
  "sk_test_51PFCPmRwBaJjxNyjpm01tB2OVdoFi3vjgKTyjpR3HmJVzUqXyVKUfDXmbqOjKZKA510tGUnpRLj1M9FBGJCNOi1X00ME8rzz9Z";
const StudentDashboard = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = async (values) => {
    try {
      const studentId = localStorage.getItem("studentId");
      const { courseId } = values;
      await enrollStudentInCourse(studentId, courseId);
      message.success("Enrolled successfully!");
      form.resetFields(); // Reset form after successful submission
      fetchEnrolledCourses(studentId).then((res) =>
        setEnrolledCourses(res.data)
      ); // Refresh the list of enrolled courses
    } catch (error) {
      message.error("Failed to enroll: " + "Invalid enrollment key");
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      fetchCourses().then((res) => setCourses(res.data));
      fetchEnrolledCourses(studentId).then((res) =>
        setEnrolledCourses(res.data)
      );
    }
  }, []);

  const makePayment = async (values) => {
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    const body = {
      ...values,
      paidBy: localStorage.getItem("studentId"),
    };
    const header = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://localhost:4005/api/payments/", {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    console.log(session);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Main content area showing enrolled courses */}
      <div style={{ flex: 3, padding: "20px", overflowY: "auto" }}>
        <h1>Welcome to Your Dashboard</h1>
        <Row gutter={16}>
          {enrolledCourses.map((course) => {
            const cd = courses.find((c) => c._id === course.courseId);

            return (
              <Col key={course._id} xs={24} sm={12} lg={8}>
                <Card title={cd?.name} bordered>
                  <p>{`Enrolled on: ${new Date(
                    course.enrolledDate
                  ).toLocaleDateString()}`}</p>
                  <p> {cd.description}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Sidebar for enrolling in a course */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Card
          title="Enroll in a Course"
          bordered={false}
          style={{ width: "100%" }}
        >
          <Form form={form} onFinish={handleEnroll}>
            <Form.Item
              name="courseId"
              rules={[{ required: true, message: "Please select a course!" }]}
            >
              <Select placeholder="Select a course">
                {courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {`${course.name} (Key: ${course.enrollmentKey})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Enroll
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div style={{ height: 16 }} />
        <Card title="Make a payment" bordered={false} style={{ width: "100%" }}>
          <Form form={form2} onFinish={makePayment}>
            <Form.Item
              name="reason"
              rules={[{ required: true, message: "Please enter reason" }]}
            >
              <Input type="text" placeholder="Reason" />
            </Form.Item>
            <Form.Item
              name="paidAmount"
              rules={[{ required: true, message: "Please enter paid amount" }]}
            >
              <Input type="number" placeholder="Paid Amount" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Pay
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
