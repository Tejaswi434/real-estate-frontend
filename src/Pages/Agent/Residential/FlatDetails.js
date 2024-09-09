// import React from "react";
// import { Form, Input, Radio, Select, InputNumber, Card, Tooltip } from "antd";
// import { InfoCircleOutlined } from "@ant-design/icons";
// import "./Residential.css";

// const { Option } = Select;

// export default function FlatDetails() {
//   return (
//     <div>
//       <Card title="Flat Details" className="form-card">
//         <div className="form-row">
//           <Form.Item label="Apartment Name" name="apartmentName">
//             <Input placeholder="Enter apartment name" />
//           </Form.Item>
//           <Form.Item label="Flat Number" name="apartmentNumber">
//             <Input placeholder="Enter flat number" />
//           </Form.Item>
//           <Form.Item label="Apartment Layout" name="apartmentLayout">
//             <Select placeholder="Select BHK type" style={{ width: "100%" }}>
//               <Option value="1BHK">1BHK</Option>
//               <Option value="2BHK">2BHK</Option>
//               <Option value="3BHK">3BHK</Option>
//               <Option value="4BHK">4BHK</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label={
//               <span>
//                 FlatSize(in Sqft){" "}
//                 <Tooltip title="Enter the size of the flat in square feet">
//                   <InfoCircleOutlined style={{ marginLeft: 4 }} />
//                 </Tooltip>
//               </span>
//             }
//             name="flatSize"
//           >
//             <InputNumber
//               min={1}
//               placeholder="Enter flat size"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             label={
//               <span>
//                 Price per Sqft{" "}
//                 <Tooltip title="Enter the price for Sqft">
//                   <InfoCircleOutlined />
//                 </Tooltip>
//               </span>
//             }
//             name="flatCost"
//           >
//             <InputNumber
//               min={1}
//               placeholder="Enter price per square foot"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>
//           <Form.Item label="Flat Cost" name="totalCost">
//             <Input placeholder="Enter flat cost" />
//           </Form.Item>
//           <Form.Item label="Flat Facing" name="flatFacing">
//             <div className="radio-group">
//               <Radio.Group>
//                 <Radio value="North">North</Radio>
//                 <Radio value="South">South</Radio>
//                 <Radio value="East">East</Radio>
//                 <Radio value="West">West</Radio>
//               </Radio.Group>
//             </div>
//           </Form.Item>
//           <Form.Item label="Furniture" name="furnitured">
//             <Select placeholder="Select furniture" style={{ width: "100%" }}>
//               <Option value="None">Unfurnished</Option>
//               <Option value="Basic">Fully Furnished</Option>
//               <Option value="Full">Semi Furnished</Option>
//             </Select>
//           </Form.Item>
//         </div>
//       </Card>
//     </div>
//   );
// }


import React,{useState,useEffect} from "react";
import { Form, Input, Radio, Select, InputNumber, Card, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./Residential.css";
import './FlatDetails.css'
const { Option } = Select;

export default function FlatDetails() { 
  const [flatSize, setFlatSize] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const handleChange = (value) => {

    setFlatSize(value);
  };
  const [pricePerSqft, setPricePerSqft] = useState(0);

  const handlePriceChange = (value) => {
    setPricePerSqft(value);
  };

  return (
    <div>
      <Card title="Flat Details" className="form-card">
        <div className="form-row" >
          <Form.Item label="Apartment Name" name="apartmentName" rules={[
    {
      required: true,
      message: "Owner name is required",
    },
    {
      pattern: /^[A-Za-z\s]+$/,
      message: "Owner name can only contain alphabets and spaces",
    },
  ]}>
            <Input placeholder="Enter apartment name"  onKeyPress={(event) => {
        if (/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
   />
          </Form.Item>
          <Form.Item label="Flat Number" name="apartmentNumber"      rules={[{required:true}]} >
            <InputNumber placeholder="Enter flat number"  onKeyPress={(event) => {
        // Allow only numbers
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}/>
          </Form.Item>
          <Form.Item label="Apartment Layout" name="apartmentLayout"      rules={[{required:true}]}>
            <Select placeholder="Select BHK type" style={{ width: "100%" }}>
              <Option value="1BHK">1BHK</Option>
              <Option value="2BHK">2BHK</Option>
              <Option value="3BHK">3BHK</Option>
              <Option value="4BHK">4BHK</Option>
            </Select>
          </Form.Item>
          <Form.Item      rules={[{required:true}]}
            label={
              <span>
                FlatSize(in Sqft){" "}
           
              </span>
            }
            name="flatSize"
          >
            <InputNumber  onKeyPress={(event) => {
       
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
              min={1}
              placeholder="Enter flat size"
              style={{ width: "100%" }}
              onChange={handleChange}  />
          </Form.Item>
          <Form.Item      rules={[{required:true}]}
            label={
              <span>
                Price per Sqft{" "}
         
              </span>
            }
            name="flatCost"
          >
            <InputNumber   onKeyPress={(event) => {
        // Allow only numbers
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
              min={1}
              placeholder="Enter price per square foot"
              style={{ width: "100%" }}   onChange={handlePriceChange}  
            />
          </Form.Item>
          <Form.Item label="Flat Cost" name="totalCost"      >
            {pricePerSqft*flatSize}
          </Form.Item>
          <Form.Item label="Flat Facing" name="flatFacing"      rules={[{required:true}]}>
         
              <Radio.Group style={{display:'flex', flexDirection:'row'}}>
               <div style={{display:'flex' , flexDirection:'column'}}>
               <Radio value="North">North</Radio>
               <Radio value="South">South</Radio></div> 
               <div style={{display:'flex' , flexDirection:'column'}}>
              <Radio value="East">East</Radio>
              <Radio value="West">West</Radio>
              </div>
                
              </Radio.Group>
           
          </Form.Item>
          <Form.Item label="Furniture" name="furnitured"      rules={[{required:true}]}>
            <Select placeholder="Select furniture" style={{ width: "100%" }}>
              <Option value="None">Unfurnished</Option>
              <Option value="Basic">Fully Furnished</Option>
              <Option value="Full">Semi Furnished</Option>
            </Select>
          </Form.Item>
        </div>
      </Card>
    </div>
  );
}