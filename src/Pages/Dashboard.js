import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./Dashboard.css";
import LandingPage from "../Authentication/LandingPage";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const role = parseInt(localStorage.getItem("role"));

  const handleMenuClick = (event) => {
    navigate(event.key);
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  const getMenuItems = () => {
    const agentMenu = {
      key: "agent",
      icon: <UserOutlined />,
      label: "Agent",
      children: [
        {
          key: "/dashboard/searchpage",
          label: "Home",
        },
        {
          key: "/dashboard/appointments",
          label: "Appointments",
        },
        {
          key: "/dashboard/myproperties",
          label: "My Properties",
        },
      ],
    };

    const buyerMenu = {
      key: "buyer",
      icon: <UserOutlined />,
      label: "Buyer",
      children: [
        {
          key: "/dashboard/searchpage",
          label: "Home",
        },
        {
          key: "/dashboard/financialAssistance",
          label: "Financial Assistance",
        },
        {
          key: "/dashboard/wishlist",
          label: "Wishlist",
        },
      ],
    };

    const sellerMenu = {
      key: "seller",
      icon: <UserOutlined />,
      label: "Seller",
      children: [
        {
          key: "seller/property-type",
          label: "Property Details",
          children: [
            { key: "/dashboard/agricultural", label: "Agriculture" },
            { key: "/dashboard/commercial", label: "Commercial" },
            { key: "/dashboard/residential", label: "Residential" },
          ],
        },
        { key: "/dashboard/buyer-requests", label: "Buyer Requests" },
        { key: "/dashboard/seller-requests", label: "Seller Requests" },
      ],
    };

    switch (role) {
      case 1:
        return [agentMenu];
      case 2:
        return [sellerMenu];
      case 3:
        return [buyerMenu];
      default:
        return <LandingPage />;
    }
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
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://res.cloudinary.com/ddv2y93jq/image/upload/v1725454346/gdhbrxyo73qtplabm0lg.png"
            alt="logo"
            style={{
              width: collapsed ? "34px" : "182px",
              height: collapsed ? "30px" : "75px",
            }}
          />
        </div>

        <Menu
          onClick={handleMenuClick}
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#01233a",
            borderRadius: "5px",
           
            position: "fixed", 
            top: 0, 
            width: `calc(100% - ${collapsed ? 80 : 200}px)`, 
            zIndex: 1000,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64, color: "white" }}
          />
          <Dropdown
            menu={{
              items: [
                {
                  key: "profile",
                  label: "Profile",
                  onClick: handleProfileClick,
                },
                {
                  key: "logout",
                  label: "Logout",
                  onClick: handleLogout,
                },
              ],
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <p style={{ color: "white", marginTop: "10px" }}>
                  {role == 1 ? "Agent" : role == 2 ? "Seller" : "Buyer"}
                </p>
                <UserOutlined
                  style={{
                    fontSize: "20px",
                    marginRight: "40px",
                    color: "white",
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          className="content"
          style={{
            padding: "10px",
            background: colorBgContainer,
            marginTop:"5%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
