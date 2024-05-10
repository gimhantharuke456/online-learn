import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
  Spin,
} from "antd";
import {
  fetchContents,
  createContent,
  updateContent,
  deleteContent,
} from "../api/contentApi";

const { Option } = Select;

const Contents = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    setLoading(true);
    try {
      const response = await fetchContents();
      setContents(response.data);
    } catch (error) {
      message.error("Error fetching contents");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (currentContent) {
        await updateContent(currentContent._id, values);
      } else {
        await createContent(values);
      }
      setIsModalVisible(false);
      setCurrentContent(null);
      await loadContents();
    } catch (error) {
      message.error("Error saving the content");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content) => {
    setCurrentContent(content);
    form.setFieldsValue(content);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteContent(id);
      loadContents();
    } catch (error) {
      message.error("Error deleting the content");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Type", dataIndex: "contentType", key: "contentType" },
    { title: "URL", dataIndex: "contentUrl", key: "contentUrl" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this content?"
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
          setCurrentContent(null);
          form.resetFields();
        }}
      >
        Add Content
      </Button>
      <Spin spinning={loading}>
        <Table dataSource={contents} columns={columns} rowKey="_id" />
      </Spin>
      <Modal
        title={currentContent ? "Edit Content" : "Add Content"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            title: "",
            description: "",
            contentType: "",
            contentUrl: "",
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contentType"
            label="Content Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="LectureNote">Lecture Note</Option>
              <Option value="Notice">Notice</Option>
              <Option value="Material">Material</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="contentUrl"
            label="Content URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Contents;
