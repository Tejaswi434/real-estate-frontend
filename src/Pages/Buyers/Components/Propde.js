import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Typography, Col, Row, Image, Carousel } from 'antd';
import { UserOutlined, HomeOutlined, BankOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles by default

const { Title, Text } = Typography;

const Propde = () => {
  const { type } = useParams();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use for navigation
 const [tokenData,settokenData]=useState(localStorage.getItem(`token${localStorage.getItem("role")}`))
  useEffect(() => {
    fetchPropertyDetails();
  }, [type]);
// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2Y2Y3MGJiNGY1OTI2NmJkMDM2NzkxZiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwaG9uZU51bWJlciI6Ijk5OTk4ODg3NzYiLCJyb2xlIjoxfSwiaWF0IjoxNzI1NDQwODYwLCJleHAiOjE3MjU0NTg4NjB9.MmU88RNDAv9L8f3F8UfFf64KzQZgXdz4AwHOHfoxOcw";
  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(
        `http://172.17.15.53:3000/property/getallprops`,
        {
          headers: {
            Authorization: `Bearer ${tokenData}`, // Replace with your actual token
          },
        }
      );
      setPropertyDetails(response.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderCarousel = (images) => (
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <Image src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        </div>
      ))}
    </Carousel>
  );

  const handleCardClick = (id) => {
    navigate(`/details/${type}/${id}`); // Navigate to the detailed property view
  };

  const renderDetails = () => {
    if (type === 'Agricultural') {
      return propertyDetails.map((property, index) => (
        <Col span={8} key={index}>
          <Card
            onClick={() => handleCardClick(property._id)}
            title={<Title level={4}>Agricultural Property</Title>}
            extra={<UserOutlined />}
            style={{ marginBottom: 20, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            hoverable
          >
            {property?.landDetails?.images?.length > 0 && renderCarousel(property?.landDetails?.images)}
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Text><strong>Price:</strong> {property?.landDetails?.price || 'N/A'}</Text><br />
                <Text><strong>District:</strong> {property?.address?.district || 'N/A'}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      ));
    } else if (type === 'Residential') {
      return propertyDetails.map((property, index) => (
        <Col span={8} key={index}>
          <Card
            onClick={() => handleCardClick(property._id)}
            title={<Title level={4}>Residential Property</Title>}
            extra={<HomeOutlined />}
            style={{ marginBottom: 20, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            hoverable
          >
            {property?.propertyDetails?.images?.length > 0 && renderCarousel(property?.propertyDetails?.images)}
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Text><strong>Price:</strong> {property?.propertyDetails?.price || 'N/A'}</Text><br />
                <Text><strong>District:</strong> {property?.address?.district || 'N/A'}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      ));
    } else if (type === 'Commercial') {
      return propertyDetails.map((property, index) => (
        <Col span={8} key={index}>
          <Card
            onClick={() => handleCardClick(property._id)}
            title={<Title level={4}>Commercial Property</Title>}
            extra={<BankOutlined />}
            style={{ marginBottom: 20, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            hoverable
          >
            {property?.commercialDetails?.images?.length > 0 && renderCarousel(property?.commercialDetails?.images)}
            <Row style={{ marginTop: 20 }}>
              <Col span={24}>
                <Text><strong>Price:</strong> {property?.commercialDetails?.price || 'N/A'}</Text><br />
                <Text><strong>District:</strong> {property?.address?.district || 'N/A'}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      ));
    }
  };

  return (
    <Row gutter={16}>
      {renderDetails()}
    </Row>
  );
};

export default Propde;
