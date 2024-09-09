
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { Card, Spin, Typography, Row, Col, Image, Carousel } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles by default
import { Card, Spin, Typography, Col, Row, Image, Carousel, Divider } from 'antd';
import { UserOutlined, HomeOutlined, BankOutlined, EnvironmentOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;

const PropertyDel= () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenData,setTokenData]=useState(localStorage.getItem(`token${localStorage.getItem("role")}`))
    useEffect(() => {
        fetchPropertyDetail();
    }, [id]);

    const fetchPropertyDetail = async () => {
        try {
            const response = await axios.get(`http://172.17.15.53:3000/property/getallprops`, {
                headers: {
                    Authorization: `Bearer ${tokenData}`, // Replace with your actual token
                },
            });
            setProperty(response.data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching property detail:", error);
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

    return (
        <div style={{ padding: 20 }}>
            {property && (
                <>
                    <Title level={2}>{property.title}</Title>
                    {property?.images?.length > 0 && renderCarousel(property?.images)}
                    <Card title="Property Details" style={{ marginTop: 20 }}>
                        <Text><strong>Price:</strong> {property?.price || 'N/A'}</Text><br />
                        <Text><strong>Type:</strong> {property?.type || 'N/A'}</Text><br />
                        <Text><strong>Description:</strong> {property?.description || 'N/A'}</Text>
                    </Card>
                    <Card title="Address" style={{ marginTop: 20 }}>
                        <Text><strong>Pin Code:</strong> {property?.address?.pinCode || 'N/A'}</Text><br />
                        <Text><strong>Country:</strong> {property?.address?.country || 'N/A'}</Text><br />
                        <Text><strong>State:</strong> {property?.address?.state || 'N/A'}</Text><br />
                        <Text><strong>District:</strong> {property?.address?.district || 'N/A'}</Text><br />
                        <Text><strong>Mandal:</strong> {property?.address?.mandal || 'N/A'}</Text><br />
                        <Text><strong>Village:</strong> {property?.address?.village || 'N/A'}</Text>
                    </Card>
                    <Card title="Amenities" style={{ marginBottom: 20 }}>
                        <Text><strong>Bore Well:</strong> {property?.amenities?.boreWell ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</Text><br />
                        <Text><strong>Electricity:</strong> {property?.amenities?.electricity ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</Text><br />
                        <Text><strong>Distance from Road:</strong> {property?.amenities?.distanceFromRoad || 'N/A'}</Text><br />
                        <Text><strong>Storage Facility:</strong> {property?.amenities?.storageFacility ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</Text>
                    </Card>

                    {/* Add more sections as needed */}
                </>
            )}
        </div>
    );
};

export default PropertyDel;







