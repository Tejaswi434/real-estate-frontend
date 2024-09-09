import React from "react";
import { Link, useLocation } from "react-router-dom";

const AppointmentTabs = () => {
  const location = useLocation();
  const activeTab = location.pathname.includes("buyerRequests")
    ? "buyer"
    : location.pathname.includes("sellerRequests")
    ? "seller"
    : "buyer"; // Default to "buyer" if no specific tab is found

  return (
    <div
      className="tabs"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "10px",
      }}
    >
      <button
        className={activeTab === "buyer" ? "active" : ""}
        style={{
          padding: "10px 20px",
          fontSize: "15px",
          backgroundColor: activeTab === "buyer" ? "#ccc" : "#f0f0f0",
          color: "black",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Link
          to="/dashboard/buyerRequests"
          style={{ textDecoration: "none", color: "black" }}
        >
          Buyer Requests
        </Link>
      </button>
      <button
        className={activeTab === "seller" ? "active" : ""}
        style={{
          padding: "10px 20px",
          fontSize: "15px",
          backgroundColor: activeTab === "seller" ? "#ccc" : "#f0f0f0",
          color: "black",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Link
          to="/dashboard/sellerRequests"
          style={{ textDecoration: "none", color: "black" }}
        >
          Seller Requests
        </Link>
      </button>
    </div>
  );
};

export default AppointmentTabs;
