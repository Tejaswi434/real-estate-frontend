// import React, { useState, useEffect } from "react";
// import { Card, Typography, Row, Col } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ResidentialDetails from "./ResidentialDetails";

// const { Title, Text } = Typography;

// export default function BuyersResidential() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [tokenData, setTokenData] = useState(localStorage.getItem("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "http://172.17.15.53:3000/residential/getallresidentials",
//           {
//             headers: {
//               Authorization: `Bearer ${tokenData}`,
//             },
//           }
//         );
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [tokenData]);

//   const handleCardClick = (product) => {
//     navigate(`/dashboard/details/${product._id}`);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Row gutter={16}>
//           {products.map((product) => (
//             <Col span={8} key={product.id}>
//               <Card
//                 hoverable
//                 cover={
//                   <img
//                     alt="property"
//                     src={product.propPhotos[0]}
//                     style={{ height: 200, objectFit: "cover" }}
//                   />
//                 }
//                 onClick={() => handleCardClick(product)}
//                 style={{ marginBottom: 20 }}
//               >
//                 <Title level={4}>{product.propertyTitle}</Title>
//                 <Text strong>Owner Name:</Text> {product.owner?.ownerName}
//                 <br />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

export default function BuyersResidential() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState("");
  const [flatSize, setFlatSize] = useState("");

  const [tokenData,settokenData] =useState(localStorage.getItem(`token${localStorage.getItem("role")}`));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://172.17.15.53:3000/residential/getallresidentials",
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filtered = products.filter((product) =>
      product.address?.district.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCardClick = (product) => {
    navigate(`/dashboard/buyers/details/${product._id}`);
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
              backgroundImage: `url('https://photos.zillowstatic.com/fp/323d69ec144e46587d1dba08929892b7-p_e.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Title level={3} style={{ color: "#FFFFFF", marginBottom: "15px" }}>
              <HomeOutlined style={{ marginRight: 8, color: "#1677ff" }} />
              Discover Your Dream Residential
            </Title>
            <Text
              style={{
                fontSize: "14px",
                color: "#FFFFFF",
                display: "block",
                marginBottom: "15px",
              }}
            >
              <EnvironmentOutlined
                style={{ marginRight: 8, color: "#52c41a" }}
              />
              Residential Properties in Various Districts
            </Text>

            {/* Search bar inside the card */}
            <Search
              placeholder="Search by District"
              onSearch={handleSearch}
              enterButton
              style={{ marginTop: "10px", width: "70%" }}
            />
            <div style={{ marginTop: "20px" }}>
              {" "}
              {/* Added margin-top here */}
              <Input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: 120, marginRight: "10px" }}
              />
              <Input
                placeholder="Flat Size"
                value={flatSize}
                onChange={(e) => setFlatSize(e.target.value)}
                style={{ width: 120 }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Products display */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row gutter={16}>
          {filteredProducts.map((product) => (
            <Col span={8} key={product._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt="property"
                    src={product.propPhotos[0]}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                onClick={() => handleCardClick(product)}
                style={{ marginBottom: 20 }}
              >
                <Title level={4}>{product.propertyDetails.apartmentName}</Title>
                <Text strong>Price:</Text> {product.propertyDetails.totalCost}{" "}
                <br />
                <Text strong>Flat Size:</Text>{" "}
                {product.propertyDetails.flatSize} <br />
                <Text strong>District:</Text> {product.address?.district}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
