import React, { useState, useEffect } from "react";
import {
  Form,
  Card,
  notification,
  Modal,
  Button,
  Col,
  Divider,
  Row,
  Rate,
} from "antd";
import {
  CloseOutlined,
  StarFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  EditFilled,
} from "@ant-design/icons";
import axios from "axios";
import "./Residential.css";
import OwnerDetails from "./OwnerDetails";
import FlatDetails from "./FlatDetails";
import Amenities from "./Amenities";
import { Carousel } from "antd";
import Address from "./Address";
import Rating from "./Rating";

export default function Residential({ path }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [token,setToken]=useState(localStorage.getItem(`token${localStorage.getItem("role")}`))
  const [isEnabled, setIsEnabled] = useState(false);
  const [propId, setPropId] = useState(null);
  const [rating, setrating] = useState(0);
  const [token, setToken] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
 
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
  useEffect(() => {
    console.log("I am from useeffect path", path);

    const fetchProducts = async () => {
      console.log("Hello");
      console.log("from useeffect", products);
      try {
        if (path != "getting") {
          path = "getallresidentials";
        }
        console.log("Hello from residential get");
        const response = await axios.get(
          `http://172.17.15.53:3000/residential/${path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
        console.log(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isFormVisible]);
  const handleRatingChange = async (value, pid) => {
    console.log("i am from rating", value, pid);
    try {
      const response = await axios.post(
        "http://172.17.15.53:3000/property/insertproprating",
        {
          rating: value,
          propertyId: pid,
          propertyType: "Residential",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
  };

  const handleCardClick = (product) => {
    console.log("Hello from card");
    console.log("product clicked", product);
    setSelectedProduct(product);
    setIsModalVisible(true);
    console.log("Product:", product);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {!isFormVisible && (
        <div
          className="category-cards-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <Col>
                <Card
                  title={product.propertyType}
                  hoverable
                  style={{ width: 310 }}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <img
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                        alt="property"
                        src={product.propPhotos["0"]}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>{product.owner?.ownerName}</Col>
                    <Col span={12}>{product.owner?.contact}</Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={14}>
                      <span style={{ wordBreak: "break-word" }}>
                        {product.owner?.ownerEmail}
                      </span>
                    </Col>
                    <Col span={10}>
                      <button
                        style={{
                          background:
                            "linear-gradient(135deg, #6253e1, #04befe)",
                          color: "white",
                          border: "none",
                          borderRadius: "7px",
                          marginTop: "5%",
                        }}
                        onClick={() => handleCardClick(product)}
                      >
                        View More
                      </button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ textAlign: "center" }}>
                      <Rate
                        allowHalf
                        defaultValue={product.rating}
                        disabled={!isEnabled}
                        style={{
                          marginTop: "5%",
                          color: getStarColor(product.rating),
                        }}
                        onChange={(value) => setrating(value)}
                      />
                      {!isEnabled ? (
                        <span
                          onClick={() => {
                            setIsEnabled(!isEnabled);
                            setPropId(product._id);
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
                        propId === product._id && (
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
                                  product._id
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
                  </Row>
                </Card>
              </Col>
            ))
          )}
        </div>
      )}

      {selectedProduct && (
        <Modal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          <h3>{selectedProduct.title}</h3>
          <Row gutter={16}>
            <Col span={24}>
              {" "}
              <Carousel arrows>
                {selectedProduct.propPhotos.map((photo, index) => (
                  <div key={index}>
                    <img
                      alt={`Property Photo ${index + 1}`}
                      src={photo}
                      style={{ width: "100%", height: "300px" }}
                    />
                  </div>
                ))}
              </Carousel>
              <strong>Apartment Description:</strong>{" "}
              {selectedProduct.propertyDetails.propDesc
                ? selectedProduct.propertyDetails.propDesc
                : "Not provided"}
              <br></br>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Card
                style={{
                  marginBottom: "20px",
                  border: "1px solid #808080",
                  width: "100%",
                  height: "93%",
                }}
                title="Amenities"
              >
                {/* <Row> */}
                <Col span={24}>
                  <p>
                    {" "}
                    <strong>Water Facility:</strong>{" "}
                    {selectedProduct.amenities?.waterFacility
                      ? "Available"
                      : "Not Available"}
                  </p>
                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Electricity Facility:</strong>{" "}
                    {selectedProduct.amenities?.electricityFacility
                      ? "Available"
                      : "Not Available"}
                  </p>
                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Elevator:</strong>{" "}
                    {selectedProduct.amenities?.elevator
                      ? "Available"
                      : "Not Available"}
                  </p>
                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Watchman:</strong>
                    {selectedProduct.amenities?.watchman
                      ? "Available"
                      : "Not Available"}
                  </p>

                  {/* </li>
                      <li> */}
                  <p>
                    <strong>CCTV:</strong>
                    {selectedProduct.amenities?.cctv
                      ? "Available"
                      : "Not Available"}
                  </p>

                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Gym Facility:</strong>{" "}
                    {selectedProduct.amenities?.gymFacility
                      ? "Available"
                      : "Not Available"}
                  </p>
                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Medical Facilities Nearby:</strong>
                    {selectedProduct.amenities?.medical
                      ? selectedProduct.amenities.medical
                      : "not given"}
                  </p>

                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Religious Places Nearby:</strong>
                    {selectedProduct.amenities?.religious
                      ? selectedProduct.amenities.religious
                      : "not given"}
                  </p>

                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Educational Institutes Nearby:</strong>{" "}
                    {selectedProduct.amenities?.educational
                      ? selectedProduct.amenities?.educational
                      : "not given"}
                    Km
                  </p>

                  {/* </li>
                      <li> */}
                  <p>
                    <strong>Grocery Stores Nearby:</strong>{" "}
                    {selectedProduct.amenities?.grocery
                      ? selectedProduct.amenities.grocery
                      : "not given"}{" "}
                    Km
                  </p>

                  {/* </li>

                    </ul> */}
                </Col>
                {/* </Row> */}
              </Card>
            </Col>
            <Col span={12}>
              <Row gutter={16}>
                <Col span={24}>
                  <Card
                    style={{
                      marginBottom: "20px",
                      border: "1px solid #808080",
                      width: "100%",
                    }}
                    title="Owner Details:"
                  >
                    <Row>
                      <Col span={24}>
                        {selectedProduct.owner?.ownerName ? (
                          <span>
                            <strong>Name:</strong>{" "}
                            {selectedProduct.owner.ownerName}
                          </span>
                        ) : (
                          "not entered"
                        )}
                        <br></br>
                        {selectedProduct.owner?.ownerEmail ? (
                          <span>
                            <strong>Email:</strong>
                            {selectedProduct.owner.ownerEmail}
                          </span>
                        ) : (
                          "not entered"
                        )}
                        <br></br>
                        {selectedProduct.owner?.contact ? (
                          <span>
                            <strong>Contact:</strong>
                            {selectedProduct.owner.contact}
                          </span>
                        ) : (
                          "not entered"
                        )}
                        <br></br>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Card
                    style={{
                      marginBottom: "20px",
                      border: "1px solid #808080",
                      width: "100%",
                    }}
                    title="Property Details:"
                  >
                    <Col span={24}>
                      <strong>Name:</strong>{" "}
                      {selectedProduct.propertyDetails.apartmentName}
                      <br></br>
                      <strong>Number:</strong>{" "}
                      {selectedProduct.propertyDetails.flatNumber}
                      <br></br>
                      <strong>Layout:</strong>{" "}
                      {selectedProduct.propertyDetails.apartmentLayout}
                      <br></br>
                      <strong>Size:</strong>{" "}
                      {selectedProduct.propertyDetails.flatSize}
                      <br></br>
                      <strong>Price:</strong>
                      {selectedProduct.propertyDetails.totalCost}
                      <br></br>
                      <strong>Facing:</strong>{" "}
                      {selectedProduct.propertyDetails.flatFacing}
                      <br></br>
                      <strong>Furniture:</strong>{" "}
                      {selectedProduct.propertyDetails.furnitured}
                      <br></br>
                    </Col>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Card
                style={{
                  marginBottom: "20px",
                  border: "1px solid #808080",
                  width: "100%",
                }}
                title="Address :"
              >
                {/* <Row> */}
                <Col span={24}>
                  <strong>Country: </strong>
                  {selectedProduct.address?.country &&
                    selectedProduct.address?.country}
                  {/* </li>
                      <li> */}
                  <strong style={{ marginLeft: "20px" }}>state: </strong>
                  {selectedProduct.address?.state &&
                    selectedProduct.address?.state}
                  {/* </li>
                      <li> */}
                  <strong style={{ marginLeft: "20px" }}>district: </strong>
                  {selectedProduct.address?.district &&
                    selectedProduct.address?.district}
                  {/* </li>
                      <li> */}
                  <strong style={{ marginLeft: "20px" }}>Mandal: </strong>
                  {selectedProduct.address?.district &&
                    selectedProduct.address?.mandal}
                  {/* </li>
                      <li> */}
                  <strong style={{ marginLeft: "20px" }}>Village: </strong>
                  {selectedProduct.address?.district &&
                    selectedProduct.address?.village}
                  {/* </li>
                    </ul> */}
                </Col>
                {/* </Row> */}
              </Card>
            </Col>
            <Col span={24}></Col>
            <Col span={24}></Col>
          </Row>
        </Modal>
      )}
    </>
  );
}
