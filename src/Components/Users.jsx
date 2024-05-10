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
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/userApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading users
  const [submitting, setSubmitting] = useState(false); // Form submission
  const [deleting, setDeleting] = useState(false); // Deleting user

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      message.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editingUser) {
        await updateUser(editingUser._id, values);
      } else {
        await createUser(values);
      }
      setIsModalVisible(false);
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      message.error("Error saving user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      message.error("Error deleting user");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <React.Fragment>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              loading={
                deleting && editingUser && editingUser._id === record._id
              }
            >
              Delete
            </Button>
          </Popconfirm>
        </React.Fragment>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Admin
      </Button>
      <Spin spinning={loading}>
        <Table dataSource={users} columns={columns} rowKey="_id" />
      </Spin>
      <Modal
        title={editingUser ? "Edit Admin" : "Add Admin"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Spin spinning={submitting}>
          <Form
            initialValues={
              editingUser || {
                firstName: "",
                lastName: "",
                address: "",
                email: "",
                password: "",
              }
            }
            onFinish={handleSubmit}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
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
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password disabled={editingUser} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Users;
