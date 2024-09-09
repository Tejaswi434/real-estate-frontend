// BuyerAppointmentForm.js
import React, { useContext, useState } from "react";
import {
  Form,
  DatePicker,
  TimePicker,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;

const BuyerAppointmentForm = ({ buyer, onSubmit, onClose }) => {
  const [token, setToken] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  // const [form] = Form.useForm();
  const disablePastDates = (current) => {
    // Can not select days before today
    return current && current < moment().startOf("day");
  };

  const handleFormSubmit = (values) => {
    const formattedDate = values.bookingDate
      ? values.bookingDate.format("YYYY-MM-DD")
      : null;
    const formattedTime = values.bookingTime
      ? values.bookingTime.format("HH:mm:ss")
      : null;

    // Update context with new appointment dat

    const requestBody = {
      userId: buyer?.userId,
      date: formattedDate,
      timing: formattedTime,
      location: values.location,
    };

    // Send POST request
    axios
      .post("http://172.17.15.53:3000/booking/agentbook", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onSubmit(requestBody); // Call onSubmit passed as a prop
          message.success("Appointment booked successfully!");
          // form.resetFields();
          onClose(); // Close the modal
        }
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        message.error("Failed to book the appointment. Please try again.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form
        layout="vertical"
        onFinish={handleFormSubmit}
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "20px auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: 20,
          borderRadius: 8,
        }}
        initialValues={{
          location: buyer?.location || "",
        }}
      >
        <Title level={3}>Buyer Appointment</Title>
        <Form.Item
          label="Date"
          name="bookingDate"
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={disablePastDates} // Disable past dates
          />
        </Form.Item>

        <Form.Item
          label="Time"
          name="bookingTime"
          rules={[{ required: true, message: "Please select the time!" }]}
        >
          <TimePicker style={{ width: "100%" }} format="h:mm a" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter the location!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Book Appointment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BuyerAppointmentForm;
