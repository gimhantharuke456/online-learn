import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import {
  fetchAllInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../api/instructorApi";
import { render } from "@testing-library/react";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [form] = Form.useForm(); // Create form instance using Form.useForm()

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      const response = await fetchAllInstructors();
      setInstructors(response.data);
    } catch (error) {
      message.error("Error fetching instructors");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (currentInstructor) {
        await updateInstructor(currentInstructor._id, values);
      } else {
        await createInstructor({
          ...values,
          password: "instructor123",
        });
      }
      setIsModalVisible(false);
      setCurrentInstructor(null);
      await loadInstructors();
    } catch (error) {
      message.error("Error saving instructor details");
    }
  };

  const handleEdit = (instructor) => {
    setCurrentInstructor(instructor);
    form.setFieldsValue(instructor); // Set form fields to current instructor values
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInstructor(id);
      loadInstructors();
    } catch (error) {
      message.error("Error deleting instructor");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (profileImage) => (
        <img
          src={profileImage}
          alt="Profile Image"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this instructor?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setCurrentInstructor(null); // Clear current instructor
          form.resetFields(); // Reset form fields
          setIsModalVisible(true);
        }}
      >
        Add Instructor
      </Button>
      <Table dataSource={instructors} columns={columns} rowKey="_id" />
      <Modal
        title={currentInstructor ? "Edit Instructor" : "Add Instructor"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            name: "",
            email: "",
            contactNumber: "",
            profileImage: "",
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="uniqueCode"
            label="Unique Code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profileImage"
            label="Profile Image URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Instructors;
