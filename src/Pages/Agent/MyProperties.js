import React, { useState } from "react";
import { Checkbox, Card, Row, Col } from "antd";
import GetCommercial from "./Commericial/GetCommercial";
import CommercialForm from "./Commericial/CommercialForm"; 
import Agriculture from "./Agricultural/Agriculture";
import Residential from "./Residential/Residential";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import AddProperty from "./Agricultural/AddProperty";
import ResidentialForm from "./Residential/ResidentialForm";

const MyProperties = () => {
  const [showFormType, setShowFormType] = useState(null); 
  const [checkedValues, setCheckedValues] = useState(["Commercial","Agriculture","Residential"]);

  const onCheckboxChange = (checkedValues) => {
    setCheckedValues(checkedValues);
  };

  const handleButtonClick = (type) => {
    setShowFormType(type); 
  };

  const options = [
    { label: "Commercial", value: "Commercial" },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Residential", value: "Residential" },
  ];

  return (
    <div>
      {!showFormType ? (
        <>
          <Card>
            <Checkbox.Group options={options} onChange={onCheckboxChange}  value={checkedValues} />
          </Card>

          <Row gutter={16} style={{ padding: "20px" }}>
            {checkedValues.includes("Commercial") && (
              <Card
                title="Commercial"
                extra={
                  <PlusOutlined
                    style={{
                      fontSize: "20px",
                      color: "green",
                      border: "1px solid black",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                    onClick={() => handleButtonClick("commercial")} 
                  />
                }
              >
                <GetCommercial path={"getcommercial"} />
              </Card>
            )}
            {checkedValues.includes("Agriculture") && (
              <Card
                title="Agriculture"
                extra={
                  <PlusOutlined
                    style={{
                      fontSize: "20px",
                      color: "green",
                      border: "1px solid black",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                    onClick={() => handleButtonClick("agriculture")} 
                  />
                }
              >
                <Agriculture path={"getfields"} />
              </Card>
            )}
            {checkedValues.includes("Residential") && (
              <Card
                title="Residential"
                extra={
                  <PlusOutlined
                    style={{
                      fontSize: "20px",
                      color: "green",
                      border: "1px solid black",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                    onClick={() => handleButtonClick("residential")}
                  />
                }
              >
                <Residential path={"getting"} />
              </Card>
            )}
          </Row>
        </>
      ) : (
        <div>
          {showFormType === "commercial" && <CommercialForm setShowFormType={setShowFormType}/>}
          {showFormType === "agriculture" && <AddProperty setShowFormType={setShowFormType}/>}
          {showFormType === "residential" && <ResidentialForm setShowFormType={setShowFormType}/>}
          <div className="plus-button" style={{ backgroundColor: "red" }}>
            <CloseOutlined onClick={() => setShowFormType(null)} /> 
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProperties;

