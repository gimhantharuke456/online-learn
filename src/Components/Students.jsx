import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Spin,
} from "antd";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await fetchStudents();
      setStudents(response.data);
    } catch (error) {
      message.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (currentStudent) {
        await updateStudent(currentStudent._id, values);
      } else {
        await createStudent({ ...values, password: "student" });
      }
      setIsModalVisible(false);
      setCurrentStudent(null);
      await loadStudents();
    } catch (error) {
      message.error("Error saving the student");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      message.error("Error deleting the student");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Student Name", dataIndex: "studentName", key: "studentName" },
    { title: "IT Number", dataIndex: "itNumber", key: "itNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "NIC Number", dataIndex: "nicNumber", key: "nicNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this student?"
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
          setIsModalVisible(true);
          setCurrentStudent(null);
          form.resetFields();
        }}
      >
        Add Student
      </Button>
      <Spin spinning={loading}>
        <Table dataSource={students} columns={columns} rowKey="_id" />
      </Spin>
      <Modal
        title={currentStudent ? "Edit Student" : "Add Student"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            studentName: "",
            itNumber: "",
            email: "",
            nicNumber: "",
            address: "",
            contactNumber: "",
          }}
        >
          <Form.Item
            name="studentName"
            label="Student Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="itNumber"
            label="IT Number"
            rules={[{ required: true }]}
          >
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
            name="nicNumber"
            label="NIC Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, pattern: new RegExp(/\d{10}/) }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
