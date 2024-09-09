import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Spin, Col, Avatar, Button, Modal } from "antd";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import SellerAppointmentForm from "./SellerAppointmentForm";
import propertyData from "./property.json";
import Tabs from "./AppointmentTabs"; // Import the global tabs component

const SellerRequests = () => {
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);
  const [isPropertyModalVisible, setIsPropertyModalVisible] = useState(false);
  const [selectedSeller, setselectedSeller] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [users, setUsers] = useState([]);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://172.17.15.53:3000/booking/userbookingdetails/2",
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        // Ensure users is always an array
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [tokenData]);

  const updateBookingStatus = async (_id, status) => {
    console.log("Updating status for booking ID:", _id);
    try {
      await axios.put(
        `http://172.17.15.53:3000/booking/updatebookingstatus/${_id}/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      console.log(`Booking status updated to ${status} for user ${_id}`);
      // Fetch data again to update status in the UI
      const response = await axios.get(
        "http://172.17.15.53:3000/booking/userbookingdetails/2",
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const showAppointmentModal = (seller) => {
    setselectedSeller(seller);
    setIsAppointmentModalVisible(true);
  };

  const handleYesClick = (userId, _id) => {
    updateBookingStatus(_id, 1);
  };

  const handleNoClick = (userId, _id) => {
    updateBookingStatus(_id, -1);
  };

  const handleCancel = () => {
    setIsAppointmentModalVisible(false);
    setselectedSeller(null);
  };

  const handleAvatarClick = (seller) => {
    const property = propertyData.find((p) => p.id === seller.id);
    setSelectedProperty(property);
    setIsPropertyModalVisible(true);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        <Tabs />
      </div>
      <Row gutter={[16, 16]}>
        {users && users.length > 0 ? (
          users.map((user) => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card
                bordered={false}
                style={{
                  border: "1px solid #d4ebe8",
                  borderRadius: "8px",
                  padding: "16px",
                  position: "relative",
                  transition: "transform 0.3s ease-in-out",
                  backgroundColor: "#fff",
                  color: "#333",
                  marginTop: "20px",
                  textAlign: "center",
                }}
                bodyStyle={{ padding: "20px 0", textAlign: "center" }}
                hoverable
              >
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={user.avatar}
                    size={120}
                    style={{
                      borderRadius: "50%",
                      border: "4px solid #ffffff",
                      boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                      marginTop: "50px",
                      display: "block",
                      margin: "0 auto",
                    }}
                    onClick={() => handleAvatarClick(user)}
                  />
                </div>
                <div
                  style={{
                    lineHeight: "1.8",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <b>{user.firstName}</b> <b>{user.lastName}</b>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <b>
                      <PhoneOutlined /> Phone Number:
                    </b>{" "}
                    {user.phoneNumber}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <b>
                      <CalendarOutlined /> Date:
                    </b>{" "}
                    {formatDate(user.date)}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <b>
                      <FieldTimeOutlined /> Time:
                    </b>{" "}
                    {user.timing}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <b>Location:</b> {user.location}
                  </div>
                </div>
                {user.status === 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "green",
                          borderColor: "green",
                        }}
                        onClick={() => handleYesClick(user.userId, user._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        type="danger"
                        style={{
                          backgroundColor: "white",
                          borderColor: "black",
                        }}
                        onClick={() => handleNoClick(user.userId, user._id)}
                      >
                        Reject
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => showAppointmentModal(user)}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </>
                ) : user.status === 1 ? (
                  <Button
                    type="primary"
                    style={{ marginTop: "20px", backgroundColor: "green" }}
                  >
                    Accepted
                  </Button>
                ) : user.status === -1 ? (
                  <Button
                    type="danger"
                    style={{
                      marginTop: "20px",
                      backgroundColor: "red",
                      borderColor: "red",
                    }}
                  >
                    Rejected
                  </Button>
                ) : null}
              </Card>
            </Col>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" /> 
            <p>Loading users...</p>
          </div>
        )}
      </Row>
      <Modal
        title="Book an Appointment"
        visible={isAppointmentModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedSeller && (
          <SellerAppointmentForm
            seller={selectedSeller}
            onClose={handleCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default SellerRequests;
