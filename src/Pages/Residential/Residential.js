import React from "react";
import { Form, Button } from "antd";
import "./Residential.css";
import OwnerDetails from "./OwnerDetails";
import FlatDetails from "./FlatDetails";
import Amenities from "./Amenities";
import axios from "axios";

export default function Residential() {
  const onFinish = async (values) => {
    let object = {
      propertyType: values.propertyType,
      owner: {
        ownerName: values.ownerName,
        ownerEmail: values.ownerEmail,
        contact: values.contact,
      },
      propertyDetails: [
        {
          apartmentName: values.apartmentName,
          flatNumber: values.apartmentNumber,
          apartmentLayout: values.apartmentLayout,
          flatSize: values.flatSize,
          flatCost: values.flatCost,
          totalCost: values.totalCost,
          flatFacing: values.flatFacing,
          furnitured: values.furnitured,
        },
      ],
      amenities: [
        {
          powerSupply: values.powerSupply,
          waterFacility: values.waterFacility,
          electricityFacility: values.electricityFacility,
          elevator: values.elevator,
          watchman: values.watchman,
          cctv: values.cctv,
          medical: values.medical,
          religious: values.religious,
          educational: values.educational,
          grocery: values.grocery,
          gymFacility: values.gymFacility,
        },
      ],
      propPhotos: [
        "https://example.com/photos/green_meadows_202.jpg",
        "https://example.com/photos/amenities1.jpg",
        "https://example.com/photos/amenities2.jpg",
      ],
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjZjcwYmI0ZjU5MjY2YmQwMzY3OTFmIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5MCIsInJvbGUiOjF9LCJpYXQiOjE3MjQ5NDkzMzQsImV4cCI6MTcyNDk1MjkzNH0.osfU29TzDCIXQK3ynwgC0zM8yPUnfJIPJ492RZ7XMZk";

    try {
      const response = await axios.post(
        "http://172.17.15.213:3002/residential/add",
        object,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Property added successfully:", response.data);
    } catch (error) {
      console.error(
        "Error adding property:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="residential-form-container">
      <h2 style={{ textAlign: "center" }}>Residential Form</h2>
      <Form layout="vertical" onFinish={onFinish} className="residential-form">
        <div className="form-cards">
          <OwnerDetails />
          <FlatDetails />
          <Amenities />
        </div>
        <Form.Item className="form-item-submit">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
