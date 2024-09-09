import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Carousel, Button } from "antd";
import axios from "axios";
import { PhoneOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import Rating from "./Ratings";

const Agriculture = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [tokenData, setTokenData] = useState(localStorage.getItem(`token${localStorage.getItem.role}`));
  const [isRatingVisible, setIsRatingVisible] = useState(false); // State to control Rating modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.17.15.53:3000/fields/getfields",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2ZDczZWFhNTQ2NzdiMzRiNGFkZDg0ZSIsImVtYWlsIjoibW9uaWthQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoiTW9uaWthIiwibGFzdE5hbWUiOiJTaW5naCIsInBob25lTnVtYmVyIjoiOTk3ODk4NzY1NCIsInJvbGUiOjN9LCJpYXQiOjE3MjU0NDY5NTgsImV4cCI6MTcyNTQ2NDk1OH0.Cp6QV8sMKRxImpxGkN7LcIXcA6ugdvBPJ6nKZm-4ngA`,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [tokenData]);

  const showModal = (property) => {
    setSelectedProperty(property);
    setIsModalVisible(true);
  };

  const showRatingModal = () => {
    setIsRatingVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedProperty(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProperty(null);
  };

  const handleCardClick = (property, e) => {
    if (
      e.target.className.includes("ant-carousel") ||
      e.target.closest(".ant-carousel-arrow")
    ) {
      // If the click is inside the carousel or on the carousel arrow, do nothing
      return;
    }
    showModal(property);
  };

  return (
    <div>
      <Row gutter={16} style={{ padding: "20px" }}>
        {data.map((item, index) => (
          <Col span={8} key={index} style={{ marginBottom: "16px" }}>
            {isRatingVisible && (
              <Modal
                title="Rate the Property"
                visible={isRatingVisible}
                onOk={() => setIsRatingVisible(false)}
                onCancel={() => setIsRatingVisible(false)}
                footer={null}
              >
                <Rating propertyId={item._id} />
              </Modal>
            )}
            <Card
              title={item.landDetails.title}
              hoverable
              onClick={(e) => handleCardClick(item, e)}
              extra={
                <StarFilled
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
              } // Add the rating icon
              style={{ width: 330 }}
            >
              <Row gutter={18}>
                <Col span={28}>
                  <img
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    alt="property"
                    src={item.landDetails.images[0]} // Show only the first image in the card
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  <strong>Owner:</strong> {item.ownerDetails.ownerName}
                  <span style={{ marginLeft: "15px", marginRight: "5px" }}>
                    <strong>
                      <PhoneOutlined />
                    </strong>
                  </span>
                  {item.ownerDetails.phoneNumber}
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedProperty && (
        <Modal
          title={selectedProperty.landDetails.title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <Row gutter={16}>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>
                <Carousel arrows>
                  {selectedProperty.landDetails.images.map((pic, index) => (
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
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <h3>
                <strong>Owner Details</strong>
              </h3>
              <p>
                <strong>Owner Name:</strong>{" "}
                {selectedProperty.ownerDetails.ownerName}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {selectedProperty.ownerDetails.phoneNumber}
              </p>
            </Col>
            <Col span={12}>
              <h3>
                <strong>Land Details</strong>
              </h3>
              <p>
                <strong>Land Type:</strong>{" "}
                {selectedProperty.landDetails.landType}
              </p>
              <p>
                <strong>Crops:</strong>{" "}
                {selectedProperty.landDetails.crops.join(", ")}
              </p>
              <p>
                <strong>Size:</strong> {selectedProperty.landDetails.size} acres
              </p>
              <p>
                <strong>Price:</strong> {selectedProperty.landDetails.price} per
                acre
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                {selectedProperty.landDetails.totalPrice}
              </p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <h3>
                <strong>Address</strong>
              </h3>
              <p>
                <strong>Country:</strong> {selectedProperty.address.country}
              </p>
              <p>
                <strong>State:</strong> {selectedProperty.address.state}
              </p>
              <p>
                <strong>District:</strong> {selectedProperty.address.district}
              </p>
              <p>
                <strong>Mandal:</strong> {selectedProperty.address.mandal}
              </p>
              <p>
                <strong>Village:</strong> {selectedProperty.address.village}
              </p>
            </Col>
            <Col span={12}>
              <h3>
                <strong>Amenities</strong>
              </h3>
              <ul>
                {Object.entries(selectedProperty.amenities).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                      {value ? "Yes" : "No"}
                    </li>
                  )
                )}
              </ul>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default Agriculture;
