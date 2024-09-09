// import { Button, Card, Col, Divider, Modal, Row } from "antd";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./Arrow.css";
// import { Carousel } from "antd";
// import {
//   PhoneOutlined,
//   MailOutlined,
//   StarFilled,
//   WarningOutlined,
//   UserOutlined,
//   ContactsOutlined,
//   IssuesCloseOutlined,
//   ExperimentOutlined,
//   ThunderboltOutlined,
//   CompassOutlined,
//   GlobalOutlined,
//   BankOutlined,
//   HomeOutlined,
//   BorderOuterOutlined,
//   DollarOutlined,
//   ClusterOutlined,
//   MoneyCollectOutlined,
//   AppstoreOutlined,
//   EllipsisOutlined,
//   EnvironmentOutlined,
//   NumberOutlined,
// } from "@ant-design/icons";
// import Rating from "./Rating";

// const GetCommercial = () => {
//   const [data, setData] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isRatingVisible, setIsRatingVisible] = useState(false);
//   const [landTitle, setlandTitle] = useState("");
//   const [tokenData, setTokenData] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const getDetails = async () => {
//       try {
//         const response = await axios.get(
//           "http://172.17.15.53:3000/commercials/getallcommercials",
//           {
//             headers: {
//               Authorization: `Bearer ${tokenData}`,
//             },
//           }
//         );
//         console.log("List of properties", response.data);
//         setData(response.data);
//       } catch (error) {
//         console.error(
//           "Error displaying properties:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };
//     getDetails();
//   }, []);

//   const handleCardClick = (property) => {
//     setSelectedProperty(property);
//     setIsModalVisible(true);
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     setSelectedProperty(null);
//   };

//   const showRatingModal = () => {
//     setIsRatingVisible(!isRatingVisible);
//   };

//   return (
//     <div>
//       {data.length != 0 ? (
//         <Row gutter={16} style={{ padding: "20px" }}>
//           {data.map((property) => (
//             <Col span={8} key={property._id} style={{ marginBottom: "20px" }}>
//               {isRatingVisible && (
//                 <Modal
//                   title="Rate the Property"
//                   visible={isRatingVisible}
//                   onOk={() => setIsRatingVisible(false)}
//                   onCancel={() => setIsRatingVisible(false)}
//                   footer={null}
//                 >
//                   <Rating
//                     propertyId={property._id}
//                     showRatingModal={showRatingModal}
//                   />
//                 </Modal>
//               )}
//               <Card
//                 title={property.propertyTitle.replace(/\b\w/g, (char) =>
//                   char.toUpperCase()
//                 )}
//                 hoverable
//                 extra={
//                   <StarFilled
//                     key={property._id}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       showRatingModal();
//                     }}
//                     style={{
//                       fontSize: "20px",
//                       color: "#FFD700",
//                       border: "1px solid black",
//                       borderRadius: "50%",
//                       padding: "5px",
//                     }}
//                   />
//                 }
//                 onClick={() => handleCardClick(property)}
//                 style={{ width: 330 }}
//               >
//                 <Row gutter={16}>
//                   <Col span={24}>
//                     <img
//                       style={{
//                         width: "100%",
//                         height: "180px",
//                         objectFit: "cover",
//                       }}
//                       alt="property"
//                       src={property.propertyDetails.uploadPics[0]}
//                     />
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <strong>Owner:</strong>{" "}
//                     {property.propertyDetails.owner?.ownerName.replace(
//                       /\b\w/g,
//                       (char) => char.toUpperCase()
//                     )}
//                   </Col>
//                   <Col span={12}>
//                     <PhoneOutlined style={{ marginRight: "10px" }} />
//                     {property.propertyDetails.owner?.ownerContact}
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={24}>
//                     <MailOutlined style={{ marginRight: "10px" }} />
//                     <span style={{ wordBreak: "break-word" }}>
//                       {property.propertyDetails.owner?.ownerEmail
//                         ? property.propertyDetails.owner.ownerEmail
//                         : "Email not given"}
//                     </span>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <h2>There are no properties</h2>
//       )}
//       {selectedProperty && (
//         <Modal
//           title={selectedProperty.propertyTitle.replace(/\b\w/g, (char) =>
//             char.toUpperCase()
//           )}
//           visible={isModalVisible}
//           onCancel={handleModalClose}
//           footer={null}
//           width={800}
//         >
//           <Row gutter={16} style={{ margin: "20px" }}>
//             <Col span={24}>
//               <div style={{ textAlign: "center" }}>
//                 <Carousel arrows>
//                   {selectedProperty?.propertyDetails?.uploadPics.map(
//                     (pic, index) => (
//                       <div key={index}>
//                         <img
//                           style={{
//                             width: "100%",
//                             height: "250px",
//                             objectFit: "cover",
//                           }}
//                           alt={`property-${index}`}
//                           src={pic}
//                         />
//                       </div>
//                     )
//                   )}
//                 </Carousel>
//               </div>
//             </Col>
//             <Col span={24} style={{ marginTop: "20px" }}>
//               <span>
//                 <strong>Property Description: </strong>
//                 {selectedProperty.propertyDetails.landDetails.description
//                   ? selectedProperty.propertyDetails.landDetails.description
//                   : "not provided"}
//               </span>
//             </Col>
//           </Row>
//           <Divider />

//           <Row gutter={16} style={{ margin: "20px" }}>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 style={{
//                   marginBottom: "20px",
//                   border: "1px solid #f0f2f5",
//                   width: "100%",
//                 }}
//                 title="Owner Details"
//               >
//                 <Col span={24}>
//                   <span>
//                     {" "}
//                     <UserOutlined style={{ marginRight: "2px" }} />
//                     <strong> Name: </strong>
//                     {selectedProperty.propertyDetails.owner?.ownerName}
//                   </span>
//                   <br></br>
//                   <span>
//                     <ContactsOutlined style={{ marginRight: "3px" }} />
//                     <strong>Contact: </strong>{" "}
//                     {selectedProperty.propertyDetails.owner?.ownerContact}
//                   </span>
//                   <br></br>
//                   <span>
//                     <MailOutlined style={{ marginRight: "2px" }} />
//                     <strong> Email: </strong>
//                     {selectedProperty.propertyDetails.owner?.ownerEmail}
//                   </span>
//                   <br></br>
//                 </Col>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 style={{
//                   marginBottom: "20px",
//                   border: "1px solid #f0f2f5",
//                   width: "100%",
//                 }}
//                 hoverable
//                 title="Amenities"
//               >
//                 <Col span={24}>
//                   <ThunderboltOutlined />{" "}
//                   <span>
//                     <strong>Electricity: </strong>
//                     {selectedProperty.propertyDetails.amenities.isElectricity
//                       ? "Yes"
//                       : "No"}
//                   </span>
//                   <br></br>
//                   <ExperimentOutlined />{" "}
//                   <span>
//                     <strong>Water Facility: </strong>
//                     {selectedProperty.propertyDetails.amenities.isWaterFacility
//                       ? "Yes"
//                       : "No"}
//                   </span>
//                   <br></br>
//                   <CompassOutlined />{" "}
//                   <span>
//                     <strong>Road Faced: </strong>
//                     {selectedProperty.propertyDetails.amenities.isRoadFace
//                       ? "Yes"
//                       : "No"}
//                   </span>
//                 </Col>
//               </Card>
//             </Col>
//           </Row>

//           <Row gutter={16} style={{ margin: "20px" }}>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 style={{
//                   marginBottom: "20px",
//                   border: "1px solid #f0f2f5",
//                   width: "100%",
//                 }}
//                 hoverable
//                 title="Address"
//               >
//                 <Col span={24}>
//                   <GlobalOutlined style={{ marginRight: "2px" }} />{" "}
//                   <span>
//                     <strong>Country: </strong>
//                     {
//                       selectedProperty.propertyDetails.landDetails.address
//                         ?.country
//                     }
//                   </span>
//                   <br></br>
//                   <BankOutlined style={{ marginRight: "2px" }} />{" "}
//                   <span>
//                     <strong>State: </strong>
//                     {
//                       selectedProperty.propertyDetails.landDetails.address
//                         ?.state
//                     }
//                   </span>
//                   <br></br>
//                   <EnvironmentOutlined style={{ marginRight: "2px" }} />{" "}
//                   <span>
//                     <strong>District: </strong>
//                     {
//                       selectedProperty.propertyDetails.landDetails.address
//                         ?.district
//                     }
//                   </span>
//                   <br></br>
//                   <BorderOuterOutlined style={{ marginRight: "2px" }} />{" "}
//                   <span>
//                     <strong>Mandal: </strong>
//                     {
//                       selectedProperty.propertyDetails.landDetails.address
//                         ?.mandal
//                     }
//                   </span>
//                   <br></br>
//                   <HomeOutlined style={{ marginRight: "2px" }} />{" "}
//                   <span>
//                     <strong>Village: </strong>
//                     {
//                       selectedProperty.propertyDetails.landDetails.address
//                         ?.village
//                     }
//                   </span>
//                   <br></br>
//                   {selectedProperty.propertyDetails.landDetails.address
//                     ?.pinCode && (
//                     <span>
//                       <NumberOutlined style={{ marginRight: "2px" }} />
//                       <strong>Pincode: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.address
//                           .pinCode
//                       }
//                     </span>
//                   )}
//                 </Col>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card
//                 className="getComm"
//                 style={{
//                   marginBottom: "20px",
//                   border: "1px solid #f0f2f5",
//                   width: "100%",
//                 }}
//                 hoverable
//                 title={
//                   selectedProperty.propertyDetails.landDetails.rent.plotSize
//                     ? "Rent Details"
//                     : selectedProperty.propertyDetails.landDetails.lease
//                         .plotSize
//                     ? "Lease Details"
//                     : "Sell Details"
//                 }
//               >
//                 {selectedProperty.propertyDetails.landDetails.rent.plotSize && (
//                   <Col span={24}>
//                     <AppstoreOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Plot Size: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.rent
//                           .plotSize
//                       }
//                     </span>
//                     <br></br>
//                     <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Rent: </strong>
//                       {selectedProperty.propertyDetails.landDetails.rent.rent}
//                     </span>{" "}
//                     <span>per sqft</span>
//                     <br></br>
//                     <EllipsisOutlined style={{ marginRight: "2px" }} />
//                     <span>
//                       <strong>No of Months: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.rent
//                           .noOfMonths
//                       }
//                     </span>
//                     <br></br>
//                     <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Total Amount: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.rent
//                           .totalAmount
//                       }
//                     </span>
//                     <br></br>
//                     <span>
//                       <ClusterOutlined style={{ marginRight: "2px" }} />{" "}
//                       <strong>Land Usage:</strong>{" "}
//                       {selectedProperty.propertyDetails.landDetails.rent.landUsage.join(
//                         ", "
//                       )}
//                     </span>
//                   </Col>
//                 )}

//                 {selectedProperty.propertyDetails.landDetails.sell.plotSize && (
//                   <Col span={24}>
//                     <AppstoreOutlined style={{ marginRight: "2px" }} />
//                     <span>
//                       <strong>Plot Size: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.sell
//                           .plotSize
//                       }
//                     </span>
//                     <br></br>
//                     <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Price: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.sell.price
//                       }{" "}
//                       per sqft
//                     </span>
//                     <br></br>
//                     <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Total Amount: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.sell
//                           .totalAmount
//                       }
//                     </span>
//                     <br></br>
//                     <span>
//                       <ClusterOutlined style={{ marginRight: "2px" }} />
//                       <strong>Land Usage:</strong>{" "}
//                       {selectedProperty.propertyDetails.landDetails.sell.landUsage.join(
//                         ", "
//                       )}
//                     </span>
//                   </Col>
//                 )}

//                 {selectedProperty.propertyDetails.landDetails.lease
//                   .plotSize && (
//                   <Col span={24}>
//                     <AppstoreOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Plot Size: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.lease
//                           .plotSize
//                       }
//                     </span>
//                     <br></br>
//                     <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Lease Price: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.lease
//                           .leasePrice
//                       }
//                     </span>
//                     <br></br>
//                     <EllipsisOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>No of Years: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.lease
//                           .duration
//                       }
//                     </span>
//                     <br></br>
//                     <MoneyCollectOutlined style={{ marginRight: "2px" }} />{" "}
//                     <span>
//                       <strong>Total Amount: </strong>
//                       {
//                         selectedProperty.propertyDetails.landDetails.lease
//                           .totalAmount
//                       }
//                     </span>
//                     <br></br>
//                     <span>
//                       <ClusterOutlined style={{ marginRight: "2px" }} />
//                       <strong>Land Usage:</strong>{" "}
//                       {selectedProperty.propertyDetails.landDetails.lease.landUsage.join(
//                         ", "
//                       )}
//                     </span>
//                   </Col>
//                 )}
//                 <IssuesCloseOutlined
//                   style={{ marginRight: "2px", marginLeft: "8px" }}
//                 />
//                 <span>
//                   {" "}
//                   <strong>Has Legal Disputes: </strong>
//                   {selectedProperty.propertyDetails.owner?.isLegalDispute
//                     ? "Yes"
//                     : "No"}
//                 </span>
//               </Card>
//             </Col>
//           </Row>
//           {/* <Divider /> */}

//           <Row gutter={16} style={{ margin: "20px" }}>
//             <Col span={24}>
//               {
//                 selectedProperty.propertyDetails.owner?.isLegalDispute && (
//                   // <Col span={24} style={{ marginTop: "20px" }}>
//                   <span>
//                     <strong>Dispute Description: </strong>
//                     {selectedProperty.propertyDetails.owner.disputeDesc}
//                   </span>
//                 )
//                 // </Col>
//               }
//             </Col>
//           </Row>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default GetCommercial;

import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StarFilled, EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

const GetCommercial = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState("");
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );

  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          "http://172.17.15.53:3000/commercials/getallcommercials",
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    getDetails();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.propertyDetails.landDetails.address?.district
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleCardClick = (property) => {
    navigate(`/dashboard/buyers/detail/${property._id}`);
  };

  const showRatingModal = () => {
    setIsRatingVisible(!isRatingVisible);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Background card with search bar */}
      <Row justify="center" style={{ marginBottom: "70px" }}>
        <Col>
          <Card
            bordered={false}
            style={{
              width: "600px",
              backgroundImage: `url('https://photos.zillowstatic.com/fp/b600e39fdc08c3f1efdb95b0555cb1b8-p_e.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Title level={3} style={{ color: "#FFFFFF", marginBottom: "15px" }}>
              <EnvironmentOutlined
                style={{ marginRight: 8, color: "#1677ff" }}
              />
              Discover Commercial Properties
            </Title>
            <Text
              style={{
                fontSize: "14px",
                color: "#FFFFFF",
                display: "block",
                marginBottom: "15px",
              }}
            >
              Find commercial spaces in various districts
            </Text>

            {/* Search bar inside the card */}
            <Search
              placeholder="Search by District"
              onSearch={(value) => setSearchQuery(value)}
              enterButton
              style={{ marginTop: "10px", width: "70%" }}
            />
            <div style={{ marginTop: "20px" }}>
              <Input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: 100, marginRight: "10px" }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Commercial properties display */}
      <Row gutter={16}>
        {filteredData.map((property) => (
          <Col span={8} key={property._id} style={{ marginBottom: "16px" }}>
            <Card
              title={property.propertyTitle}
              hoverable
              cover={
                <img
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  alt="property"
                  src={property.propertyDetails.uploadPics[0]}
                />
              }
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
              }
              onClick={() => handleCardClick(property)}
              style={{ width: "100%" }}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <strong>Plot Size:</strong>{" "}
                  {property.propertyDetails.landDetails?.plotSize || "N/A"}
                </Col>
                <Col span={24}>
                  <strong>Lease Price:</strong>{" "}
                  {property.propertyDetails.landDetails?.lease?.leasePrice ||
                    "N/A"}
                </Col>
                <Col span={24}>
                  <strong>District:</strong>{" "}
                  {property.propertyDetails.landDetails.address?.district ||
                    "N/A"}
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GetCommercial;
