import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { items } from "./Data";
import "./Design.css";
import {
  HomeOutlined,
  DollarCircleOutlined,
  HeartOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Design = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const savedCollapsedState = localStorage.getItem("sidebar-collapsed");
    if (savedCollapsedState) {
      setCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const handleMenuClick = (event) => {
    navigate(event.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 999,
          width: collapsed ? 80 : 200,
        }}
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
            height: "60px",
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
              key: "/home",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "/financial-assistant",
              icon: <DollarCircleOutlined />,
              label: "Financial Assistant",
            },
            {
              key: "/wishlist",
              icon: <HeartOutlined />,
              label: "Wishlist",
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "/update-profile",
              icon: <EditOutlined />, // New icon for update profile
              label: "Update Profile",
            },
          ]}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, marginTop: "60px" }}>
        <Header
          style={{
            padding: 0,
            backgroundColor: "#01233a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "5px",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            width: "100%",
            height: "60px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                <UserOutlined className="Useroutlined" size={80} />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Design;
