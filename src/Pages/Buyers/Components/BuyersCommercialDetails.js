import React, { useState, useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Modal,
  Tag,
  Input,
  Rate,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-maps-react";
import Rating from "./Rating"; // Assuming you have a Rating component
import GoogleApiWrapper from "./Map";

const { Title, Text } = Typography;

const GetCommercialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] =
    useState(false);
  const [rating, setRating] = useState(0);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const [feedback, setFeedback] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2ZDczZWFhNTQ2NzdiMzRiNGFkZDg0ZSIsImVtYWlsIjoibW9uaWthQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoiTW9uaWthIiwibGFzdE5hbWUiOiJTaW5naCIsInBob25lTnVtYmVyIjoiOTk3ODk4NzY1NCIsInJvbGUiOjN9LCJpYXQiOjE3MjU2MTM4NjQsImV4cCI6MTcyNTcwMDI2NH0.LljTvV7Y-3OUvzGDjt3WcKXYC2-83OMzjOiz19_9P1M";

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://172.17.15.53:3000/property/getpropbyid/Commercial/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const showRatingModal = () => {
    setIsRatingVisible(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingVisible(false);
    setRating(0);
    setFeedback("");
  };

  const handleSubmitRating = () => {
    console.log(`Submitted rating: ${rating}, Feedback: ${feedback}`);
    handleCloseRatingModal();
  };

  const handleBookAppointment = () => {
    console.log("Appointment Details:", appointmentDetails);
    setIsBookAppointmentModalOpen(false);
    setAppointmentDetails({
      name: "",
      phone: "",
      date: "",
      time: "",
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
      >
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => setIsBookAppointmentModalOpen(true)}
        >
          Book Appointment
        </Button>
      </div>

      <div style={{ padding: "20px" }}>
        {/* <Title level={3}>{property.propertyTitle}</Title> */}
        <Card
          title={property.propertyTitle}
          bordered={false}
          style={{ marginBottom: "20px" }}
        >
          <Carousel autoplay>
            {property.propertyDetails.uploadPics.map((photo, index) => (
              <div key={index}>
                <img
                  alt={`Property Photo ${index + 1}`}
                  src={photo}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
        </Card>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card title="Owner Details" bordered={false}>
              <p>
                <MailOutlined /> <strong>Email:</strong>{" "}
                {property.propertyDetails.owner?.ownerEmail || "Not Entered"}
              </p>
              <p>
                <PhoneOutlined /> <strong>Contact:</strong>{" "}
                {property.propertyDetails.owner?.ownerContact || "Not Entered"}
              </p>
              <p>
                <HomeOutlined /> <strong>Name:</strong>{" "}
                {property.propertyDetails.owner?.ownerName || "Not Entered"}
              </p>
              <p>
                <SafetyCertificateOutlined /> <strong>Is Legal Dispute:</strong>{" "}
                {property.propertyDetails.owner?.isLegalDispute ? "Yes" : "No"}
              </p>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Amenities" bordered={false}>
              <p>
                <SafetyCertificateOutlined /> <strong>Electricity:</strong>{" "}
                {property.propertyDetails.amenities.isElectricity
                  ? "Yes"
                  : "No"}
              </p>
              <p>
                <SafetyCertificateOutlined /> <strong>Water Facility:</strong>{" "}
                {property.propertyDetails.amenities.isWaterFacility
                  ? "Yes"
                  : "No"}
              </p>
              <p>
                <SafetyCertificateOutlined /> <strong>Road Faced:</strong>{" "}
                {property.propertyDetails.amenities.isRoadFace ? "Yes" : "No"}
              </p>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card title="Address" bordered={false}>
              <p>
                <EnvironmentOutlined /> <strong>Country:</strong>{" "}
                {property.propertyDetails.landDetails.address?.country}
              </p>
              <p>
                <EnvironmentOutlined /> <strong>State:</strong>{" "}
                {property.propertyDetails.landDetails.address?.state}
              </p>
              <p>
                <EnvironmentOutlined /> <strong>District:</strong>{" "}
                {property.propertyDetails.landDetails.address?.district}
              </p>
              <p>
                <EnvironmentOutlined /> <strong>Mandal:</strong>{" "}
                {property.propertyDetails.landDetails.address?.mandal}
              </p>
              <p>
                <EnvironmentOutlined /> <strong>Village:</strong>{" "}
                {property.propertyDetails.landDetails.address?.village}
              </p>
              {property.propertyDetails.landDetails.address?.pinCode && (
                <p>
                  <EnvironmentOutlined /> <strong>Pin Code:</strong>{" "}
                  {property.propertyDetails.landDetails.address.pinCode}
                </p>
              )}
            </Card>
          </Col>

          {property.propertyDetails.landDetails.rent && (
            <Col span={12}>
              <Card title="Rent Details" bordered={false}>
                <p>
                  <DollarOutlined /> <strong>Plot Size:</strong>{" "}
                  {property.propertyDetails.landDetails.rent.plotSize}
                </p>
                <p>
                  <DollarOutlined /> <strong>Rent:</strong>{" "}
                  {property.propertyDetails.landDetails.rent.rent}
                </p>
                <p>
                  <DollarOutlined /> <strong>No of Months:</strong>{" "}
                  {property.propertyDetails.landDetails.rent.noOfMonths}
                </p>
                <p>
                  <DollarOutlined /> <strong>Total Amount:</strong>{" "}
                  {property.propertyDetails.landDetails.rent.totalAmount}
                </p>
                <p>
                  <BranchesOutlined /> <strong>Land Usage:</strong>{" "}
                  {property.propertyDetails.landDetails.rent.landUsage.join(
                    ", "
                  )}
                </p>
              </Card>
            </Col>
          )}
        </Row>
        {/* 
 <div style={{ marginTop: 20 }}>
 <Text strong>Would you like to rate this property?</Text>
 <StarFilled style={{ color: "gold", cursor: "pointer", marginLeft: 10 }} onClick={showRatingModal} />
 </div> */}

        <Modal
          title="Rate the Property"
          visible={isRatingVisible}
          onCancel={handleCloseRatingModal}
          footer={null}
        >
          <Rate onChange={setRating} value={rating} />
          <Input.TextArea
            rows={4}
            placeholder="Leave your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleSubmitRating}
            style={{ marginTop: 10 }}
          >
            Submit Rating
          </Button>
        </Modal>

        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
 <Button type="primary" onClick={() => navigate(-1)} style={{ marginRight: 10 }}>
 Back
 </Button>
 <Button type="primary" onClick={() => setIsBookAppointmentModalOpen(true)}>
 Book Appointment
 </Button>
 </div> */}

        <Modal
          title="Book Appointment"
          visible={isBookAppointmentModalOpen}
          onCancel={() => setIsBookAppointmentModalOpen(false)}
          footer={null}
        >
          <Input
            placeholder="Name"
            value={appointmentDetails.name}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                name: e.target.value,
              })
            }
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Phone"
            value={appointmentDetails.phone}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                phone: e.target.value,
              })
            }
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Date"
            value={appointmentDetails.date}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                date: e.target.value,
              })
            }
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Time"
            value={appointmentDetails.time}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                time: e.target.value,
              })
            }
          />
          <Button
            type="primary"
            onClick={handleBookAppointment}
            style={{ marginTop: 10 }}
          >
            Book Appointment
          </Button>
        </Modal>

        <div style={{ marginTop: "40px" }}>
          <GoogleApiWrapper />
        </div>

      {/* Agent Information */}
      <div style={{ marginTop: "60px", width: "70%", marginLeft: "15%" }}>
        <Card title="Agent Information">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <img
                    alt="Jane Doe"
                    src="https://photos.zillowstatic.com/fp/d0465fce544e18bb3f205bc52f41872f-h_g.jpg"
                  />
                }
              >
                <p>
                  <b>Agent:</b> Jane Doe
                </p>
                <p>
                  <b>Contact:</b> +1 234 567 890
                </p>
                <p>Agent specializing in Vizianagaram area</p>
                {/* <Button onClick={() => handleOpenRatingModal("Agent")}>
                  Rate Agent
                </Button> */}
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <img
                    alt="John Smith"
                    src="https://photos.zillowstatic.com/fp/7ebbf4fc26c57ef65167b8f7b32ded83-h_g.jpg"
                  />
                }
              >
                <p>
                  <b>Agent:</b> John Smith
                </p>
                <p>
                  <b>Contact:</b> +1 234 567 891
                </p>
                <p>Agent specializing in Vizianagaram area</p>
                {/* <Button onClick={() => handleOpenRatingModal("Agent")}>
                  Rate Agent
                </Button> */}
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
      </div>
    </>
  );
};

export default GetCommercialDetail;
