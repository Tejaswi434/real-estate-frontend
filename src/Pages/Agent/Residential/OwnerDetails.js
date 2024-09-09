// import React from "react";
// import { Form, Input, Select, Card } from "antd";
// import "./Residential.css";

// const { Option } = Select;
// export default function OwnerDetails() {
//   return (
//     <div>
//       <Card title="Owner Details" className="form-card">
//         <div className="form-row">
//           <Form.Item label="Property Type" name="propertyType">
//             <Select
//               placeholder="Select property type"
//               style={{ width: "100%" }}
//             >
//               <Option value="flat">Flat</Option>
//               <Option value="house">House</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item label="Owner Name" name="ownerName">
//             <Input placeholder="Enter your name" />
//           </Form.Item>
//           <Form.Item label="Email" name="ownerEmail">
//             <Input placeholder="Enter your email" />
//           </Form.Item>
//           <Form.Item label="Phone no" name="contact">
//             <Input placeholder="Enter your contact number" />
//           </Form.Item>
//         </div>
//       </Card>
//     </div>
//   );
// }



import React from "react";
import { Form, Input, Select, Card } from "antd";
import "./Residential.css";

const { Option } = Select;
export default function OwnerDetails() {
  return (
    <div>
      <Card title="Owner Details" className="form-card" >
        <div className="form-row">
          <Form.Item label="Property Type" name="propertyType">
            <Select
              placeholder="Select property type"
              style={{ width: "100%" }}
            >
              <Option value="flat">Flat</Option>
              <Option value="house">House</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Owner Name" name="ownerName" rules={[
    {
      required: true,
      message: "Owner name is required",
    },
    {
      pattern: /^[A-Za-z\s]+$/,
      message: "Owner name can only contain alphabets and spaces",
    },
  ]}>
            <Input placeholder="Enter your name"  onKeyPress={(e) => {
      if (!/^[A-Za-z\s]*$/.test(e.key)) {
        e.preventDefault();
      }
    }}/>
          </Form.Item>
          <Form.Item label="Email" name="ownerEmail"  rules={[
    {
      required: true,
      message: "Email is required",
    },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      message: "Email must be a valid Gmail address (e.g., user@gmail.com)",
    },
  ]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Phone no" name="contact" rules={[
        {
          required: true,
          message: "Contact number is required",
        },
        {
          pattern: /^[0-9]{10}$/,
          message: "Contact number must be exactly 10 digits",
        },
      ]}>
            <Input placeholder="Enter your contact number"  maxLength={10}  onKeyPress={(event) => {
        // Allow only numbers
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}/>
          </Form.Item>
        </div>
      </Card>
    </div>
  );
}