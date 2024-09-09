import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  AutoComplete,
} from "antd";
import {
  AudioOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Search } = Input;
const { Title, Text } = Typography;

// Define styles for the gradient button
const gradientButtonStyle = css`
  &.ant-btn-primary:not([disabled]):not(.ant-btn-dangerous) {
    border-width: 0;
    > span {
      position: relative;
    }
    &::before {
      content: "";
      background: linear-gradient(135deg, #6253e1, #04befe);
      position: absolute;
      inset: 0;
      opacity: 1;
      transition: all 0.3s;
      border-radius: inherit;
    }
    &:hover::before {
      opacity: 0;
    }
  }
`;

// Define card styles with hover effect
const cardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  height: "200px",
  width: "300px",
  //   position: "relative",
  transition: "transform 0.3s, box-shadow 0.3s",
  backgroundColor: "#ffffff",
  border: "2px solid #b0bec5",
  marginLeft: "50px",
};

const hoverCardStyle = css`
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "8px",
  marginRight: "10px",
  objectFit: "cover",
};

const buttonStyle = {
  position: "absolute",
  bottom: "10px",
  right: "10px",
};

const SearchPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const properties = [
    {
      type: "Agricultural",
      image: "https://static.99acres.com/universalhp/img/d_hp_pl_xl.webp",
      description:
        "Explore various plots and fields for agricultural purposes.",
    },
    {
      type: "Commercial",
      image:
        "https://photos.zillowstatic.com/fp/fd47743e31642f09e65dbc458d313a26-p_e.webp",
      description: "Discover offices, retail spaces, and warehouses.",
    },
    {
      type: "Residential",
      image:
        "https://newprojects.99acres.com/projects/godrej_properties/godrej_bengal_lamps/images/4t6jgoj_1718971378_499749075_large.jpg",
      description: "Find apartments, villas.",
    },
    {
      type: "Layout",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/10/355843160/WE/GP/XZ/10662066/residential-property.jpg",
      description: "Find Layouts here.",
    },
    // { type: 'Rentals', image: 'https://photos.zillowstatic.com/fp/e2a1bb2d0c50fc366fe80cec63e89340-p_e.webp', description: 'Explore beautiful homes.' },
    // { type: 'Luxury', image: 'https://photos.zillowstatic.com/fp/fd47743e31642f09e65dbc458d313a26-p_e.webp', description: 'Discover Luxury Properties.' },
    // { type: 'Office', image: 'https://photos.zillowstatic.com/fp/fd47743e31642f09e65dbc458d313a26-p_e.webp', description: 'Discover offices, retail spaces, and warehouses.' },
  ];

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const role = parseInt(localStorage.getItem("role"));
  console.log(role);

  const onSearch = (value) => {
    const filtered = properties.filter((property) =>
      property.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleExploreMore = (type) => {
    if (role == 1) {
      if (type == "Agricultural") {
        navigate(`/dashboard/agricultural`);
      }
      if (type == "Commercial") {
        navigate(`/dashboard/commercial`);
      }
      if (type == "Residential") {
        navigate(`/dashboard/residential`);
      }
    } else if (role == 3) {
      if (type == "Agricultural") {
        navigate(`/dashboard/buyers/agriculture`);
      }
      if (type == "Commercial") {
        navigate(`/dashboard/buyers/commercial`);
      }
      if (type == "Residential") {
        navigate(`/dashboard/buyers/residential`);
      }
    }
  };

  const options = properties.map((property) => ({ value: property.type }));

  return (
    <div style={{ padding: "10px 0" }}>
      {/* Search bar area with background image */}
      <Row justify="center" style={{ marginBottom: "60px" }}>
        <Col>
          <Card
            bordered={false}
            style={{
              width: "670px",
              backgroundImage: `url('https://bodaq.com/wp-content/uploads/2023/04/Bodaq-blog-post-pics-2-15-1024x576.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
              textAlign: "center",
              marginTop: "10%",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Title level={3} style={{ color: "#FFFFFF", marginBottom: "15px" }}>
              <HomeOutlined style={{ marginRight: 8, color: "#1677ff" }} />
              Discover Your Dream Property
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
              Residential,{" "}
              <BankOutlined
                style={{ marginLeft: 8, marginRight: 8, color: "#faad14" }}
              />
              Agricultural ,{" "}
              <BankOutlined
                style={{ marginLeft: 8, marginRight: 8, color: "#faad14" }}
              />
              Commercial,{" "}
              <BankOutlined
                style={{ marginLeft: 8, marginRight: 8, color: "#faad14" }}
              />
              Layout
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Property cards area */}
      <Row justify="center" gutter={[16, 16]}>
        {(filteredProperties.length > 0 ? filteredProperties : properties).map(
          (property, index) => (
            <Col key={index}>
              {/* Updated to display 2 cards per row */}
              <Card style={cardStyle} className={hoverCardStyle}>
                <div
                  style={{
                    display: "flex",
                    // justifyContent: "space-between",

                    // alignItems: "left",
                  }}
                >
                  <img
                    src={property.image}
                    alt={property.type}
                    style={imageStyle}
                  />
                  <div>
                    <Title level={5} style={{ color: "#004d40", margin: 0 }}>
                      {property.type}
                    </Title>
                    <Text style={{ color: "#555", fontSize: "12px" }}>
                      {property.description}
                    </Text>
                    <Button
                      className={gradientButtonStyle}
                      type="primary"
                      size="small"
                      style={buttonStyle}
                      onClick={() => handleExploreMore(property.type)} // Handle click
                    >
                      Explore More
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          )
        )}
      </Row>
    </div>
  );
};

export default SearchPage;
