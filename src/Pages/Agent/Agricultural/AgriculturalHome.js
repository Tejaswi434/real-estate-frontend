
import React, { useState } from "react";
import Agriculture from "./Agriculture";
import AddProperty from "./AddProperty";

const AgriculturalHome = () => {
  const [showAgricultural, setshowAgricultural] = useState(false);
  const handleButtonClick = () => {
    setshowAgricultural(!showAgricultural);
  };
  return (
    <div>
      {showAgricultural ? (
        <AddProperty handleButtonClick={handleButtonClick} />
      ) : (
        <Agriculture path={"getallfields"} />
      )}
    </div>
  );
};

export default AgriculturalHome;
