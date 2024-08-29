import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values from form: ", values);

    console.log(values, "10");

    axios
      .post("http://172.17.15.53:3000/login", values)
      .then((res) => {
        // messageApi.open({
        //   type: "success",
        //   content: "Login successful!",
        //   duration: 3,
        // });
        localStorage.setItem("token", res.data.token);
        console.log("hi");
        console.log(res);
        const role = res.data.role;

        navigate("/dashboard");
        // localStorage.setItem("token", res.data.token);
        //onClose();
        // if (role == 'Seller') {
        //   navigate('/seller')
        // }
        // else if (role == 'Buyer') {
        //   navigate('/buyer')
        // }
        // else if (role == 'Agent') {
        //   navigate('/agent')
        // }
      })
      .catch((error) => {
        //     messageApi.open({
        //       type: "error",
        //       content: "Login Failed!",
        //       duration: 3,
        //     });
      });
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto" }}>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a style={{ float: "right" }} href="">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
