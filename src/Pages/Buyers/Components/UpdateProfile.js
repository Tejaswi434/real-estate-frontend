import React, { useState, useEffect } from "react";
import { Form, Input, Button, Avatar, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/profile"
        );
        setProfile(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error("Error fetching profile data");
      }
    };

    fetchProfile();
  }, [form]);

  const handleUpdateProfile = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("oldPassword", values.oldPassword);
      formData.append("newPassword", values.newPassword);
      formData.append("confirmPassword", values.confirmPassword);
      if (image) {
        formData.append("profileImage", image);
      }

      await axios.put("https://your-backend-api.com/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Error updating profile");
    }
  };

  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
      setImage(file.originFileObj);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateProfile}
        initialValues={profile}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Form.Item label="Profile Picture">
          <Avatar
            size={64}
            src={profile.profileImageUrl}
            icon={<UploadOutlined />}
            style={{ marginBottom: "20px" }}
          />
          <Upload
            customRequest={handleImageChange}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            { required: true, message: "Please enter your old password" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            { required: true, message: "Please confirm your new password" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProfile;
