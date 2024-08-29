import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Residential from "./Pages/Residential/Residential";
import Agricultural from "./Pages/Agricultural/Agriculture";
import Layout from "./Pages/Layout/Layout";
import Commericial from "./Pages/Commericial/Commericial";
//import AddProperty from "./Pages/Agricultural/AddProperty";
import Dashboard from "./Pages/Dashboard";
import Login from "./Authentication/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="agricultural" element={<Agricultural />} />
        <Route path="residental" element={<Residential />} />
        <Route path="layout" element={<Layout />} />
        <Route path="commericial" element={<Commericial />} />
      </Routes>
    </BrowserRouter>
  );
}
