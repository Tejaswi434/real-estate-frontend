import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  notification,
  Rate,
  Row,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Arrow.css";
import { Carousel } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  StarFilled,
  UserOutlined,
  ContactsOutlined,
  IssuesCloseOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  CompassOutlined,
  GlobalOutlined,
  BankOutlined,
  HomeOutlined,
  BorderOuterOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  EditFilled,
  ClusterOutlined,
  MoneyCollectOutlined,
  AppstoreOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const GetCommercial = () => {
  const [data, setData] = useState([]);
  const [rating, setrating] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const [propId,setPropId] = useState(null);
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

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
  };

  const handleRatingChange = async (value, pid, ptype) => {
    try {
      const response = await axios.post(
        "http://172.17.15.53:3000/property/insertproprating",
        {
          rating: value,
          propertyId: pid,
          propertyType: ptype,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      openNotification(
        "success",
        "Form submitted",
        "Rating Submitted successfully!"
      );
    } catch (error) {
      openNotification(
        "error",
        "Submission failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getStarColor = (rating) => {
    // console.log(rating);
    if (rating <= 2) {
      return "red";
    } else if (rating > 2 && rating <= 3.5) {
      return "#f5d03d";
    } else if (rating > 3.5) {
      return "green";
    }
  };

  return (
    <div>
      {data.length != 0 ? (
        <Row gutter={16} style={{ padding: "20px" }}>
          {data.map((property) => (
            <Col span={8} key={property._id} style={{ marginBottom: "20px" }}>
              <Card
                title={property.propertyTitle.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                )}
                hoverable
                style={{ width: 330 }}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <img
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                      alt="property"
                      src={property.propertyDetails.uploadPics[0]}
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={14}>
                    <strong>Owner:</strong>{" "}
                    {property.propertyDetails.owner?.ownerName.replace(
                      /\b\w/g,
                      (char) => char.toUpperCase()
                    )}
                  </Col>
                  <Col span={10}>
                    <PhoneOutlined style={{ marginRight: "10px" }} />
                    {property.propertyDetails.owner?.ownerContact}
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <MailOutlined style={{ marginRight: "10px" }} />
                    <span style={{ wordBreak: "break-word" }}>
                      {property.propertyDetails.owner?.ownerEmail
                        ? property.propertyDetails.owner.ownerEmail
                        : "Email not given"}
                    </span>
                  </Col>
                  <Col span={8}>
                    <button
                      style={{
                        background: "linear-gradient(135deg, #6253e1, #04befe)",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        marginTop: "5%",
                      }}
                      onClick={() => handleCardClick(property)}
                    >
                      View More
                    </button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Rate
                      allowHalf
                      defaultValue={property.rating}
                      disabled={!isEnabled}
                      style={{
                        marginTop: "5%",
                        color: getStarColor(property.rating),
                      }}
                      onChange={(value) => setrating(value)}
                    />
                    {(!isEnabled) ? (
                      <span
                        onClick={() => {setIsEnabled(!isEnabled);
                          setPropId(property._id)
                        }}
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
                        <EditFilled 
                          style={{
                            fontSize: "16px",
                          }}
                        />
                      </span>
                    ) : (propId===property._id &&
                      <span
                        onClick={() => setIsEnabled(!isEnabled)}
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
                            handleRatingChange(
                              rating,
                              property._id,
                              property.propertyType
                            );
                          }}
                          style={{
                            fontSize: "16px",
                            marginLeft: "10px",
                          }}
                        />
                        <CloseCircleFilled
                          onClick={() => setIsEnabled(!isEnabled)}
                          style={{
                            fontSize: "16px",
                            marginLeft: "10px",
                          }}
                        />
                      </span>
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h2>There are no properties</h2>
      )}
      
      {selectedProperty && (
        <Modal
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                {selectedProperty.propertyTitle?.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                )}
              </span>
              {selectedProperty.rating && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "30px",
                  }}
                >
                  <StarFilled
                    style={{
                      marginRight: "5px",
                      color: getStarColor(selectedProperty.rating),
                    }}
                  />
                  <span>{selectedProperty.rating}</span>
                </div>
              )}
            </div>
          }
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
          extra={
            selectedProperty.rating ? (
              <Col span={6}>
                <StarFilled
                  style={{
                    marginRight: "10px",
                    color: getStarColor(selectedProperty.rating),
                  }}
                />
                <span>{selectedProperty.rating}</span>
              </Col>
            ) : (
              <></>
            )
          }
        >
          {/* <Card className="getComm1"> */}
          <Row gutter={16}>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>
                <Carousel arrows>
                  {selectedProperty?.propertyDetails?.uploadPics.map(
                    (pic, index) => (
                      <div key={index}>
                        <img
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "fill",
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
            <Col span={24} style={{ marginTop: "20px" }}>
              <span>
                <strong>Property Description: </strong>
                {selectedProperty.propertyDetails.landDetails.description
                  ? selectedProperty.propertyDetails.landDetails.description
                  : "not provided"}
              </span>
            </Col>
          </Row>
          {/* </Card> */}
          <Divider />

          <Row gutter={16} style={{ margin: "20px" }}>
            <Col span={12}>
              <Card
                className="getComm"
                style={{
                  marginBottom: "20px",
                  border: "1px solid #f0f2f5",
                  width: "100%",
                }}
                title="Owner Details"
              >
                <Col span={24}>
                  <span>
                    {" "}
                    <UserOutlined style={{ marginRight: "2px" }} />
                    <strong> Name: </strong>
                    {selectedProperty.propertyDetails.owner?.ownerName}
                  </span>
                  <br></br>
                  <span>
                    <ContactsOutlined style={{ marginRight: "3px" }} />
                    <strong>Contact: </strong>{" "}
                    {selectedProperty.propertyDetails.owner?.ownerContact}
                  </span>
                  <br></br>
                  <span>
                    <MailOutlined style={{ marginRight: "2px" }} />
                    <strong> Email: </strong>
                    {selectedProperty.propertyDetails.owner?.ownerEmail}
                  </span>
                  <br></br>
                </Col>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="getComm"
                style={{
                  marginBottom: "20px",
                  border: "1px solid #f0f2f5",
                  width: "100%",
                }}
                hoverable
                title="Amenities"
              >
                <Col span={24}>
                  <ThunderboltOutlined />{" "}
                  <span>
                    <strong>Electricity: </strong>
                    {selectedProperty.propertyDetails.amenities.isElectricity
                      ? "Yes"
                      : "No"}
                  </span>
                  <br></br>
                  <ExperimentOutlined />{" "}
                  <span>
                    <strong>Water Facility: </strong>
                    {selectedProperty.propertyDetails.amenities.isWaterFacility
                      ? "Yes"
                      : "No"}
                  </span>
                  <br></br>
                  <CompassOutlined />{" "}
                  <span>
                    <strong>Road Faced: </strong>
                    {selectedProperty.propertyDetails.amenities.isRoadFace
                      ? "Yes"
                      : "No"}
                  </span>
                </Col>
              </Card>
            </Col>
          </Row>
          {/* <Divider /> */}

          <Row gutter={16} style={{ margin: "20px" }}>
            <Col span={12}>
              <Card
                className="getComm"
                style={{
                  marginBottom: "20px",
                  border: "1px solid #f0f2f5",
                  width: "100%",
                }}
                hoverable
                title="Address"
              >
                <Col span={24}>
                  <GlobalOutlined style={{ marginRight: "2px" }} />{" "}
                  <span>
                    <strong>Country: </strong>
                    {
                      selectedProperty.propertyDetails.landDetails.address
                        ?.country
                    }
                  </span>
                  <br></br>
                  <BankOutlined style={{ marginRight: "2px" }} />{" "}
                  <span>
                    <strong>State: </strong>
                    {
                      selectedProperty.propertyDetails.landDetails.address
                        ?.state
                    }
                  </span>
                  <br></br>
                  <EnvironmentOutlined style={{ marginRight: "2px" }} />{" "}
                  <span>
                    <strong>District: </strong>
                    {
                      selectedProperty.propertyDetails.landDetails.address
                        ?.district
                    }
                  </span>
                  <br></br>
                  <BorderOuterOutlined style={{ marginRight: "2px" }} />{" "}
                  <span>
                    <strong>Mandal: </strong>
                    {
                      selectedProperty.propertyDetails.landDetails.address
                        ?.mandal
                    }
                  </span>
                  <br></br>
                  <HomeOutlined style={{ marginRight: "2px" }} />{" "}
                  <span>
                    <strong>Village: </strong>
                    {
                      selectedProperty.propertyDetails.landDetails.address
                        ?.village
                    }
                  </span>
                  <br></br>
                  {selectedProperty.propertyDetails.landDetails.address
                    ?.pinCode && (
                    <span>
                      <NumberOutlined style={{ marginRight: "2px" }} />
                      <strong>Pincode: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.address
                          .pinCode
                      }
                    </span>
                  )}
                </Col>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="getComm"
                style={{
                  marginBottom: "20px",
                  border: "1px solid #f0f2f5",
                  width: "100%",
                }}
                hoverable
                title={
                  selectedProperty.propertyDetails.landDetails.rent.plotSize
                    ? "Rent Details"
                    : selectedProperty.propertyDetails.landDetails.lease
                        .plotSize
                    ? "Lease Details"
                    : "Sell Details"
                }
              >
                {selectedProperty.propertyDetails.landDetails.rent.plotSize && (
                  <Col span={24}>
                    <AppstoreOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Plot Size: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.rent
                          .plotSize
                      }
                    </span>
                    <br></br>
                    <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Rent: </strong>
                      {selectedProperty.propertyDetails.landDetails.rent.rent}
                    </span>
                    <br></br>
                    <EllipsisOutlined style={{ marginRight: "2px" }} />
                    <span>
                      <strong>No of Months: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.rent
                          .noOfMonths
                      }
                    </span>
                    <br></br>
                    <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Total Amount: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.rent
                          .totalAmount
                      }
                    </span>
                    <br></br>
                    <span>
                      <ClusterOutlined style={{ marginRight: "2px" }} />{" "}
                      <strong>Land Usage:</strong>{" "}
                      {selectedProperty.propertyDetails.landDetails.rent.landUsage.join(
                        ", "
                      )}
                    </span>
                  </Col>
                )}

                {selectedProperty.propertyDetails.landDetails.sell.plotSize && (
                  <Col span={24}>
                    <AppstoreOutlined style={{ marginRight: "2px" }} />
                    <span>
                      <strong>Plot Size: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.sell
                          .plotSize
                      }
                    </span>
                    <br></br>
                    <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Price: </strong>
                      {selectedProperty.propertyDetails.landDetails.sell.price}
                    </span>
                    <br></br>
                    <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Total Amount: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.sell
                          .totalAmount
                      }
                    </span>
                    <br></br>
                    <span>
                      <ClusterOutlined style={{ marginRight: "2px" }} />
                      <strong>Land Usage:</strong>{" "}
                      {selectedProperty.propertyDetails.landDetails.sell.landUsage.join(
                        ", "
                      )}
                    </span>
                  </Col>
                )}

                {selectedProperty.propertyDetails.landDetails.lease
                  .plotSize && (
                  <Col span={24}>
                    <AppstoreOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Plot Size: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.lease
                          .plotSize
                      }
                    </span>
                    <br></br>
                    <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Lease Price: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.lease
                          .leasePrice
                      }
                    </span>
                    <br></br>
                    <EllipsisOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>No of Years: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.lease
                          .duration
                      }
                    </span>
                    <br></br>
                    <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
                    <span>
                      <strong>Total Amount: </strong>
                      {
                        selectedProperty.propertyDetails.landDetails.lease
                          .totalAmount
                      }
                    </span>
                    <br></br>
                    <span>
                      <ClusterOutlined style={{ marginRight: "2px" }} />
                      <strong>Land Usage:</strong>{" "}
                      {selectedProperty.propertyDetails.landDetails.lease.landUsage.join(
                        ", "
                      )}
                    </span>
                  </Col>
                )}
                <IssuesCloseOutlined
                  style={{ marginRight: "2px", marginLeft: "8px" }}
                />
                <span>
                  {" "}
                  <strong>Has Legal Disputes: </strong>
                  {selectedProperty.propertyDetails.owner?.isLegalDispute
                    ? "Yes"
                    : "No"}
                </span>
              </Card>
            </Col>
          </Row>
          {/* <Divider /> */}

          <Row gutter={16} style={{ margin: "20px" }}>
            <Col span={24}>
              {
                selectedProperty.propertyDetails.owner?.isLegalDispute && (
                  // <Col span={24} style={{ marginTop: "20px" }}>
                  <span>
                    <strong>Dispute Description: </strong>
                    {selectedProperty.propertyDetails.owner.disputeDesc}
                  </span>
                )
                // </Col>
              }
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default GetCommercial;
