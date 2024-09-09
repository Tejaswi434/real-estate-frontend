
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";

const { Title, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true to trigger the animation
    setLoaded(true);
  }, []);

  const onFinish = (values) => {
    console.log("Received values from form: ", values);

    axios
      .post("http://172.17.15.53:3000/login", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login error: ", error);
        // You may want to add an error message for the user here
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your background image URL
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly more opaque background for better readability
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          opacity: loaded ? 1 : 0, // Opacity transition for fade-in effect
          transform: loaded ? "translateY(0)" : "translateY(20px)", // Slide-up effect
          transition: "opacity 0.5s ease, transform 0.5s ease", // Smooth transition effect
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              style={{
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 5px rgba(24, 144, 255, 0.5)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              style={{
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 5px rgba(24, 144, 255, 0.5)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Link
              href="#"
              style={{ float: "right", color: "#1890ff" }} // Ant Design primary color
            >
              Forgot password?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
                fontWeight: "bold",
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;