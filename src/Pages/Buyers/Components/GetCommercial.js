


import { Button, Card, Col, Divider, Modal, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./Arrow.css";
import {
 UserOutlined,
 PhoneOutlined,
 MailOutlined,
 StarFilled,
} from "@ant-design/icons";
import Rating from "./Rating";

const GetCommercial = () => {
 const [data, setData] = useState([]);
 const [selectedProperty, setSelectedProperty] = useState(null);
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [isRatingVisible, setIsRatingVisible] = useState(false);
 const [tokenData, setTokenData] = useState(localStorage.getItem(`token${localStorage.getItem("role")}`));
 useEffect(() => {
 const getDetails = async () => {
 try {
 const response = await axios.get(
 "http://172.17.15.53:3000/commercials/getcommercial",
 {
 headers: {
 Authorization: `Bearer ${tokenData}`,
 },
 }
 );
 console.log("List of properties", response.data);
 setData(response.data);
 } catch (error) {
 console.error(
 "Error displaying properties:",
 error.response ? error.response.data : error.message
 );
 }
 };
 getDetails();
 }, []);

 const handleCardClick = (property) => {
 setSelectedProperty(property);
 setIsModalVisible(true);
 };

 const handleModalClose = () => {
 setIsModalVisible(false);
 setSelectedProperty(null);
 };

 const showRatingModal = () => {
 setIsRatingVisible(!isRatingVisible);
 };

 return (
 <div>
 <Row gutter={16} style={{ padding: "20px" }}>
 {data.map((property) => (
 <Col span={8} key={property._id} style={{ marginBottom: "16px" }}>
 {isRatingVisible && (
 <Modal
 title="Rate the Property"
 visible={isRatingVisible}
 onOk={() => setIsRatingVisible(false)}
 onCancel={() => setIsRatingVisible(false)}
 footer={null}
 >
 <Rating
 propertyId={property._id}
 showRatingModal={showRatingModal}
 />
 </Modal>
 )}
 <Card
 title={property.propertyTitle}
 hoverable
 extra={
 <StarFilled
 key={property._id}
 onClick={(e) => {
 e.stopPropagation();
 showRatingModal();
 }}
 style={{
 fontSize: "20px",
 color: "#FFD700",
 border: "1px solid black",
 borderRadius: "50%",
 padding: "5px",
 }}
 />
 }
 onClick={() => handleCardClick(property)}
 style={{ width: 300 }}
 >
 <Row gutter={16}>
 <Col span={24}>
 <img
 style={{
 width: "100%",
 height: "150px",
 objectFit: "cover",
 }}
 alt="property"
 src={property.propertyDetails.uploadPics[0]}
 />
 </Col>
 <Col span={24} style={{ marginTop: "10px" }}>
 <strong>Owner Name:</strong>{" "}
 {property.propertyDetails.owner?.ownerName}
 </Col>
 </Row>
 <Row gutter={16}>
 <Col span={24}>
 <PhoneOutlined style={{ marginRight: "8px" }} />
 {property.propertyDetails.owner?.ownerContact}
 </Col>
 <Col span={24}>
 <MailOutlined style={{ marginRight: "8px" }} />
 <span style={{ wordBreak: "break-word" }}>
 {property.propertyDetails.owner?.ownerEmail}
 </span>
 </Col>
 </Row>
 </Card>
 </Col>
 ))}
 </Row>
 {selectedProperty && (
 <Modal
 title={selectedProperty.propertyTitle}
 visible={isModalVisible}
 onCancel={handleModalClose}

 footer={null}
 >
 <Divider />

 <Row gutter={16} style={{ marginBottom: "20px" }}>
 <Col span={24}>
 <div style={{ textAlign: "center" }}>
 <Carousel
 arrows
 // infinite={false}
 >
 {selectedProperty?.propertyDetails?.uploadPics.map(
 (pic, index) => (
 <div key={index}>
 <img
 style={{
 width: "100%",
 height: "200px",
 objectFit: "cover",
 }}
 alt={`property-${index}`}
 src={pic}
 />
 </div>
 )
 )}
 </Carousel>
 </div>
 </Col>
 </Row>
 <Divider />

 <Row gutter={16} style={{ marginLeft: "20px" }}>
 <Col span={12}>
 <h3>
 <strong>Owner Details</strong>
 </h3>
 <p>
 <strong>Owner Name:</strong>{" "}
 {selectedProperty.propertyDetails.owner?.ownerName}
 </p>
 <p>
 <strong>Owner Contact:</strong>{" "}
 {selectedProperty.propertyDetails.owner?.ownerContact}
 </p>
 <p>
 <strong>Owner Email:</strong>{" "}
 {selectedProperty.propertyDetails.owner?.ownerEmail}
 </p>
 <p>
 <strong>Is Legal Dispute:</strong>{" "}
 {selectedProperty.propertyDetails.owner?.isLegalDispute
 ? "Yes"
 : "No"}
 </p>
 </Col>

 <Col span={12}>
 <h3>
 <strong>Amenities</strong>
 </h3>
 <p>
 <strong>Electricity:</strong>{" "}
 {selectedProperty.propertyDetails.amenities.isElectricity
 ? "Yes"
 : "No"}
 </p>
 <p>
 <strong>Water Facility:</strong>{" "}
 {selectedProperty.propertyDetails.amenities.isWaterFacility
 ? "Yes"
 : "No"}
 </p>
 <p>
 <strong>Road Faced:</strong>{" "}
 {selectedProperty.propertyDetails.amenities.isRoadFace
 ? "Yes"
 : "No"}
 </p>
 </Col>
 </Row>
 <Divider />
 <Row gutter={16} style={{ marginTop: "10px", marginLeft: "20px" }}>
 <Col span={12}>
 <h3>
 <strong>Address </strong>
 </h3>
 <p>
 <strong>Country:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.address?.country}
 </p>
 <p>
 <strong>State:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.address?.state}
 </p>
 <p>
 <strong>District:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.address?.district}
 </p>
 <p>
 <strong>Mandal:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.address?.mandal}
 </p>
 <p>
 <strong>Village:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.address?.village}
 </p>
 {selectedProperty.propertyDetails.landDetails.address
 ?.pinCode && (
 <p>
 <strong>Pin Code:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.address.pinCode}
 </p>
 )}
 </Col>
 {selectedProperty.propertyDetails.landDetails.rent.plotSize && (
 <Col span={12}>
 <h3>
 <strong>Rent Details</strong>
 </h3>
 <p>
 <strong>Plot Size:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.rent.plotSize}
 </p>
 <p>
 <strong>Rent:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.rent.rent}
 </p>
 <p>
 <strong>No of Months:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.rent.noOfMonths}
 </p>
 <p>
 <strong>Total Amount:</strong>{" "}
 {
 selectedProperty.propertyDetails.landDetails.rent
 .totalAmount
 }
 </p>
 <p>
 <strong>Land Usage:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.rent.landUsage.join(
 ", "
 )}
 </p>
 </Col>
 )}

 {selectedProperty.propertyDetails.landDetails.sell.plotSize && (
 <Col span={12}>
 <h3>
 <strong>Sell Details</strong>
 </h3>
 <p>
 <strong>Plot Size:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.sell.plotSize}
 </p>
 <p>
 <strong>Price:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.sell.price}
 </p>
 <p>
 <strong>Total Amount:</strong>{" "}
 {
 selectedProperty.propertyDetails.landDetails.sell
 .totalAmount
 }
 </p>
 <p>
 <strong>Land Usage:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.sell.landUsage.join(
 ", "
 )}
 </p>
 </Col>
 )}

 {selectedProperty.propertyDetails.landDetails.lease.plotSize && (
 <Col span={12}>
 <h3>
 <strong>Lease Details</strong>
 </h3>
 <p>
 <strong>Plot Size:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.lease.plotSize}
 </p>
 <p>
 <strong>Lease Price:</strong>{" "}
 {
 selectedProperty.propertyDetails.landDetails.lease
 .leasePrice
 }
 </p>
 <p>
 <strong>No of Years:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.lease.duration}
 </p>
 <p>
 <strong>Total Amount:</strong>{" "}
 {
 selectedProperty.propertyDetails.landDetails.lease
 .totalAmount
 }
 </p>
 <p>
 <strong>Land Usage:</strong>{" "}
 {selectedProperty.propertyDetails.landDetails.lease.landUsage.join(
 ", "
 )}
 </p>
 </Col>
 )}
 </Row>
 </Modal>
 )}
 </div>
 );
};

export default GetCommercial;