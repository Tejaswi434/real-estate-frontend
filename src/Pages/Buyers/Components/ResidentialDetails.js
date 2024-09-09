import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Carousel, Card, Tag } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  ApartmentOutlined,
  DollarOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

export default function ResidentialDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = `token${localStorage.getItem("role")}`; // Replace with your actual token

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://172.17.15.53:3000/property/getpropbyid/Residential/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>{product.propertyTitle}</Title>
      <Carousel autoplay>
        {product.propPhotos.map((photo, index) => (
          <div key={index}>
            <img
              alt={`Property Photo ${index + 1}`}
              src={photo}
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card
            title="Owner Details"
            bordered={false}
            style={{ marginBottom: 20 }}
          >
            <p>
              <MailOutlined /> <strong>Email:</strong>{" "}
              {product.owner?.ownerEmail || "Not Entered"}
            </p>
            <p>
              <PhoneOutlined /> <strong>Contact:</strong>{" "}
              {product.owner?.contact || "Not Entered"}
            </p>
            <p>
              <TeamOutlined /> <strong>Name:</strong>{" "}
              {product.owner?.ownerName || "Not Entered"}
            </p>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Property Details"
            bordered={false}
            style={{ marginBottom: 20 }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <ApartmentOutlined /> <strong>Apartment Name:</strong>{" "}
                  {product.propertyDetails.apartmentName}
                </p>
                <p>
                  <HomeOutlined /> <strong>Flat Number:</strong>{" "}
                  {product.propertyDetails.flatNumber}
                </p>
                <p>
                  <DollarOutlined /> <strong>Price:</strong> $
                  {product.propertyDetails.totalCost}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <BranchesOutlined /> <strong>Apartment Layout:</strong>{" "}
                  {product.propertyDetails.apartmentLayout}
                </p>
                <p>
                  <HomeOutlined /> <strong>Flat Size:</strong>{" "}
                  {product.propertyDetails.flatSize}
                </p>
                <p>
                  <HomeOutlined /> <strong>Flat Facing:</strong>{" "}
                  {product.propertyDetails.flatFacing}
                </p>
                <p>
                  <Tag
                    color={product.propertyDetails.furnitured ? "green" : "red"}
                  >
                    {product.propertyDetails.furnitured
                      ? "Furnished"
                      : "Not Furnished"}
                  </Tag>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Amenities" bordered={false} style={{ marginBottom: 20 }}>
            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <SafetyCertificateOutlined /> <strong>Water Facility:</strong>{" "}
                  {product.amenities?.waterFacility
                    ? "Available"
                    : "Not Available"}
                </p>
                <p>
                  <SafetyCertificateOutlined />{" "}
                  <strong>Electricity Facility:</strong>{" "}
                  {product.amenities?.electricityFacility
                    ? "Available"
                    : "Not Available"}
                </p>
                <p>
                  <SafetyCertificateOutlined /> <strong>Elevator:</strong>{" "}
                  {product.amenities?.elevator ? "Available" : "Not Available"}
                </p>
                <p>
                  <SafetyCertificateOutlined /> <strong>Watchman:</strong>{" "}
                  {product.amenities?.watchman ? "Available" : "Not Available"}
                </p>
                <p>
                  <EnvironmentOutlined />{" "}
                  <strong>Grocery Stores Nearby:</strong>{" "}
                  {product.amenities?.grocery || "Not Given"} Km
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <SafetyCertificateOutlined /> <strong>CCTV:</strong>{" "}
                  {product.amenities?.cctv ? "Available" : "Not Available"}
                </p>
                <p>
                  <SafetyCertificateOutlined /> <strong>Gym Facility:</strong>{" "}
                  {product.amenities?.gymFacility
                    ? "Available"
                    : "Not Available"}
                </p>
                <p>
                  <EnvironmentOutlined />{" "}
                  <strong>Medical Facilities Nearby:</strong>{" "}
                  {product.amenities?.medical || "Not Given"}
                </p>
                <p>
                  <EnvironmentOutlined />{" "}
                  <strong>Religious Places Nearby:</strong>{" "}
                  {product.amenities?.religious || "Not Given"}
                </p>
                <p>
                  <EnvironmentOutlined />{" "}
                  <strong>Educational Institutes Nearby:</strong>{" "}
                  {product.amenities?.educational || "Not Given"} Km
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Address" bordered={false} style={{ marginBottom: 20 }}>
            <p>
              <HomeOutlined /> <strong>Country:</strong>{" "}
              {product.address?.country}
            </p>
            <p>
              <HomeOutlined /> <strong>State:</strong> {product.address?.state}
            </p>
            <p>
              <HomeOutlined /> <strong>District:</strong>{" "}
              {product.address?.district}
            </p>
            <p>
              <HomeOutlined /> <strong>Mandal:</strong>{" "}
              {product.address?.mandal}
            </p>
            <p>
              <HomeOutlined /> <strong>Village:</strong>{" "}
              {product.address?.village}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
