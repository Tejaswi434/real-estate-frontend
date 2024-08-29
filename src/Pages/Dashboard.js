import React, { useState } from "react";
import logo from "../images/logo.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { items } from "./Data";
import "./Dashboard.css";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (event) => {
    console.log(event.key, "25");

    navigate(event.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100%", position: "fixed", left: 0 }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            padding: "8px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: collapsed ? "32px" : "182px",
              height: collapsed ? "32px" : "75px",
              marginBottom: "8px",
            }}
          />
          {!collapsed && (
            <div
              style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            ></div>
          )}
        </div>
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/agricultural",
              icon: <UserOutlined />,
              label: "Agriculture",
            },
            {
              key: "/commericial",
              icon: <UserOutlined />,
              label: "Commericial",
            },
            {
              key: "/layout",
              icon: <UserOutlined />,
              label: "Layout",
            },
            {
              key: "/dashboard/residental",
              icon: <UserOutlined />,
              label: "Residential",
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#01233a",
            borderRadius: "5px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />

          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined class="Useroutlined" size={80} />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content class="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
