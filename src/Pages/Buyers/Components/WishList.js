


import React from 'react';
import { HeartFilled } from '@ant-design/icons';

// Sample data directly included in the component for demonstration
const wishlistData = [
  {
    "id": 1,
    "title": "Bhogapuram Villa",
    "address": "Near main road, Bhogapuram",
    "pin_code": "531162",
    "village_name": "Bhogapuram",
    "image_url": "https://plus.unsplash.com/premium_photo-1680100256112-2e1231d9d0df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZsYXR8ZW58MHx8MHx8fDA%3D",
    "price": 10000,
    "property_type": "villa",
    "budget": "10 lakhs",
    "seller":"Sneha"
  },
];

const Wishlist = () => {
 
  return (
    <>
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h2 style={{ color: '#003a8c', marginBottom: '20px' }}> Wishlist</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {wishlistData.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              width: '300px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              ':hover': { transform: 'scale(1.02)' }
            }}
          >
            <HeartFilled style={{ color: 'red', fontSize: '24px', position: 'absolute', top: '10px', right: '10px' }} />
            <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</h3>
              <p style={{ margin: '0', color: '#888' }}>{item.address}, {item.pin_code}</p>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{item.price} - {item.budget}</p>
              <p style={{ margin: '0', color: '#888' }}>Seller: {item.seller}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default Wishlist;