import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../utils";
import Users from "../Components/Users";
import Instructors from "../Components/Instructors";
import Students from "../Components/Students";
import Contents from "../Components/Contents";
import Courses from "../Components/Courses";
import Payments from "../Components/Payments";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const snap = useSnapshot(state);
  const handleClick = (index) => {
    state.activeIndex = index;
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            onClick={() => {
              handleClick(2);
            }}
            key="2"
            icon={<TeamOutlined />}
          >
            Instructors
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleClick(3);
            }}
            key="3"
            icon={<BookOutlined />}
          >
            Students
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleClick(4);
            }}
            key="4"
            icon={<FileTextOutlined />}
          >
            Content
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleClick(5);
            }}
            key="5"
            icon={<FileTextOutlined />}
          >
            Courses
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleClick(6);
            }}
            key="6"
            icon={<UserOutlined />}
          >
            Payments
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {snap.activeIndex === 2 && <Instructors />}
            {snap.activeIndex === 3 && <Students />}
            {snap.activeIndex === 4 && <Contents />}
            {snap.activeIndex === 5 && <Courses />}
            {snap.activeIndex === 6 && <Payments />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
