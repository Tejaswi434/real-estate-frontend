import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Design from './Design'; 
import Seller from './Seller'; 
import Buyer from './Buyer';
import Agent from './Agent';
import Admin from './Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Design />}>
          <Route path="seller" element={<Seller />} />
          <Route path="buyer" element={<Buyer />} />
          <Route path="agent" element={<Agent />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
