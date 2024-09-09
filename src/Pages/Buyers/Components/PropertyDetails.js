import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Progress,
  Row,
  Col,
  Tooltip,
  Avatar,
  Rate,
  Modal,
  Form,
  Input,
} from "antd";
import {
  HomeOutlined,
  SwapOutlined,
  CheckOutlined,
  CompassOutlined,
  RiseOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons"; // Import icons
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { Map } from "google-maps-react";
import GoogleApiWrapper from "./Map";
const { Meta } = Card;

const PropertyDetail = ({ property, onBack }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingType, setRatingType] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleBookAppointment = () => {
    navigate(`/book-appointment/${property.id}`);
  };

  const handleOpenRatingModal = (type) => {
    setRatingType(type);
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
    setRating(0);
    setFeedback("");
  };

  const handleSubmitRating = () => {
    // Logic to handle rating submission
    console.log(
      `Submitted ${ratingType} rating: ${rating}, Feedback: ${feedback}`
    );
    handleCloseRatingModal();
  };

  // Google Maps container style
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Button type="primary" onClick={onBack}>
          Back
        </Button>
        <Button type="primary" onClick={handleBookAppointment}>
          Book an Appointment
        </Button>
      </div>

      {/* Main content divided into two halves */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1", paddingRight: "20px" }}>
          <Card
            cover={
              <img
                alt={property.propertyName}
                src={property.propertyImages}
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
              />
            }
          >
            <Meta
              title={property.propertyName}
              description={property.address}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Avatar
                src={property.seller_image}
                size={50}
                style={{ marginRight: "15px" }}
              />
              <div>
                <p>
                  <b>Seller:</b> {property.OwnerName}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side: Detailed property information */}
        <div style={{ flex: "1", paddingLeft: "20px" }}>
          <Card
            title={<span style={{ color: "darkblue" }}>Property Details</span>}
          >
            <p>
              <b>Price:</b>{" "}
              <span style={{ color: "green" }}>₹{property.price}</span>
            </p>

            <p>
              <b>Type:</b> {property.type}
            </p>
            <p>
              <b>Location:</b> {property.Location}
            </p>
            <p>
              <b>Pincode:</b> {property.pincode}
            </p>
            <Row gutter={10} style={{ marginTop: "20px" }}>
              <Col span={8}>
                <Tooltip title="Bedrooms">
                  <HomeOutlined /> 2 Beds
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Bathrooms">
                  <HomeOutlined /> 2 Baths
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Transaction Type">
                  <CheckOutlined /> Water Facilities
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Age of Construction">
                  <HomeOutlined /> Distance {property.distance}km
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Status">
                  <CheckOutlined /> Security Watchman CCTV
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Status">
                  <CheckOutlined /> {property.size.acres}acres
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Facing Direction">
                  <CompassOutlined /> East Facing {property.features}
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Lift">
                  <RiseOutlined /> 1 Lift
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Age of Construction">
                  <HomeOutlined />
                  Year of Construction {property.yearofCon}
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Age of Construction">
                  <CheckOutlined /> 24/7 Electricity Supply
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Furnished Status">
                  <UserOutlined /> Semi-Furnished
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Age of Construction">
                  <HomeOutlined /> Nearby religious sites
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Furnished Status">
                  <UserOutlined /> Semi-Furnished
                </Tooltip>
              </Col>{" "}
              Nearby Educational Facilities
              <Col span={8}>
                <Tooltip title="Furnished Status">
                  <MedicineBoxOutlined />
                  Nearby Medical Center
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </div>
      </div>

      {/* Map Display */}
      {<GoogleApiWrapper />}

      {/* Agent Information */}
      <div style={{ marginTop: "60px" }}>
        <Card title="Agent Information">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                hoverable
                cover={<img alt="Jane Doe" src="path_to_jane_doe_image" />}
              >
                <Meta
                  avatar={<Avatar src="path_to_jane_doe_image" />}
                  title="Jane Doe"
                  description="Agent specializing in Vizianagaram area"
                />
                <p>
                  <b>Contact:</b> +1 234 567 890
                </p>
                <Button onClick={() => handleOpenRatingModal("Agent")}>
                  Rate Agent
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={<img alt="John Smith" src="path_to_john_smith_image" />}
              >
                <Meta
                  avatar={
                    <Avatar src="https://www.zillow.com/profile/BariLevineBruszer" />
                  }
                  title="John Smith"
                  description="Agent specializing in Vizianagaram area"
                />
                <p>
                  <b>Contact:</b> +1 234 567 891
                </p>
                <Button onClick={() => handleOpenRatingModal("Agent")}>
                  Rate Agent
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Rating Modal */}
      <Modal
        title={`Rate ${ratingType}`}
        visible={isRatingModalOpen}
        onOk={handleSubmitRating}
        onCancel={handleCloseRatingModal}
      >
        <Form>
          <Form.Item label="Rating">
            <Rate value={rating} onChange={(value) => setRating(value)} />
          </Form.Item>
          <Form.Item label="Feedback">
            <Input.TextArea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PropertyDetail;
