import React, { useEffect, useState } from "react";
import { Card, Typography, Input, notification, Row, Col } from "antd";
import {
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EditFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Upload from "./Agent/Commericial/Upload";
const { Meta } = Card;
const { Text, Title } = Typography;
function ProfileDetails() {
  const [isEdit, setEdit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [imageSetting, setImageSetting] = useState(false);
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
  };

  useEffect(() => {
    // Fetch data from the backend with the token included in the headers
    fetch("http://172.17.15.53:3000/users/getprofile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        console.log(data);
        setUserData(data);
        setPhoneNumber(data.phoneNumber); // Set initial phone number
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [tokenData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleProfileChange = async () => {
    try {
      let finalObject = {};
      if (phoneNumber != null) {
        finalObject.phoneNumber = phoneNumber;
        setPhoneNumber(null)
      } else if (password != null) {
        finalObject.password = password;
        setPassword(null)
      } else if (image != null) {
        finalObject.profilePicture = image;
        setImageSetting(!imageSetting);
        setImage(null)
      }
      await axios.put("http://172.17.15.53:3000/users/update", finalObject, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
          "Content-Type": "application/json",
        },
      });
      setUserData((prevData) => ({
        ...prevData,
        phoneNumber: phoneNumber != null && phoneNumber,
        profilePicture: image != null && image,
      }));
      openNotification(
        "success",
        "Profile updated",
        "Profile updated successfully!"
      );
    } catch (error) {
      openNotification(
        "error",
        "Submission failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const url = await Upload(file);
    console.log(url);
    // setPassword(null);
    // setPhoneNumber(null);
    setImage(url);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
        cover={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <img
              alt={`${userData.firstName} ${userData.lastName}`}
              src={userData.profilePicture}
              style={{ width: "50%", height: "auto", objectFit: "cover" }}
            />
          </div>
        }
      >
        <Row>
          <Col span={24}>
            {!imageSetting ? (
              <SettingOutlined
                onClick={() => {
                  setImageSetting(!imageSetting);
                }}
                style={{ float: "right" }}
              />
            ) : (
              <>
                {" "}
                <Input
                  type="file"
                  onChange={handleImageUpload}
                  style={{ width: "60%" }}
                ></Input>
                {image != null && (
                  <button
                    onClick={() => {
                      handleProfileChange();
                    }}
                  >
                    Submit
                  </button>
                )}
              </>
            )}
          </Col>
        </Row>
        <Meta
          title={
            <Title
              level={4}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              {`${userData.firstName} ${userData.lastName}`}
            </Title>
          }
        />

        <Row>
          <Col span={24}>
            <MailOutlined style={{ marginRight: 8 }} />
            <Text>{userData.email}</Text>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col span={12}>
            <PhoneOutlined style={{ marginRight: 8 }} />
            <Text>{userData.phoneNumber}</Text>
          </Col>
          <Col span={12}>
            {!isEdit ? (
              <EditFilled
                style={{ marginLeft: 23 }}
                onClick={() => setEdit(!isEdit)}
              />
            ) : (
              <>
                <Input
                  value={phoneNumber}
                  onChange={(e) => {
                    // setPassword(null);
                    setPhoneNumber(e.target.value);
                  }}
                  style={{ width: "65%" }}
                />
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    borderRadius: "60%",
                    marginLeft: "5%",
                  }}
                >
                  <CheckCircleFilled
                    onClick={() => {
                      handleProfileChange();
                      setEdit(false);
                    }}
                    style={{
                      fontSize: "16px",
                      marginLeft: "20px",
                    }}
                  />
                  <CloseCircleFilled
                    onClick={() => setEdit(!isEdit)}
                    style={{
                      fontSize: "16px",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </>
            )}
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col span={12}>
            {!showPassword ? (
              <button onClick={() => setShowPassword(!showPassword)}>
                EDIT PASSWORD
              </button>
            ) : (
              <>
                <Input
                  value={password}
                  onChange={(e) => {
                    // setPhoneNumber(null);
                    setPassword(e.target.value);
                  }}
                />
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                    borderRadius: "60%",
                    marginLeft: "5%",
                  }}
                >
                  <CheckCircleFilled
                    onClick={() => {
                      handleProfileChange();
                      setShowPassword(!showPassword);
                    }}
                    style={{
                      fontSize: "16px",
                      marginLeft: "10px",
                    }}
                  />
                  <CloseCircleFilled
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      fontSize: "16px",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ProfileDetails;
