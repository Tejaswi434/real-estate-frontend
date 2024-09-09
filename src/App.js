import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Residential from "./Pages/Agent/Residential/Residential";
import Agricultural from "./Pages/Agent/Agricultural/Agriculture";
import Layout from "./Pages/Agent/Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import CommercialHome from "./Pages/Agent/Commericial/CommercialHome";
import AgriculturalHome from "./Pages/Agent/Agricultural/AgriculturalHome";
import ProfileDetails from "./Pages/ProfileDetails";
import BuyerRequests from "./Pages/Agent/BuyerRequests";
import SellerRequests from "./Pages/Agent/SellerRequests";
import LandingPage from "./Authentication/LandingPage";
// import LandingPage from "./Authentication/NewLanding";
import Profile from "./Pages/Buyers/Components/Profile";
import FinancialAssistant from "./Pages/Buyers/Components/FinancialAssistant";
import Wishlist from "./Pages/Buyers/Components/WishList";
import Appointments from "./Pages/Agent/AppointmentTabs";
import SearchPage from "./Pages/Buyers/Components/SearchPage";
import BuyersResidential from "./Pages/Buyers/Components/BuyersResidential";
import BuyersResidentialDetails from "./Pages/Buyers/Components/BuyersResidentialDetails";
import BuyersAgricultureDetails from "./Pages/Buyers/Components/BuyersAgricultureDetails";
import GetCommercialDetail from "./Pages/Buyers/Components/BuyersCommercialDetails";
import BuyersAgriculture from "./Pages/Buyers/Components/BuyersAgriculture";
import GetCommercial from "./Pages/Buyers/Components/BuyersCommercial";
import MyProperties from "./Pages/Agent/MyProperties";

// import CommercialForm from "./Pages/Agent/Commericial/CommercialForm";

// import Login from "./Pages/Buyers/Components/Logins"

export default function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<SearchPage />} />
          {/* <Route path="searchpage" element={<SearchPage />} /> */}
            <Route path="agricultural" element={<AgriculturalHome />} />
            <Route path="residential" element={<Residential />} />
            <Route path="layout" element={<Layout />} />
            <Route path="commercial" element={<CommercialHome />} />
            {/* <Route path="commercialform" element={<CommercialForm />} /> */}
            <Route path="myproperties" element={<MyProperties />} />
            <Route path="buyers/details/:id" element={<BuyersResidentialDetails />} />
            <Route path="buyers/details2/:id" element={<BuyersAgricultureDetails />} />
            <Route path="buyers/detail/:id" element={<GetCommercialDetail />} />
            <Route path="buyers/residential" element={<BuyersResidential />} />
            <Route path="buyers/agriculture" element={<BuyersAgriculture />} />
            <Route path="buyers/commercial" element={<GetCommercial />} />
            <Route path="searchpage" element={<SearchPage />} />
            <Route path="buyerRequests" element={<BuyerRequests />} />
            <Route path="sellerRequests" element={<SellerRequests />} />
            <Route path="appointments" element={<BuyerRequests />} />
            {/* <Route path="appointments" element={<Appointments />}> */}
            {/* <Route path="buyerRequests" element={<BuyerRequests />} />
            <Route path="sellerRequests" element={<SellerRequests />} /> */}
            {/* Optionally set a default route */}
            {/* <Route index element={<BuyerRequests />} /> */}
            {/* </Route> */}

            <Route path="profile" element={<ProfileDetails />} />
            <Route
              path="financialAssistance"
              element={<FinancialAssistant />}
            />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
    
      </Router>
    </>
  );
}

// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SearchPage from './Components/SearchPage';
// // import Propde from './Components/Propde';
// import Design from './Components/Design';
// import Residential from './Components/Residential';

// import Agricultural from './Components/Agricultural';
// import GetCommercial from './Components/GetCommercial';
// import Agriculture from './Components/Agricultural';
// // import PropertyDetail from './Components/PropertyDetail';
// import ResidentialDetails from './Components/ResidentialDetails';
// import GetCommercialDetail from './Components/GetCommercialDetail';

// function App() {
//  return (
//  <BrowserRouter>
//  <Routes>
//  <Route path="/" element={<Design />}>
//  <Route index element={<SearchPage />} />
//  <Route path="/details/Residential" element={<Residential />} />
//  <Route path="/details/Agricultural" element={<Agriculture />} />
//  <Route path="/details/Commercial" element={<GetCommercial />} />
//  {/* <Route path="/product/:id" element={<PropertyDetail />} /> */}
//  <Route path="/details/:id" element={<ResidentialDetails />} />
//  <Route path="/details/:id" component={<GetCommercialDetail/>} />
//  </Route>
//  </Routes>
//  </BrowserRouter>
//  );
// }

// export default App;
