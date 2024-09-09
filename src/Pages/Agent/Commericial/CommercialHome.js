
import React, { useEffect, useState } from "react";
import CommercialForm from "./CommercialForm";
import GetCommercial from "./GetCommercial";
const CommercialHome = () => {
  const [showCommericial, setShowCommericial] = useState(false);

  const handleButtonClick = () => {
    setShowCommericial(!showCommericial);
  };

  return (
    <div>
      {showCommericial ? (
        <CommercialForm handleButtonClick={handleButtonClick} />
      ) : (
        <GetCommercial path={"getallcommercials"}/>
      )}
    </div>
  );
};

export default CommercialHome;
