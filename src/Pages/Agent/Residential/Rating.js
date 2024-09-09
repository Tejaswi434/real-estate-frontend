import React, { useState } from "react";
import { Rate, Button, Form, Input } from "antd";
import axios from "axios";
import { notification } from "antd";

const Rating = ({ propertyId, showRatingModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem(`token${localStorage.getItem("role")}`);

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
  };
  //  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2ZDg5MGIyOTg4YTQ5MTJmNTk1NzI2YSIsImVtYWlsIjoic3Jpbml2YXNjaGFsYW1hbGFzZXR0aTIwQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6InNyaW5pdmFzIiwibGFzdE5hbWUiOiJjaGFsYW1hbGFzZXR0aSIsInBob25lTnVtYmVyIjoiMTIzMzQ0NTU2NSIsInJvbGUiOjJ9LCJpYXQiOjE3MjU0NzE4MjEsImV4cCI6MTcyNTQ4OTgyMX0.FY8WDA25QtltDkcmNX7MQUGhLAStjhdOlrqeJD3m09A"

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://172.17.15.53:3000/property/insertproprating",
        {
          propertyId,
          rating,
          review: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      openNotification(
        "success",
        "Form submitted",
        "Rating Submitted successfully!"
      );
      showRatingModal();
    } catch (error) {
      openNotification(
        "error",
        "Submission failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Rate the Property" required>
        <Rate value={rating} onChange={setRating} />
      </Form.Item>
      <Form.Item label="Comments">
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comments"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Rating;
