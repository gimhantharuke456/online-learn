import React, { useState, useEffect } from "react";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../api/courseApi"; // Adjust the import path
import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const response = await fetchCourses();
    setCourses(response.data);
  };

  const showModal = (course = null) => {
    setCurrentCourse(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentCourse(null);
  };

  const onFinish = async (values) => {
    if (currentCourse) {
      await updateCourse(currentCourse._id, values);
    } else {
      await createCourse(values);
    }
    handleCancel();
    loadCourses();
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Enrollment Key",
      dataIndex: "enrollmentKey",
      key: "enrollmentKey",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} type="primary">
            Edit
          </Button>
          <Popconfirm
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            title="Are you sure you want to delete this course?"
          >
            <Button danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Course
      </Button>
      <Table dataSource={courses} columns={columns} rowKey="_id" />
      <Modal
        title={currentCourse ? "Edit Course" : "Add Course"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} initialValues={currentCourse}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the course name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the course description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="enrollmentKey"
            label="Enrollment Key"
            rules={[
              {
                required: true,
                message: "Please input the course enrollment key!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentCourse ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Courses;
