import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

import Residential from "./Pages/Residential/Residential";
import Agricultural from "./Pages/Agricultural/Agriculture";
import Layout from "./Pages/Layout/Layout";
import Commericial from "./Pages/Commericial/Commericial";
//import AddProperty from "./Pages/Agricultural/AddProperty";
import Login from "./Authentication/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="agricultural" element={<Agricultural />} />
            <Route path="residential" element={<Residential />} />
            <Route path="layout" element={<Layout />} />
            <Route path="commercial" element={<Commericial />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
