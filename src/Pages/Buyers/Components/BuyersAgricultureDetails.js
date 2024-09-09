import React, { useEffect, useState } from "react";
import { Row, Col, Carousel, Typography, Card, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import GoogleApiWrapper from "./Map";

const { Title, Text } = Typography;

const BuyersAgricultureDetails = () => {
  //   const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // console.log(propertyId);
        const response = await axios.get(
          `http://172.17.15.53:3000/property/getpropbyid/Agricultural/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        console.log(response.data);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property:", error);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={property.landDetails.title}
            bordered={false}
            style={{ marginBottom: "20px" }}
          >
            <Carousel autoplay>
              {property.landDetails.images.map((pic, index) => (
                <div key={index}>
                  <img
                    alt={`property-${index + 1}`}
                    src={pic}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Owner Details"
            bordered={false}
            style={{ marginBottom: "20px" }}
          >
            <p>
              <Text strong>Name:</Text>{" "}
              {property.ownerDetails.ownerName || "Not Entered"}
            </p>
            <p>
              <Text strong>Phone Number:</Text>{" "}
              {property.ownerDetails.phoneNumber || "Not Entered"}
            </p>
            <p>
              <Text strong>Email:</Text>{" "}
              {property.ownerDetails.ownerEmail || "Not Entered"}
            </p>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Land Details"
            bordered={false}
            style={{ marginBottom: "20px" }}
          >
            <p>
              <Text strong>Land Type:</Text> {property.landDetails.landType}
            </p>
            <p>
              <Text strong>Crops:</Text> {property.landDetails.crops.join(", ")}
            </p>
            <p>
              <Text strong>Size:</Text> {property.landDetails.size} acres
            </p>
            <p>
              <Text strong>Price:</Text> ${property.landDetails.price} per acre
            </p>
            <p>
              <Text strong>Total Price:</Text> $
              {property.landDetails.totalPrice}
            </p>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Address"
            bordered={false}
            style={{ marginBottom: "20px" }}
          >
            <p>
              <Text strong>Country:</Text> {property.address.country}
            </p>
            <p>
              <Text strong>State:</Text> {property.address.state}
            </p>
            <p>
              <Text strong>District:</Text> {property.address.district}
            </p>
            <p>
              <Text strong>Mandal:</Text> {property.address.mandal}
            </p>
            <p>
              <Text strong>Village:</Text> {property.address.village}
            </p>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Amenities" bordered={false}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {property.amenities &&
                Object.entries(property.amenities).map(([key, value]) => (
                  <li key={key}>
                    <Text strong>
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                    </Text>{" "}
                    {value ? "Yes" : "No"}
                  </li>
                ))}
            </ul>
          </Card>
        </Col>
      </Row>
      {/* Google Map */}
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
  );
};

export default BuyersAgricultureDetails;
