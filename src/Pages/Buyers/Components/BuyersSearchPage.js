import React, { useState } from "react";
import { Input, Row, Col, Card, Typography, Button, Tag } from "antd";
import {
  AudioOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Define a banner ad section with continuous scrolling animation
const bannerWrapperStyle = css`
  margin: 20px auto;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
`;

const adScrollStyle = css`
 display: flex;
 animation: scroll 30s linear infinite;
 white-space: nowrap;

 @keyframes scroll {
 0% {
 transform: translate0%);
 }
 100% {
 transform: translate-50%);
 }
 }
`;

const adCardStyle = css`
  display: inline-block;
  margin: 0 15px;
  width: 250px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: #4caf50;
  }

  .new-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff4081;
    color: white;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 15px;
    font-weight: bold;
  }

  .ant-card-body {
    padding: 10px;
    text-align: center;
    background: rgba(192, 192, 192, 0.5);
  }
`;

const advertisements = [
  {
    title: "Explore Popular Localities ",
    // description: "Get the best mortgage rates tailored to your needs.",
    image: "https://static.99acres.com/universalapp/img/banner.png",
  },
  {
    title: "Exclusive Offer",
    // description: "Protect your investment with top-notch property insurance.",
    image:
      "https://photos.zillowstatic.com/fp/460249bd49cc909b020e3fac2963847f-p_e.webp",
  },
  {
    title: "Real Estate Consulting",
    // description: "Get professional advice on buying and selling properties.",
    image:
      "https://delivery.digitalassets.zillowgroup.com/api/public/content/ZG_Brand_CHI_0822_LvlUp_BackExt_Tour_0291_1280x4502x_CMS_Large.webp",
  },
  {
    title: "New Launch",
    // description: "Find the best home loan options that fit your budget.",
    image:
      "https://photos.zillowstatic.com/fp/b357f279571664543d4f4ce60bbec15f-p_e.webp",
  },
  {
    title: "Home Loans",
    // description: "Find the best home loan options that fit your budget.",
    image:
      "https://cdn.staticmb.com/magicservicestatic/images/revamp/mbhome-web/property-services/webp/graphic-home-loans.webp",
  },
  {
    title: "Top Rated",
    // description: "Find the best home loan options that fit your budget.",
    image:
      "https://www.zillowstatic.com/bedrock/app/uploads/sites/48/2024/06/graph.svg",
  },
  // Repeating the same set of ads for seamless scrolling
  {
    title: "Explore Popular Localities",
    // description: "Get the best Localities by search",
    image: "https://static.99acres.com/universalapp/img/banner.png",
  },
  {
    title: "Exclusive Offer",
    // description: "Protect your investment with top-notch property insurance.",
    image:
      "https://photos.zillowstatic.com/fp/460249bd49cc909b020e3fac2963847f-p_e.webp",
  },
  {
    title: "Consulting",
    // description: "Get professional advice on buying and selling properties.",
    image:
      "https://delivery.digitalassets.zillowgroup.com/api/public/content/ZG_Brand_CHI_0822_LvlUp_BackExt_Tour_0291_1280x4502x_CMS_Large.webp",
  },
  {
    title: "New Launch",
    // description: "Find the best home loan options that fit your budget.",
    image:
      "https://photos.zillowstatic.com/fp/b357f279571664543d4f4ce60bbec15f-p_e.webp",
  },
  {
    title: "Home Loans",
    // description: "Find the best home loan options that fit your budget.",
    image:
      "https://cdn.staticmb.com/magicservicestatic/images/revamp/mbhome-web/property-services/webp/graphic-home-loans.webp",
  },
  {
    title: "Top Rated",
    // description: "Find the best home loan options that fit your budget.",
    image:
      "https://www.zillowstatic.com/bedrock/app/uploads/sites/48/2024/06/graph.svg",
  },
];

useEffect(() => {
  console.log("Hello from buyer search page");
});

const AdvertisementBanner = () => (
  <div className={bannerWrapperStyle}>
    <div className={adScrollStyle}>
      {advertisements.map((ad, index) => (
        <Card
          key={index}
          className={adCardStyle}
          cover={
            <img
              alt={ad.title}
              src={ad.image}
              style={{ height: "120px", objectFit: "cover" }}
            />
          }
        >
          <Tag className="new-tag">New</Tag>
          <Title level={5}>{ad.title}</Title>
          <Text>{ad.description}</Text>
        </Card>
      ))}
    </div>
  </div>
);
// Define card styles with hover effect
const cardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  height: "200px",
  width: "100%",
  position: "relative",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  backgroundColor: "#ffffff",
  border: "2px solid transparent",
};

const hoverCardStyle = css`
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: #4caf50;
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

const BuyersSearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const properties = [
    {
      type: "Residential",
      image:
        "https://newprojects.99acres.com/projects/godrej_properties/godrej_bengal_lamps/images/4t6jgoj_1718971378_499749075_large.jpg",
      description: "Find apartments, villas.",
    },
    {
      type: "Agricultural",
      image: "https://static.99acres.com/universalhp/img/d_hp_pl_xl.webp",
      description: "Explore various plots and fields",
    },
    {
      type: "Commercial",
      image:
        "https://photos.zillowstatic.com/fp/fd47743e31642f09e65dbc458d313a26-p_e.webp",
      description: "Discover offices, retail spaces",
    },
  ];

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  const onSearch = (value) => {
    const filtered = properties.filter((property) =>
      property.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleExploreMore = (type) => {
    navigate(`/details/${type}`);
  };

  return (
    <div style={{ padding: "10px 0" }}>
      {/* Search bar area */}
      <Row justify="center" style={{ marginBottom: "60px" }}>
        <Col>
          <Card
            bordered={false}
            style={{
              width: "600px",
              backgroundImage: `url('https://bodaq.com/wp-content/uploads/2023/04/Bodaq-blog-post-pics-2-15-1024x576.jpg')`,
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
              Agricultural, and Commercial
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Advertisement Banner */}
      <AdvertisementBanner />

      {/* Property cards area */}
      <Row justify="center" gutter={[16, 16]}>
        {(filteredProperties.length > 0 ? filteredProperties : properties).map(
          (property, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card style={cardStyle} className={hoverCardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <img
                    src={property.image}
                    alt={property.type}
                    style={imageStyle}
                  />
                  <div style={{ flex: 1 }}>
                    <Title level={5}>{property.type}</Title>
                    <Text>{property.description}</Text>
                    <Button
                      type="primary"
                      className={gradientButtonStyle}
                      style={buttonStyle}
                      onClick={() => handleExploreMore(property.type)}
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

export default BuyersSearchPage;
