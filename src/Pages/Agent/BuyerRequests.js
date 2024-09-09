import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Row, Spin, Col, Avatar, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import BuyerAppointmentForm from "./BuyerAppointmentForm";
import propertyData from "./property.json";
import Tabs from "./AppointmentTabs";
// Import the global tabs component

const BuyerRequests = () => {
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);
  const [isPropertyModalVisible, setIsPropertyModalVisible] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [users, setUsers] = useState([]);
  const [tokenData, setTokenData] = useState(localStorage.getItem(`token${localStorage.getItem("role")}`));
  const [isBooked, setIsBooked] = useState("Book Appointment");
  const [userId, setUserId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState({});
  useEffect(() => {
    fetchUserData();
    console.log(users);
  }, [tokenData]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://172.17.15.53:3000/booking/userbookingdetails/3",
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );

      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const formatTime = (timeString) => {
    // If timing is in HH:MM:SS format, append today's date to make it a valid Date string
    const today = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)
    return new Date(`${today}T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const updateBookingStatus = async (_id, status) => {
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
      fetchUserData(); // Fetch updated data after status change
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleAppointmentSubmit = (_id) => {
    return () => {
      // console.log("appoi", appointmentData);
      updateBookingStatus(_id, 2);
      setIsAppointmentModalVisible(false);
      setSelectedBuyer(null);
    };
  };

  const handleYesClick = (userId, _id) => {
    updateBookingStatus(_id, 1);
  };

  const handleNoClick = (userId, _id) => {
    updateBookingStatus(_id, -1);
  };

  const handleCancel = () => {
    console.log("handlecancel");
    setIsAppointmentModalVisible(false);
    setSelectedBuyer(null);
  };

  const handleAvatarClick = (buyer) => {
    const property = propertyData.find((p) => p.id === buyer.id);
    setSelectedProperty(property);
    setIsPropertyModalVisible(true);
  };

  const showAppointmentModal = (buyer) => {
    setSelectedBuyer(buyer);
    setIsAppointmentModalVisible(true);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const toggleDetails = async (userId, agentId) => {
    console.log("hi");
    console.log(userId);
    console.log(agentId);

    // If details are already visible, hide them by setting it to undefined or false
    if (detailsVisible[userId]) {
      setDetailsVisible((prevState) => ({
        ...prevState,
        [userId]: null, // or you can use false
      }));
    } else {
      try {
        const response = await axios.get(
          `http://172.17.15.53:3000/booking/bookingdetails/${userId}/${agentId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        console.log(response.data.booking);
        setDetailsVisible((prevState) => ({
          ...prevState,
          [userId]: response.data.booking,
        }));
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    }
  };

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
                onClick={() => {
                  setUserId(user._id);
                }}
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

                {/* Show buttons based on booking status */}
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
                    type="primary"
                    style={{ marginTop: "20px", backgroundColor: "red" }}
                  >
                    Rejected
                  </Button>
                ) : user.status === 2 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "60px"
                      }}
                    >
                      <div>
                        <Button type="primary" style={{ marginTop: "20px" }}>
                          Booked
                        </Button>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<ExclamationCircleOutlined />}
                          style={{
                           
                            marginTop: "20px",
                         
                          }}
                          onClick={() =>
                            toggleDetails(user.userId, user.agentId)
                          }
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      </div>
                    </div>

                    {/* Show details only if this user's details are clicked */}
                    {detailsVisible[user.userId] && (
                      <div style={{ marginTop: "10px" }}>
                        <div>
                          <b>Time: </b>
                          {formatTime(detailsVisible[user.userId].timing)}
                        </div>
                        <div>
                          <b>Date: </b>
                          {new Date(
                            detailsVisible[user.userId].date
                          ).toLocaleDateString("en-CA")}
                        </div>
                        <div>
                          <b>Location: </b>
                          {detailsVisible[user.userId].location}
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
              </Card>
            </Col>
          ))
        ) : (
          <div>
            <Spin />
          </div>
        )}
      </Row>

      <Modal
        visible={isAppointmentModalVisible}
        title="Book Appointment"
        onCancel={handleCancel}
        footer={null}
      >
        {selectedBuyer && (
          <BuyerAppointmentForm
            buyer={selectedBuyer}
            onSubmit={handleAppointmentSubmit(selectedBuyer._id)}
            onClose={handleCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default BuyerRequests;
