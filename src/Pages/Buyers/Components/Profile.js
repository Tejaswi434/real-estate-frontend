import React, { useEffect, useState } from 'react';
import { Card, Typography, Divider } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;
const { Text, Title } = Typography;

function Profile() {
 const [userData, setUserData] = useState([]);
 const [token , setToken]= useState(localStorage.getItem(`token${localStorage.getItem("role")}`))

 useEffect(() => {

setToken('')
 fetchUserData();
 }, []);

 useEffect(() => {
 // Call fetchUserData only when the token is set
 if (token) {
 fetchUserData();
 }
 }, [token]);

 const fetchUserData = async () => {
 try {
 const response = await axios.get('http://172.17.15.53:3000/users/getprofile', {
 headers: {
 "Authorization" : `Bearer ${token}`
 }
 });
 
 const dumydata = response.data;
 console.log(dumydata);
 setUserData([dumydata]);
 
 } catch (error) {
 if (error.response && error.response.status === 401) {
 console.log('Unauthorized access - perhaps check your token and ensure it is still valid.');
 }
 }
 };
 

 return (
 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
 {userData.length > 0 ? (
 userData.map((user, index) => (
 console.log(user,'userdata'),
 
 <Card
 key={index}
 style={{ width: 350, borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
 cover={
 <img
 alt={`${user.FirstName} ${user.LastName}`}
 src={user.profilePicture? user.profilePicture: 'https://via.placeholder.com/150'} 
 style={{ width: '30%', height: 'auto', objectFit: 'cover', margin: 'auto',marginTop: "24px",borderRadius:"52px" }}
 />
 }
 
 actions={[
 <div key="email">
 <MailOutlined style={{ marginRight: 4 }} />
 <Text>{user.email}</Text>
 </div>,
 <div key="phone">
 <PhoneOutlined style={{ marginRight: 8 }} />
 <Text>{user.phoneNumber}</Text>
 </div>
 ]}
 >
 <Meta
 title={<Title level={4}>{`${user.firstName} ${user.lastName}`}</Title>}
 description={(
 <div>
 <Divider />
 <div style={{ marginBottom: '10px' }}>
 <Text strong>Pincode: </Text>{user.pinCode}
 </div>
 <div style={{ marginBottom: '10px' }}>
 <Text strong>City: </Text>{user.city}
 </div>
 <div style={{ marginBottom: '10px' }}>
 <Text strong>State: </Text> {user.city ==''?"":"Andhra Pradesh"}
 </div>
 <div style={{ marginBottom: '10px' }}>
 <Text strong>Country: </Text>{user.Country ==''?"":"India"}
 </div>
 </div>
 )}
 />
 </Card>
 ))
 ) : (
 <div>No user data available</div>
 )}
 </div>
 );
}

export default Profile;