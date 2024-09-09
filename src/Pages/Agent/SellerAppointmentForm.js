import React from "react";
import {
  Form,
  DatePicker,
  TimePicker,
  Input,
  Button,
  Typography,
  message,
} from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are imported
import axios from "axios";

const { Title } = Typography;

const SellerAppointmentForm = ({ seller, onClose }) => {
  const handleFormSubmit = (values) => {
    // Log the raw values before formatting
    console.log("Raw Form Values:", values);

    // Format date and time before sending to backend
    const formattedDate = values.bookingDate
      ? values.bookingDate.format("YYYY-MM-DD")
      : null;
    const formattedTime = values.bookingTime
      ? values.bookingTime.format("HH:mm:ss")
      : null;
    console.log(seller?.userId);
    const requestBody = {
      userId: seller?.userId,
      date: formattedDate,
      timing: formattedTime,
      location: values.location,
    };
 const token=`token${localStorage.getItem("role")}`;
    axios
      .post("http://172.17.15.53:3000/booking/agentbook", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle success
        message.success("Appointment booked successfully!");
        if (onClose) onClose(); // Close the modal after booking
      })
      .catch((error) => {
        // Handle error
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
          location: seller?.location || "",
        }}
      >
        <Title level={3}>seller Appointment</Title>
        <Form.Item
          label="Date"
          name="bookingDate"
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Time"
          name="bookingTime"
          rules={[{ required: true, message: "Please select the time!" }]}
        >
          <TimePicker
            style={{ width: "100%" }}
            format="h:mm a" // Change the format to 12-hour with AM/PM
          />
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

export default SellerAppointmentForm;
