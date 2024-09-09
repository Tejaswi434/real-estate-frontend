// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Modal, Carousel, Button } from "antd";
// import axios from "axios";
// import "./Arrow.css";
// import {
//   PhoneOutlined,
//   StarFilled,
//   HomeOutlined,
//   BankOutlined,
//   TagOutlined,
//   EnvironmentOutlined,
//   DollarOutlined,
//   InfoCircleOutlined,
//   UserOutlined,
//   CalendarOutlined,
//   TagsOutlined,
//   MailOutlined,
//   WarningOutlined,
//   ContactsOutlined,
//   IssuesCloseOutlined,
//   ExperimentOutlined,
//   ThunderboltOutlined,
//   CompassOutlined,
//   GlobalOutlined,
//   BorderOuterOutlined,
//   ClusterOutlined,
//   MoneyCollectOutlined,
//   AppstoreOutlined,
//   EllipsisOutlined,
//   NumberOutlined,
// } from "@ant-design/icons";
// import Rating from "./Rating";

// const Agriculture = () => {
//   const [data, setData] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [tokenData, setTokenData] = useState(localStorage.getItem("token"));
//   const [isRatingVisible, setIsRatingVisible] = useState(false); // State to control Rating modal visibility

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://172.17.15.53:3000/fields/getallfields",
//           {
//             headers: {
//               Authorization: `Bearer ${tokenData}`,
//             },
//           }
//         );
//         setData(response.data.data);
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

//   const showRatingModal = () => {
//     setIsRatingVisible(true);
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
//     if (
//       e.target.className.includes("ant-carousel") ||
//       e.target.closest(".ant-carousel-arrow")
//     ) {
//       // If the click is inside the carousel or on the carousel arrow, do nothing
//       return;
//     }
//     showModal(property);
//   };

//   return (
//     <div>
//       <Row gutter={16} style={{ padding: "20px" }}>
//         {data.map((item, index) => (
//           <Col span={8} key={index} style={{ marginBottom: "16px" }}>
//             {isRatingVisible && (
//               <Modal
//                 title="Rate the Property"
//                 visible={isRatingVisible}
//                 onOk={() => setIsRatingVisible(false)}
//                 onCancel={() => setIsRatingVisible(false)}
//                 footer={null}
//               >
//                 <Rating propertyId={item._id} />
//               </Modal>
//             )}
//             <Card
//               title={item.landDetails.title}
//               hoverable
//               onClick={(e) => handleCardClick(item, e)}
//               extra={
//                 <StarFilled
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     showRatingModal();
//                   }}
//                   style={{
//                     fontSize: "20px",
//                     color: "#FFD700",
//                     border: "1px solid black",
//                     borderRadius: "50%",
//                     padding: "5px",
//                   }}
//                 />
//               }
//               style={{
//                 width: 330,
//                 padding: 0,
//                 margin: 0,
//               }}
//               bodyStyle={{ padding: 10 }}
//             >
//               <Row gutter={18} style={{ margin: 0 }}>
//                 <Col span={24} style={{ padding: 0 }}>
//                   <img
//                     style={{
//                       width: "100%",
//                       height: "150px",
//                       objectFit: "cover",
//                     }}
//                     alt="property"
//                     src={item.landDetails.images[0]}
//                   />
//                 </Col>
//                 <Col
//                   span={24}
//                   style={{
//                     marginTop: "10px",
//                     textAlign: "center",
//                     padding: 0,
//                   }}
//                 >
//                   <UserOutlined style={{ marginRight: "5px" }} />
//                   <strong>Owner:</strong> {item.ownerDetails.ownerName}
//                   <span style={{ marginLeft: "15px" }}>
//                     <PhoneOutlined style={{ marginRight: "5px" }} />
//                     {item.ownerDetails.phoneNumber}
//                   </span>
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         ))}
//       </Row>
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

//           {/* <Card
//             title={
//               <>
//                 <InfoCircleOutlined /> Property Description
//               </>
//             }
//             style={{ marginTop: "20px" }}
//           >
//             <p>{selectedProperty.landDetails.propertyDesc}</p>
//           </Card> */}
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
import {
  Card,
  Row,
  Col,
  Spin,
  Typography,
  Tag,
  Space,
  Tooltip,
  Input,
} from "antd";
import axios from "axios";
import {
  StarFilled,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Search } = Input;

const BuyersAgriculture = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tokenData);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.17.15.53:3000/fields/getallfields",
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        setData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.address.district
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        (!price || item.landDetails.price <= parseFloat(price))
    );
    setFilteredData(filtered);
  }, [searchQuery, price, data]);

  const handleCardClick = (propertyId) => {
    navigate(`/dashboard/buyers/details2/${propertyId}`);
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
              backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA9wMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAADBAACBQEG/8QAPhAAAgECBAMECAUCBQUBAQAAAQIRAAMEEiExQVFhEyJx8AUygZGhscHRFCNCUuEz8QZicoKSFSSistLDwv/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwAEBQb/xAAlEQACAgIDAQACAgMBAAAAAAAAAQIRITEDEkETUWEEIjJxwRT/2gAMAwEAAhEDEQA/APZHELuLbydTm2qqYk9plCKGbU6gRWYbtq0gLXW72vImol6zbIeQ2f3718VHiPGSNYOQSwa3l4QaBdvSpJI360s2JUIG2jyKWuXiXIBBAjWeZApo8Y6NG7fy2zGvhQrmIIe2STDaDTY0u7EspDd3eOvkUHEhmsjKxkGRV+NLQ6NRcSSozaRzo9q6AQzE1j2LhKamSdaZViGIJJBFCUadDJmut1WjvEdYqyXo3OoPDSaRs5U1JJXjIo+ZSZET0qLkkXjI0bWK11LjqKctX1JmsIXzb0ZdOY1o4xHczIZHOtl6LwkegW4Iq4ccx76wbWLO2s8aYXGeHvox7o6Iys2Q1Wz1l28YpBABJ5VYYwftjWKuufkiN1NHPXM1Ifi5EjWKG+MJ0DBfGi+abCoGiXqrPpWPcxt8RAJ8ONDfHODEAHroalJyYsmka7X4MQKWu4iONZN7HORGffdaX/FlyQzqWHDYj2VN8bebIS5GadzEtMKbbdDpQWxF0anIBWc+Kj1oA5zQWvCfX360OhCTs0XxMcaE2JYfqMddKTDmdGB8DNVZiNSoHWYNBxohJjn4ocWWfGunEWwM0TzI1rNNxSZ+MVWA57pBPjqKHREnRo9sn7veAaq160D/AFfeNqy2S8ONBd7yakn3GiuFP0SjXOItTpcB8TpUrCbFPPM+NSqf+c3UWsv2lxLxzNaBlQD1/vUtuHZpEKpy5qsmDZURJAVYEcYmrWsPatq2e4D3wdNNoJP0rruNYMhl2UMFAly2gkbTQ8oN5gQBBBYztuftRLYtSDOYyduetUbEWbVwnKxVSe8TuNB58Kkm/DBGdoOo0g+ffViuZMwJgqIE++h3MRb0tKokmMxHIa0AYy8HKd0KAWmOExTqEmsDqLGEzLdKBozCQeW1NpeidYjWBWNcxFwP3m4wR06c96JaxRWHOp4efdTy4W1Y6RrfilzAorMp3UGKOMWVg5Rl6GYrIe8p/NUjUidNK4mKXVVIJmCJ4+fPNPgmOjc/ENlkMrIx0Kjahvee22adDrWScSLQz22Jtz3gBTSYhGEoymdgTv4Ufl1LJjy4xdM7jxFGXEsGAkTw61k5kYhwYG0bQeRrodlXKduKHj4GioovGVGymMLSrEiKucZcRTmfu82kj+KxxdUwM0Ec21q3a9ke4ug1jY+6t0TKqRqNi5HeIAjQsPkRXHxLhRmbu8zqKzVxtszlGVhvE6eIqNiHHeUnKeK/UfakcGnoDmx/8S0zBXwOlCuXszQYIPEfas04pVPfkdVqvb5hKMHO/I+4VvnZKUh83VOoYx8K42VoKureO/srP7cjWJPUQa4e8ZEKxGx0/g0rgQkx/NlBAbs/bM++htdWIJVtNNIpQMdrs9CNP4qpC5uI+dL0/ZJsbe9YUBXzBuMa/GuLiRMWbgf/ACjU+460kUurJW6png/3FBuEg/mpC9BM+6m+aZORoPj/ANyg+O9CbHA/oIHw99J5u0AIYyOBM/OhXWvK2ihv90U64UKPm/dM5XgE6CqtfcGWDe/ekRc7sPmU8nET7RXBIBKu09O98qPyQMDNy6p9dljlGtdpbtTmg5SeR3qUeoA9i7cKEuYG5JI7o8BSmIu3GRs0KzGeeUfWq3bs2ArnLmOZ9N1G8/WlEvs7Xg0CCYUawdNPZ9DVYcfoUjSs4nLmlgoS2COh0+prgcm4y5hmyGddj6xHvBrPUfpZwymPV5LM/WuYe93rlzOS7qGjmZH/ANGnfHh0NWDXxLhG3WQHKqTzK/el75m7AbTKdY46/ID40tiGzNaYltSE0462/v8ACq2sV2lxXJ9ZTKxGhKifg1GEGkOgsgBc4kssaGYPn41xHXMozA5RJBO+/mOk8aA2IY20ZVmdTr4yPeG94pdmLOIzEMZU8tdvPIVWMX6FGvZdB3QZQmGB4E8PP3rt9vwzMyiZ4gax5888y0QyXFcMpDTv4efd1phbpxVrKZDrpMawOHn71nHIxoW8SgIMRIgzGvQ+frAbt+5hWz2hFlm7wPD7UuNCEaQDt/lI8+Y1Kl6NLqggxv8AqHnzxKdUmMmO/iphhmUNoGy/fzpXRcdtAYMagbHwrLa++GuQWmy5kiJKk8PP80zbYHUGQ23I/wA+dKzj6UTGSxS2WKEjca123iMi6sSs7EcfoaVbEmzcBuXGUE+sdZ8dNa7dbOM6yump3A8RQafo/Ybdg4z27g0160PtbobRiM2kiNPEbH2GfGkQ5Y5gQjEjY6GjdorQrlebcQ3soV1M5YGPxa7Xe6Ts4XQ+NS6WnTKRwK6R9DS7MQwOiGNt/I+1C/EMpJDBuBWND9/hW6XoRuxkYm6ixcyXl4gHVfPk0VcQlx/ymho9Vxp7KTXFW7uYEhSOBP14VS9m0Ld9Ygcx4a60HC/0TkzRzi0PWKE7gDMD9quLy5PzbXTMkRWSty+utki7b17jbiupil31ta6gVN8BJxNYW7bybTaHeDB929UGa2JzAz01pBnLANoU2DKdfPsqn4g5hbDguR6r8vH7Gl+L8E6jlwI0dqoY9PIquW2P6N1gRoQvP6UJrxzAHugfuGZffVLlu0xLyQSScymRPwit0rYpZyyfpB5keYoLPaY96Vbgf5rtwso7jk8yuoP1FVN4EHMpIUSTHn506iYs/auB2bmBxDA/zUqimzcYZWI00K7H5VKOUAQxOJdhKsodhOVf0jh8h7KDbuuttWGrKc+u8DagPdDkuwH5jy07AcvZqPZRnuKmKuM0TbKq8aag5m+RFdvVJUXpF7BCWbwMiO0QSeOXKT72o1lbbLFs+pAEzIOdR9aWw63UhbkQwXLPM3EB+Ro/o9G7FswPqg6j/OlLNJaFYbGNDWe7oO8mushSfoKjqwPEsqNppqJA/wD0+Fcuj8/CqxORhlMnjoP/AOqs5a46XFM5hkYBYMkH/wC1NZPCGQHU9oAIUGTpwb7ED/kalsMGykABYMk7cx/4/wDjVp/LLhCjhTJbl9N0/wCJrhJYBkMkLmURvt9I+NGzBbQAzZplWkQ3rDiPjp7aZEWn7dCSANQfZ9/l1pK3dLQ8gftXT1T/AH/9quboUBQwI2Mnc6x8/nU2nZldhMRcbPnT1G/8fp55EVBcV1JzaCCGA287/wAzVEP5YXjuCwjTr8fjQdLLlCXPAwACfpw4+HCmSTwOMu++ZSQeuhHT+3s4ASXGw6QJuWW12gqPDz9aDmOeHeTrBJ0I+/A/HjJLdxULK+lsGQHOgJPX6+3jLdcUMh5Fu4iEt23uL+lkUkqOR++lDJu4c7MOEN+nx+tN+jPSV30f/wBt6MdsPi8S4tpiFcnLmMDukwRPMaTWh/irBvgGOKxmJTE3bkdtkhMp4GBwj486p8W4dkb6RTpmOVF7VCFc7gd6R0oRYgZbih7baydOdAduxK3LbTGpH1FG7YXgvdbL+2d+fj53qNUMcW9esQuVmtzuxkjSiMFugPaYZpzRMa/X+9LFmKwZdfCcvnyaKno/GX3Bw9lyTrqvdI6+eFFRvQP9HLszN1YK+sVOp+FdsX2RiVcZf2uu/nWtDEeifSGEwoxGNsdwtAicySOHMbVl3LRZcyN3gZzLMj/UKCzhiyxsdR7N8jMoDwdG0gdDXb1iRLxcUbRAaKzyWt7hGJ4tt41e1i7gIzwRwW7uR0PnfjS/NrMSbX4LDPa/omRxt3PW9/k1GxaXO7eXI55mT59tXa4l+FYlDqSGFDu2coG7kjQOfV8Dvy3rKvRbIly6oY2LodOIYTXRiBkl1eywj1TpHn+1KNZNtlFl2HJCNW8I0NWGJZGZb4KrGobb+KbpawCkO5myZstu5O7IQD591dW+H3fKdglxd/PtpI5bhV7bFTGoUyI8+NWR27MdoM4J0O1I4IDQwyoZyg6cU1qUG3cW4YVwIGo2ipSNNCmeFHZSV76iBOx3167H30ZLh7YA5SXaLmb/ADAA689TVFVPwqr68gajWFn7KffRCVu4knQlbRPgezJBnxNdL0yoW84ONtLHdKAkjQAqGf7U1YTLZU3MoaAoDnhmH2FIYibV5m3m66jXUDKE299MLezXMpMl3WMxOwYnw4VOcW0qMy2LVMmGD915EGePcql+6tpGADA27kAzMypjQdUoV1jcW3JlgDIygx3FM/Cg5f8AuLmVmuKXDXJESc5A/wDemhE0UNPcAZGzdy67Bp4GTIHDZlNUS4cO9tmYQuhkbqdY9xb4UNSXtstxv6VwBYEQWUr80FXvEndyFIIUxBOzCfYzU9UNRyyexxTC7mLIxAJ/Up/mf+Q5VW4oBe3cY6aTMabgz7Z9pqrl+0thnYB1iY9V/VPtlVNQXO0c2chhkDKZJI3j3Sy+wUaHoNZuBkKyGdCROvKZ9vzB50QfmerLaQw+ETz2j/bPGkSzBVu7XFXUESRtrHXQ+ymrYusy5UlLgI0mBHPoJ/4kcqzi9gyD1VABDjcToSPpoPhzBrjZ7LBGAhjBVtR/bp7uBrQT0Xjb/wCYBHDXUjkeU7T1B51o4T0DbuWwt71WjMCxIjpr99PAUO8VtjqLPO4fD3MTa9JYjCk5MMEJt5u8NOGnPj76Fh77WHu4nHNfv3CZ7F33EHUtqR4R7RTGKZrX45rd/s0S4VUJ3c2vTQ6a1o+imwuK/wAM45LSIMVatkEMNWEGSDzqq5PmrWRuqk6HPRf+HcbjPR9vFJaYYe+M6K0KV6gj28Nflr4P/CtmyDdvXUt6aoOXSdPhRf8AB/8AiEj0Jh/RmOXs2tgW7VwjcE6A/eqemcHdL3MjllE6g8ftXncnPyObjVHSuOCgpDUeg8McygPcXTiePDkNKFf/AMTLbXLhLVuyQNIWWHXz/bxuMxDq5UkBl3jQnz520D+Oe5Nu4x3kspjz58aK/jylluyL5Kf9cG5jvTuMxQa3jbucA6E8R9Kx7rsrO9sqqxGhM8PPvqDMILgsh06Dj8vMVxx3QyntAAZWQD8fZ/eKvCKiTlPtssbq5WMAaybg2POT5+9L0rE5MrEQh1A8PdSrL2ZzBmtkkQCRA4a0S3eayoDhSranWVPnWqda0SarRcQ50uEga5DuPCjJinknW6g2UmGA8T56UNgmI0gEcVnb7cPH4UO4rK6qwN0RpBOYDgPPzoUnsGBtGt3wALk5vWDjUnf39BVHt9/8vK2sFbveA9vn2Uk73MvaEZkkwQAHHTzpRLeK1zEdrlEjJofbz+Vb5tZQtHew1zW7rWWMQDqN+fnxrpusji3ckMDz+lFtPbvWwEcOxB7oTWh3EkkW2BtnVkLELE8Pnypb/IDj9m7EkAdVP0OnurtUYIdrYttOgaWFSmSAUfOUclDC2yiwdBoE9m5quETLcxDMZZ0FtR60ywH0q17EJhsPDW1ZzAKg/tBO/wDqNK276Kmdo0gg5jByrIg/6jtTJNxbKJWg7uLmKW6/eH4pXGTirXC0T4CmMvbi1l7r6QY4wxPwFIFuxvBbMKLRW5mgj1VzH602Ce1toxBWGIkbkWmrSVIzCYgE20ypDjNIPEdkP5ql8MLlwplle0Lif0qEuaUNWe5dtqEIVhEQP2V3Dh71gC53j2xSS0eta+ULWpoKOyq4nFgOAhXONQZhg2/gWoqzbBzd3KIVtP0n/wCTSRZbt63dzBQyoLkDQSpB+lGtXjeRmu3AX7mZTGsgo3ximcQlcVLW4DHLOYqNv2sZ5+qa7hu0e7bjMRdiS2sEEBh7GAMdaXy5EgqAAe93dx6rfSrYa69hQXEQ+aSNdgr+2Mp9gpuv9Q7Pa2fQmDUJiFBOYB1Zm4Hh7DmHuo9u76OsXezzrDnuiPd9q8v/ANRvX8OVF4wpMMzbA6N8QDSN+4WVpDL2eupMjg0R1AI9tcvznLbKppI9e/p3D2JtWBOY6QR3ht9I8RWPj/TF+6rRdyrvbZNPDTh9CKxcU91xnPeMmcmwYDWPH1hHOuXsptK5YEsuZQCJ6+07+NUj/HinbyM5uhFrha2ZO5zGNpmrWcQ1u2QrsDGynQ+f4oK6txI+c1IIMppPyrrpVRI9x6CxOH9KYUWbhP4ojRRrM8PbTIvvhbhwuLNwo7DvEzkPAeFeHwb3cPeXE4YMLiSRMwRGvw+9e+9E319NqFk9owPaq3ONgOMivP8A5HH0fbwvxyvBf0r/AIX/AOoWVvejArjTPPek15TH4S9hyUxIZYJGYjTTh55c9T7v0f6Rb0VZfDKsIbmUlePKax/TWBW41x2u9qbjTm1Pv8POlS4eZxl1ehuWCkrWzyuHuvauQxyGIkCFIHDz8OLbhYL2CNNTJ1AmIHMfEacNKSvEF+yXIyA7udoG3LT77jbn4hrNzJvBAW4p1U8uvncaV3ON5RyNB7lrN3gyo5HDlx89OG1AW3mlHMiR3piNOHn4AUdj2hl1AcEagjWQY208Phyob3ArgrbBBEEqm/iOPnagrACS2UbKjgqx/UN431jTzNM2bqKslSqTBBOn8eeFLupBhj3P1LHqjz7tTpvQ7SupzJBMwVBifDhNO42gNDdy2DqB3gJBESfvxoRGQnPmIDd1xuDr79a7bxSSGLDKTBIjTxHPzvRXuK1sBLiIx3DHRiPI1pMrAuQNwB4eBmOqsi79CONHGIu2shvBnGm4135+ygXZtBywcFdkuHQa8P4qoFwPlhQzcHO/gR9KNJmqxwMLgBDjNGizoa5S9q3lEdqVXiogjxnj7alI4AcQGNRmCC5czGACSIMnU0M2xbsXSVLXLltOehZp+Q+NWd2xCXCoOYTBJ3ZjA+tcZg+NuW3JKW31y6yLa8vZVVqii0dV813FOzFs9u5qDtJC68t6Kb+YB1AEJdOcHQ/lQPbNL4cXTbDQMiqiPH6szT9KJiRnDhUE2zdIAXRVk/xWaTdAYe6Li4lSgBTOndkCTk5+FBQoFLOiOhFi4ViJgMvu71Gytcvrh3kg3bZ0Onqx8qB2mdbbhnVksKo11ENw9n1oRCdXsxhHGVizWmykLIBS5m38APfRLKZsKCMpzm5a14aBl36zQzlyAOVcjEtmcNmDBlHDxG9UwLKMPdbMwdMlyYOkMVPzo+BCWnW5auNsytPPusIPPQED30HKbSSrBbnrEjcHZveI9woot9nibtsju3M1sgAEzuPD+KEL4NoAkkq+YKSYAbRtPdrRWAjWHusAA4/pDK6FtCIAkDnlj/jQr91sguK5uZWCatvA39o+tVUsDbZ1ckDsnAB9ZNp8V+RothM9vIxyywst35mdUP0kdK1ehFbZykiRkKjIdNjsT8qi5g7LkyCNd9NvlvVbcBXQ6FJYjiVnvAT76ZuZWRS5DXAVUkCJI9Vv9w0NMEQuqQxJBg9KgIIEkc8x+dFvie8JywBtsBQdjyPhI8fCmAM2WABTKZLeqoEz0P7gdudP+jfSNz0fftm1cTUDIwaAw8eA5cjSYspcW2Q5Lhe6kQyxMrzzTtz2qIwIOpJOpI1UTuY/aZg9TU5RUlTMnR7XD3z6STtGYjtATr3SDxkfAj20lbxFzD4v8NeDMQZJzfpjQid/tWLgcXdwd5Y7RiCMyEztw/1cv3bcq9D2+Fx6mUCnRg0HQcx058q4OTjcH+iylYj6QwAe+13DAKWA7S3sH13EcjWZfw92yNVJUmAgG08NNufy416K9ZRbiqXGVcuVo1DePP51bEWGuoQjW7jQRmHAcQBy5jhuKMOdxSFlHJ5BmIAZW31UEfDw324jgabsXrTOIBZx+jUDQdOHPjzmu+kLeIw98DEJBOodTIuDoefz0mlmQGeyVyV3GUhp308OI3HhXYmpqyLGQoWSDPEQRA5a+zQ7a6QaWa3adm7MZVX9R2H1qYbE5AqvqBJ6gcvOlMdmCouWwpk62yNuQ8eXwoZiLoSUlXzP2puTmzjczznefj1qWLr2hNwHK+pZDw8dvZRiwZgO6UIOh7oHODyn+a4obRSZQkBQePj/AJvietPaYbQW1dGVUZluWyIUeqV8OXOqXkJJyy9qRKXIlTPX50nfRVJFsnYiCZjzy4dKv+Ivo6rDhsoADTI4SD9aHXOBev4GbSBsrIvaLHqTrm5kjjHtqV1HGI7wQi7EAgRPQjjx0+FSlaYGBwTAXEYq2UObnd4BAWNLWjKXbhlm7I5idZLHl76vpZsZk0HY948JY9elCxA7E3bSiBKqdeI4e8mqLZVDmFQt2csAty8oyxpCiee29CtuP+7Ej+ifaS67UTAHK1lpZu7deNP2kUOwii1iCMjRYThoPzF260r9FHezQ4tMzBVGIRdogZaTA72W2cp7JwZESJmB7qYMXLuY6xiEDft2PKqALdxASwCAO0E59TAP3iIoRMjjXsy32IzBGs3QJOu4P/sKphVzYt7R7i3FuW8sbSJjzyqMja53IL4TPbAOhiImPCgsVGIzsDBKPvt5mnVNMYO2KXshddGzFbdzQ/tJDe/vfCrG1h7eMu2s7dm+ZJCHvBvVFUv2bYZrTL3kvNbCLxBEj4zQ8Ur3rWHvllnsxbYRrmTTXrGWskgo7LEhzK3YGpQwbifxB9tGRktXuzYBbN9eDSSrertOzSD4UHPcyu1tjmkX1I4cG+fwqjhHshC0hNjyVjI+Jn/dRowxiBibV4Yoj8xTFzic2xnxHzNVU27UFiBhnTUDdrbfMqeEfOikribfeXPdvLAIO10a67bj4zSahltsQwXKCVzbNpDistBAOpt3WVoV001G9XtamAsrG0+sOKjrVLvMkkoPW5jwq2HYK0HKpJBDz6p4H70/hhpbhtu2rdkYPaAa5QdGHGRRGWXLqyqw0u5ZyCeO3qn4UFge0kqUZXjvRCuNx0B86VW2XDW71tSQSQE8d1PsJpGgBXDbPby5ZUAyf9hPMcDR8NiO8r22IK65V0JHMDnzFBLAkdlmdDqATBdR+n/UvnjVXLgJdtsTcHeDoIlY9YdRxpWrwZG5gseSvZ347OJ5hAeeuq9eBpm/mbDlLRZZOpO433+9ebF5mERlnUrMZCeI/wAp4jhW36MxLKBYuXFUHQAmY5AniOR8a5uXj65QVLxgLhupFrEHtrZ1XXfn0B6caSbsmLMjEld4BbuiI213O/Ct7Gejc/ezL1WdCfvWG6myLltyCy6jTUfY0/FJMWUaFi3bKSAM2+vHl4HrsfGuWrtyy2YrKKMskaADhr8qsy5mBtAM51CRoR0HA6aiqdsHtgE5ZWCI0XX4rPtFXqwVZoo34hM6ASNXWNIHHr48ONBTIuYoJhdQ59UdeY67Gky5tZmPqhpIzbeeYpoE3xldSrpAJ5fA0ji4iNUcCJmMkd7UKm5Hn+KC5HauUdUMSWGs+fDxFFe61vNbvAALoyERp7fD1fdVHL6OxIzD+oJ+PH6ijGxkAJkyQA+4CqCp89JFSr3bTMAtsM3E7T4rzHk1KazWR8r4tGScj3gBBHqjjO21Uvsos2Xmbju91tPVojBFW2nfm3YZzngCW5D20DEkg2xC920IHjr9a0doZDNpVCQwzdnhi2ZCRlBMa896Gc1l7lr1M1tAVYbwyt/NWg27eIygKFREYEGSTB5R76tjUGe62dzDIoLbxl/igtinWBfEsWIFztrcrMSddajIwxq9mXGa64lRJB5fGq3ni42ViSLyQsROhmrqxXFWmMqRjDAgiJiNTpWQSWVD/gVyAtcs3LUaE7tBpIDMikycy5THt/imbym2lkuZCX3tkodf0mPPOl2LC1l7wUXCCNIExHyNGOgoZuEMzFTlz2Uu6cxuenGhtl/D3gLoJtuLlvKeB3ifZV7FyVwRD6kvYcA6xuNORzEeyhAOGBNtSHzWiCNjH80UMEs5clprki1buZHYTARtj4Ag++uOEtZlzZoZrTZhBjgYoVoest0kBkKnkCDoPlRAiuqHc3EMsTqHHDwiD7aJgmFXtbb2j/UuaIdsrjbz1pe8FyLcAADCQF1CkbjpVwrFLbKGCv6s8WG48ePtorW7bpm0XtAGS2JjMNxPnhW9AIiAAN57w8OIo9ruqSykr2ZcQfXXl7KF3m0IIkkgAxrxotnvqLaGHB7S1HPiPtTWEaYq1oBwtxVQZgi5Tct8G8VPSqs3rtibgZGyi6tvTMkjK48+NBsXFGWNh3rY4Hmp18+2iZZVRbYEwWtNvm5ofPzqdAOQbN25av8AquJzLrHJxz69JqKCrtbuQq6HMP0sdiOhqllg6dkmYOP6PHMOKnpy66eHbT52t22KDKCUzbnQyp8etExXKbOdQ6hlaDB1HXqp89W8LcRSpcoEQ6M59Rv2mP0mNDtSwcgoRAYT2e/ttnTr54dtsS65AG0KAXNAR+w9eRrSVmZ6rBekrFxuxxBEEbNup5MePQ0P0n6PRc11GDAwp10Ya6Hr1rEtNbLrqeziFdtxzV449fCtTC4y2LIS6O0TbjO2s9a43BxdxN2xTMa+pF6UGiiNRB6T160N0TEjSBeGzEwG6H/N86079rKxa2rMHgJO0cQaznRQYuKEJgLJmY0Cn710RnaF/aALdKwrSjLwC/ET8quVZYuI0SxJI2YTrH24Ua7a7QKbphgYLMdfAn67c6VcNZlGUFSYKtoZ8J36/GqKmHY9hjbxCXEz6nfLvE6QD63hoaqbNyzLdotxGE5x3g3GSN/buKUbvKpUAOP19TtI4HrtVrWIdslt1JkxHqk/Y9aXqxaClGcZrAOXcqdSDzHTqK7UuL2kvhgCOshhPhseo3qUoAF1mP4qWMhbaT0jb4ChY4ReuakkaSeg0qVKpEcbdAExKAmO3VPYKWuuUtuo2zqfcYHzNdqVo/8ARfQt4/mnQTcu22J8SdqP6StC21587swxaCWP+qpUpHtDegLw/wC1uHU/9zxPNTS909+6BoM6t7YNSpVI6MihutlYAgd8MIGx1o99mR7tsOYt3gynjPP41KlFjFLjlLuZQJzLPxH0plwP+l3740YX8wA2GrD6CpUoSMAuXWRHtrsl+UPFaO1oBb6qzAIUIg7Zt6lSsABiWktbAAAytI3JPH41QGHOXukZXBXcHfSpUpgh8SMtx8vdm2t/Tgx5dKJeH5F5p1NpcRsBD5lH1rtSkYJA8cv9C9mJa4iuRwmQK7jlFsYe6vrYi3mf/VJ1HXSpUreGOK3brZe4BmvK2cjmswR10rg/OGEdyZxBYXI0mDAPjUqUUY5275u9DdqCrz+qDofHrTeEuu1qxdYy1y41puUADXxqVKWQoz6PvObjWiZRlAIPgDRbtq2QZRT3QdalSuZ/5BQC+MtkON4kjn0PSlL9i2FupBPYpbKEnWCBp4VKlVhsHotij+Du/lajskaG19Yajw1qYoZMUbQJKplidTqJqVKshguAJdmUyCid1gTK6xUqVKlLZNn/2Q==')`,
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
              Explore Agricultural Fields
            </Title>
            <Text
              style={{
                fontSize: "14px",
                color: "#FFFFFF",
                display: "block",
                marginBottom: "15px",
              }}
            >
              Search for agricultural lands in various districts
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

      {/* Agriculture fields display */}
      <Row gutter={16}>
        {loading ? (
          <Col span={24} style={{ textAlign: "center", paddingTop: "50px" }}>
            <Spin size="large" />
          </Col>
        ) : (
          filteredData.map((item) => (
            <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
              <Card
                hoverable
                onClick={() => handleCardClick(item._id)}
                cover={
                  <img
                    alt="field"
                    src={item.landDetails.images[0]}
                    style={{
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  />
                }
                extra={
                  <Tooltip title="Rate this field">
                    <StarFilled
                      style={{
                        fontSize: "20px",
                        color: "#FFD700",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                }
                style={{ width: "100%" }}
              >
                <Space direction="vertical" size="small">
                  <Title level={5} style={{ margin: 0 }}>
                    {item.landDetails.landType}
                  </Title>
                  <div>
                    <DollarOutlined
                      style={{ color: "#52c41a", marginRight: 4 }}
                    />
                    <Text strong>Price:</Text> ${item.landDetails.price} per
                    acre
                  </div>
                  <div>
                    <EnvironmentOutlined
                      style={{ color: "#fa8c16", marginRight: 4 }}
                    />
                    <Text strong>District:</Text> {item.address.district}
                  </div>
                </Space>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default BuyersAgriculture;
