// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Modal, Carousel, Button } from "antd";
// import axios from "axios";
// import {
//   PhoneOutlined,
//   HomeOutlined,
//   BankOutlined,
//   EnvironmentOutlined,
//   DollarOutlined,
//   UserOutlined,
//   CalendarOutlined,
//   TagsOutlined,
//   GlobalOutlined,
//   BorderOuterOutlined,
//   MoneyCollectOutlined,
//   CompassOutlined,
// } from "@ant-design/icons";

// const Agriculture = ({ path }) => {
//   const [data, setData] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [tokenData, setTokenData] = useState(
//     localStorage.getItem(`token${localStorage.getItem("role")}`)
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://172.17.15.53:3000/fields/${path}`,
//           {
//             headers: {
//               Authorization: `Bearer ${tokenData}`,
//             },
//           }
//         );
//         setData(response.data.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [tokenData]);

//   const showModal = (property) => {
//     setSelectedProperty(property);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     setSelectedProperty(null);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedProperty(null);
//   };

//   const handleCardClick = (property, e) => {
//     showModal(property);
//   };

//   return (
//     <div>
//       {data.length != 0 ? (
//         <Row gutter={16} style={{ padding: "20px" }}>
//           {data.map((item, index) => (
//             <Col span={8} key={index} style={{ marginBottom: "16px" }}>
//               <Card
//                 title={item.landDetails.title}
//                 hoverable
//                 onClick={(e) => handleCardClick(item, e)}
//                 style={{
//                   width: 310,
//                   padding: 0,
//                   margin: 0,
//                 }}
//                 bodyStyle={{ padding: 10 }}
//               >
//                 <Row gutter={18} style={{ margin: 0 }}>
//                   <Col span={24} style={{ padding: 0 }}>
//                     <img
//                       style={{
//                         width: "100%",
//                         height: "150px",
//                         objectFit: "cover",
//                       }}
//                       alt="property"
//                       src={item.landDetails.images[0]}
//                     />
//                   </Col>
//                   <Col
//                     span={24}
//                     style={{
//                       marginTop: "10px",
//                       textAlign: "center",
//                       padding: 0,
//                     }}
//                   >
//                     <UserOutlined style={{ marginRight: "5px" }} />
//                     <strong>Owner:</strong> {item.ownerDetails.ownerName}
//                     <span style={{ marginLeft: "10px" }}>
//                       <PhoneOutlined style={{ marginRight: "5px" }} />
//                       {item.ownerDetails.phoneNumber}
//                     </span>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <h2>No Agriculture properties found</h2>
//       )}
//       {selectedProperty && (
//         <Modal
//           title={selectedProperty.landDetails.title}
//           visible={isModalVisible}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           width={800}
//           footer={[
//             <Button key="close" onClick={handleCancel}>
//               Close
//             </Button>,
//           ]}
//         >
//           <Row gutter={16}>
//             <Col span={24}>
//               <Carousel arrows>
//                 {selectedProperty.landDetails.images.map((pic, index) => (
//                   <div key={index}>
//                     <img
//                       style={{
//                         width: "100%",
//                         height: "250px",
//                         objectFit: "cover",
//                       }}
//                       alt={`property-${index}`}
//                       src={pic}
//                     />
//                   </div>
//                 ))}
//               </Carousel>
//             </Col>
//           </Row>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginTop: "10px",
//               fontSize: "17px",
//             }}
//           >
//             <b style={{ marginRight: "20px" }}>Property Description:</b>
//             <p style={{ margin: 0 }}>
//               {selectedProperty.landDetails.propertyDesc}
//             </p>
//           </div>

//           <Row gutter={16} style={{ marginTop: "20px" }}>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 title={
//                   <>
//                     <HomeOutlined /> Owner Details
//                   </>
//                 }
//                 style={{ margin: 0, padding: 10, maxHeight: "200px" }}
//               >
//                 <p>
//                   <strong>
//                     <UserOutlined /> Owner Name:
//                   </strong>{" "}
//                   {selectedProperty.ownerDetails.ownerName}
//                 </p>
//                 <p>
//                   <strong>
//                     <PhoneOutlined /> Phone Number:
//                   </strong>{" "}
//                   {selectedProperty.ownerDetails.phoneNumber}
//                 </p>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 title={
//                   <>
//                     <BankOutlined /> Amenities
//                   </>
//                 }
//                 style={{ margin: 0, padding: 5, height: "200px" }}
//               >
//                 <ul style={{ margin: 0, padding: 0 }}>
//                   {Object.entries(selectedProperty.amenities).map(
//                     ([key, value]) => (
//                       <li key={key} style={{ margin: 0 }}>
//                         <CompassOutlined />{" "}
//                         {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
//                         {value ? "Yes" : "No"}
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </Card>
//             </Col>
//           </Row>
//           <Row gutter={16} style={{ marginTop: "20px" }}>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 title={
//                   <>
//                     <EnvironmentOutlined /> Address
//                   </>
//                 }
//                 style={{ margin: 0, padding: 10 }}
//               >
//                 <p>
//                   <strong>
//                     <GlobalOutlined /> Country:
//                   </strong>{" "}
//                   {selectedProperty.address.country}
//                 </p>
//                 <p>
//                   <strong>
//                     <BankOutlined /> State:
//                   </strong>{" "}
//                   {selectedProperty.address.state}
//                 </p>
//                 <p>
//                   <strong>
//                     <EnvironmentOutlined /> District:
//                   </strong>{" "}
//                   {selectedProperty.address.district}
//                 </p>
//                 <p>
//                   <strong>
//                     <BorderOuterOutlined /> Mandal:
//                   </strong>{" "}
//                   {selectedProperty.address.mandal}
//                 </p>
//                 <p>
//                   <strong>
//                     <HomeOutlined /> Village:
//                   </strong>{" "}
//                   {selectedProperty.address.village}
//                 </p>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 title={
//                   <>
//                     <HomeOutlined /> Land Details
//                   </>
//                 }
//                 style={{ margin: 0, padding: 10 }}
//               >
//                 <p>
//                   <strong>
//                     <TagsOutlined /> Land Type:
//                   </strong>{" "}
//                   {selectedProperty.landDetails.landType}
//                 </p>
//                 <p>
//                   <strong>
//                     <CalendarOutlined /> Crops:
//                   </strong>{" "}
//                   {selectedProperty.landDetails.crops.join(", ")}
//                 </p>
//                 <p>
//                   <strong>
//                     <DollarOutlined /> Size:
//                   </strong>{" "}
//                   {selectedProperty.landDetails.size} acres
//                 </p>
//                 <p>
//                   <strong>
//                     <MoneyCollectOutlined /> Price:
//                   </strong>{" "}
//                   {selectedProperty.landDetails.price} per acre
//                 </p>
//                 <p>
//                   <strong>
//                     <MoneyCollectOutlined /> Total Price:
//                   </strong>{" "}
//                   {selectedProperty.landDetails.totalPrice}
//                 </p>
//               </Card>
//             </Col>
//           </Row>
//           <Row gutter={16} style={{ marginTop: "20px" }}>
//             <Col span={24}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   fontSize: "17px",
//                 }}
//               >
//                 <b style={{ marginRight: "10px" }}>Dispute Description:</b>
//                 <p style={{ margin: 0 }}>
//                   {selectedProperty.landDetails.litigationDesc}
//                 </p>
//               </div>
//             </Col>
//           </Row>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Agriculture;

import React, { useEffect, useState } from "react";

import { Card, Row, Col, Modal, Carousel, Button, Rate, notification } from "antd";
import axios from "axios";
import {
  PhoneOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  EditFilled,
  HomeOutlined,
  BankOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
  TagsOutlined,
  GlobalOutlined,
  BorderOuterOutlined,
  MoneyCollectOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const Agriculture = ({ path }) => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  
  const [rating, setrating] = useState(0);
  const [propId,setPropId] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://172.17.15.53:3000/fields/${path}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [tokenData]);

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

  const showModal = (property) => {
    setSelectedProperty(property);
    setIsModalVisible(true);
  };
  // const handleRatingChange = (value) => {
  //   setRating(value); // Update UI rating
  // };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
  };
  const handleRatingChange = async (value, pid, ptype) => {
    console.log("i am from rating", value, pid, ptype);
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
  
  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedProperty(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProperty(null);
  };

  const handleCardClick = (property, e) => {
    showModal(property);
  };

  return (
    <div>
      {data.length != 0 ? (
        <Row gutter={16} style={{ padding: "20px" }}>
          {data.map((item, index) => (
            <Col span={8} key={index} style={{ marginBottom: "16px" }}>
              <Card
                style={{
                  width: 310,
                  padding: 0,
                  margin: 0,

                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                bodyStyle={{ padding: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <b>
                    <p
                      style={{
                        textAlign: "center",
                        margin: 0,
                        fontSize: "15px",
                      }}
                    >
                      {item.landDetails.title}
                    </p>
                  </b>
                </div>

                <Row
                  gutter={18}
                  style={{ margin: 0 }}
                  justify="center"
                  align="middle"
                >
                  <Col span={24} style={{ padding: 0 }}>
                    <img
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="property"
                      src={item.landDetails.images[0]}
                    />
                  </Col>
                  <Col
                    span={24}
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      padding: 0,
                    }}
                  >
                    <UserOutlined style={{ marginRight: "5px" }} />
                    <strong>Owner:</strong> {item.ownerDetails.ownerName}
                    <span style={{ marginLeft: "10px" }}>
                      <PhoneOutlined style={{ marginRight: "5px" }} />
                      {item.ownerDetails.phoneNumber}
                    </span>
                  </Col>
              
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Rate
                      allowHalf
                      defaultValue={item.rating}
                      disabled={!isEnabled}
                      style={{
                        marginTop: "5%",
                        color: getStarColor(item.rating),
                      }}
                      onChange={(value) => setrating(value)}
                    />
                    {!isEnabled ? (
                      <span
                        onClick={() => {
                          setIsEnabled(!isEnabled);
                          setPropId(item._id);
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
                    ) : (
                      propId === item._id && (
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
                                item._id,
                                item.propertyType
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
                      )
                    )}
                  </Col>
                  <Col>
                    <button
                      style={{
                        background: "linear-gradient(135deg, #6253e1, #04befe)",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        marginTop: "5%",
                      }}
                      onClick={(e) => handleCardClick(item, e)}
                    >
                      View More
                    </button>
                  </Col>
                </Row>
                {/* <style>
                  {`
          .ant-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
        `}
                </style> */}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h2>No Agriculture properties found</h2>
      )}
      
      {selectedProperty && (
        <Modal
          title={selectedProperty.landDetails.title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Carousel arrows>
                {selectedProperty.landDetails.images.map((pic, index) => (
                  <div key={index}>
                    <img
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      alt={`property-${index}`}
                      src={pic}
                    />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              fontSize: "17px",
            }}
          >
            <b style={{ marginRight: "20px" }}>Property Description:</b>
            <p style={{ margin: 0 }}>
              {selectedProperty.landDetails.propertyDesc}
            </p>
          </div>

          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <Card
                className="getComm"
                title={
                  <>
                    <HomeOutlined /> Owner Details
                  </>
                }
                style={{ margin: 0, padding: 10, maxHeight: "200px" }}
              >
                <p>
                  <strong>
                    <UserOutlined /> Owner Name:
                  </strong>{" "}
                  {selectedProperty.ownerDetails.ownerName}
                </p>
                <p>
                  <strong>
                    <PhoneOutlined /> Phone Number:
                  </strong>{" "}
                  {selectedProperty.ownerDetails.phoneNumber}
                </p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="getComm"
                title={
                  <>
                    <BankOutlined /> Amenities
                  </>
                }
                style={{ margin: 0, padding: 5, height: "200px" }}
              >
                <ul style={{ margin: 0, padding: 0 }}>
                  {Object.entries(selectedProperty.amenities).map(
                    ([key, value]) => (
                      <li key={key} style={{ margin: 0 }}>
                        <CompassOutlined />{" "}
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                        {value ? "Yes" : "No"}
                      </li>
                    )
                  )}
                </ul>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <Card
                className="getComm"
                title={
                  <>
                    <EnvironmentOutlined /> Address
                  </>
                }
                style={{ margin: 0, padding: 10 }}
              >
                <p>
                  <strong>
                    <GlobalOutlined /> Country:
                  </strong>{" "}
                  {selectedProperty.address.country}
                </p>
                <p>
                  <strong>
                    <BankOutlined /> State:
                  </strong>{" "}
                  {selectedProperty.address.state}
                </p>
                <p>
                  <strong>
                    <EnvironmentOutlined /> District:
                  </strong>{" "}
                  {selectedProperty.address.district}
                </p>
                <p>
                  <strong>
                    <BorderOuterOutlined /> Mandal:
                  </strong>{" "}
                  {selectedProperty.address.mandal}
                </p>
                <p>
                  <strong>
                    <HomeOutlined /> Village:
                  </strong>{" "}
                  {selectedProperty.address.village}
                </p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="getComm"
                title={
                  <>
                    <HomeOutlined /> Land Details
                  </>
                }
                style={{ margin: 0, padding: 10 }}
              >
                <p>
                  <strong>
                    <TagsOutlined /> Land Type:
                  </strong>{" "}
                  {selectedProperty.landDetails.landType}
                </p>
                <p>
                  <strong>
                    <CalendarOutlined /> Crops:
                  </strong>{" "}
                  {selectedProperty.landDetails.crops.join(", ")}
                </p>
                <p>
                  <strong>
                    <DollarOutlined /> Size:
                  </strong>{" "}
                  {selectedProperty.landDetails.size} acres
                </p>
                <p>
                  <strong>
                    <MoneyCollectOutlined /> Price:
                  </strong>{" "}
                  {selectedProperty.landDetails.price} per acre
                </p>
                <p>
                  <strong>
                    <MoneyCollectOutlined /> Total Price:
                  </strong>{" "}
                  {selectedProperty.landDetails.totalPrice}
                </p>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "17px",
                }}
              >
                <b style={{ marginRight: "10px" }}>Dispute Description:</b>
                <p style={{ margin: 0 }}>
                  {selectedProperty.landDetails.litigationDesc}
                </p>
              </div>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default Agriculture;
