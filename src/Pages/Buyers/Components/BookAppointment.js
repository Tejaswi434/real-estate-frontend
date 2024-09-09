// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button, Input, DatePicker, TimePicker, Form, message } from 'antd';
// import axios from 'axios'; // Import axios

// // const BookAppointment = () => {
// //   const { id } = useParams(); // Get property id from URL
// //   const [form] = Form.useForm(); // Ant Design form instance

// const BookAppointment = ({ agentId }) => { // Accept agentId as a prop
//   const [form] = Form.useForm(); // Ant Design form instance

//   // State to manage form fields
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     date: null,
//     time: null,
//   });

//   // Example token (replace with actual token retrieval logic)
//   const token = 'your-jwt-token'; // Make sure to replace this with the actual token

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle date change
//   const handleDateChange = (date, dateString) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       date: dateString,
//     }));
//   };

//   // Handle time change
//   const handleTimeChange = (time, timeString) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       time: timeString,
//     }));
//   };

//   // Handle form submission with axios POST request
//   const handleConfirmBooking = async () => {
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.date ||
//       !formData.time
//     ) {
//       message.error('Please fill in all fields.');
//       return;
//     }

//     try {
//       // Replace 'https://your-backend-api.com/appointments' with your API endpoint
//       await axios.post(
//         'http://172.17.15.213:3002/booking/book/:id',
//         {
//           // agentId: id,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.userEmail,
//           phone: formData.phone,
//           date: formData.date,
//           time: formData.timing,
//         },
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZjcwYmI0ZjU5MjY2YmQwMzY3OTFmIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MCIsInJvbGUiOjF9LCJpYXQiOjE3MjUwMTI4MzUsImV4cCI6MTcyNTAxNjQzNX0.tN-94M6itkEsUppRW7qJxbA8tSi9F3ieSraqJST2JEY ${token}`, // Include the token in the Authorization header
//           },
//         }
//       );

//       message.success(`Appointment booked successfully for agent ID: ${agentId}`);
//       form.resetFields(); // Reset form fields after successful submission
//       setFormData({
//         firstName: '',
//         lastName: '',
//         useremail: '',
//         phone: '',
//         date: null,
//         timing: null,
//       });
//     } catch (error) {
//       message.error('Error booking appointment. Please try again.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {/* <h2>Book an Appointment for Property ID: {id}</h2> */}
//       <Form form={form} layout="vertical" style={{ maxWidth: '400px', margin: '0 auto' }}>
//         <Form.Item label=" Name" required>
//           <Input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             placeholder="Enter your first name"
//           />
//         </Form.Item>
//         <Form.Item label="Phone" required>
//           <Input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             placeholder="Enter your phone number"
//           />
//         </Form.Item>
//         <Form.Item label="Date" required>
//           <DatePicker
//             style={{ width: '100%' }}
//             onChange={handleDateChange}
//           />
//         </Form.Item>
//         <Form.Item label="Time" required>
//           <TimePicker
//             style={{ width: '100%' }}
//             onChange={handleTimeChange}
//             format="HH:mm"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" onClick={handleConfirmBooking}>
//             Confirm Booking
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default BookAppointment;

import React, { useState } from "react";
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

const { Title } = Typography;

const Bookappointment = ({ buyer, onSubmit, onClose }) => {
   const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  // Ensure onSubmit is a function
  if (typeof onSubmit !== "function") {
    console.error("onSubmit is not a function");
    return null;
  }

  const handleFormSubmit = (values) => {
    const formattedDate = values.bookingDate
      ? values.bookingDate.format("YYYY-MM-DD")
      : null;
    const formattedTime = values.bookingTime
      ? values.bookingTime.format("HH:mm:ss")
      : null;

    const requestBody = {
      agentId: "66cf70bb4f59266bd036791f",
      date: formattedDate,
      timing: formattedTime,
      location: values.location,
    };
    console.log(requestBody);
    // (`token${localStorage.getItem.role}`)
    console.log("token from book appoint",tokenData);
    // Send POST request
    axios
      .post("http://172.17.15.53:3000/booking/userbook", requestBody, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onSubmit(requestBody); // Call onSubmit passed as a prop
          message.success("Appointment booked successfully!");
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
          <DatePicker style={{ width: "100%" }} />
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

export default Bookappointment;
