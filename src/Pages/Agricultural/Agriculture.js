import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";

const Agriculture = () => {
  const [data, setData] = useState([]);
  const [tokenData, setTokenData] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.17.15.53:3000/property/getProperties",
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        console.log(response.data, "responsedata");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <Row gutter={16}>
        {data.map((item, index) => {
          const { ownerDetails, landDetails, address, amenities } = item;

          return (
            <Col span={12} key={index}>
              <Card
                title={landDetails.title}
                bordered={false}
                style={{ marginBottom: "20px", border: "1px solid black" }}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <p>
                    <strong>Owner Name:</strong> {ownerDetails.ownerName}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {ownerDetails.phoneNumber}
                  </p>
                </div>
                <p>
                  <strong>Survey Number:</strong> {landDetails.surveyNumber}
                </p>
                <div style={{ display: "flex", gap: "20px" }}>
                  <p>
                    <strong>Size:</strong> {landDetails.size} acres
                  </p>
                  <p>
                    <strong>Price:</strong> {landDetails.price} per acre
                  </p>
                  <p>
                    <strong>Total Price:</strong> {landDetails.totalPrice}
                  </p>
                </div>
                <Row gutter={16}>
                  <Col span={12}>
                    <p>
                      <strong>Land Type:</strong> {landDetails.landType}
                    </p>
                  </Col>
                  <Col span={12}>
                    <div>
                      <strong>Crops can be cultivated :</strong>
                      <ul>
                        {landDetails.crops.map((crop, cropIndex) => (
                          <li key={cropIndex}>{crop}</li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
                <div>
                  <strong>Images:</strong>
                  {landDetails.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`Land Image ${imageIndex + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "10px",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <p>
                    <strong>Country:</strong> {address.country}
                  </p>
                  <p>
                    <strong>State:</strong> {address.state}
                  </p>
                  <p>
                    <strong>District:</strong> {address.district}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <p>
                    <strong>Mandal:</strong> {address.mandal}
                  </p>
                  <p>
                    <strong>Village:</strong> {address.village}
                  </p>
                </div>
                <div>
                  <strong>Amenities:</strong>
                  <ul>
                    {Object.entries(amenities).map(([key, value]) => (
                      <li key={key}>
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:{" "}
                        {value ? "Yes" : "No"}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Agriculture;
