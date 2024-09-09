import React, { useState } from "react";
import { Rate, Button, Form, Input } from "antd";
import axios from "axios";

const Rating = ({ propertyId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem(`token${localStorage.getItem("role")}`);

  const handleSubmit = async () => {
    setLoading(true);
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
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    }
    setLoading(false);
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Rating;
