import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

function HeaderPage({ setIsLoginVisible }) {
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 1000,
          height: "64px",
          boxSizing: "border-box",
          overflow: "hidden",
          backgroundColor: "#0d416b",
        }}
      >
        <div className="heading">Real Estate Lokam</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: "0",
              label: (
                <span
                  style={{ color: "white" }}
                  onClick={() => {
                    setIsLoginVisible(true);
                  }}
                >
                  Sign In
                </span>
              ),
            },
          ]}
          style={{
            fontSize: "20px",
            flex: 1,
            justifyContent: "flex-end",
            border: "none",
            color: "#fff",
            backgroundColor: "#0d416b",
          }}
        />
      </Header>
    </div>
  );
}

export default HeaderPage;
