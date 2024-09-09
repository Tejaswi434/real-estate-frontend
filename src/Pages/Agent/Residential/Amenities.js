// import React from "react";
// import { Form, Button, Radio, InputNumber, Upload, Card } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import "./Residential.css";

// export default function Amenities() {
//   return (
//     <div>
//       <Card title="Amenities" className="form-card">
//         <div className="form-row">
//           <Form.Item label="24/7 Power BackUp" name="powerBackUp">
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label="24/7 Water Facility" name="waterFacility">
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item
//             label="24/7 Electricity Facility"
//             name="electricityFacility"
//           >
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label="Elevator" name="elevator">
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label="Watchman" name="watchman">
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label="CCTV" name="cctv">
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label="Nearest Medical Facility (in km)" name="medical">
//             <InputNumber
//               placeholder="Enter distance"
//               style={{ width: "50%" }}
//             />
//           </Form.Item>
//           <Form.Item label="Near Religious Sites  (in km)" name="religious">
//             <InputNumber
//               placeholder="Enter distance"
//               style={{ width: "50%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Near Educational institutions (in km)"
//             name="educational"
//           >
//             <InputNumber
//               placeholder="Enter distance"
//               style={{ width: "50%" }}
//             />
//           </Form.Item>
//           <Form.Item label="Nearby Grocery (in km)" name="grocery">
//             <InputNumber
//               placeholder="Enter distance"
//               style={{ width: "50%" }}
//             />
//           </Form.Item>
//           <Form.Item label="Gym Facility" name="gymFacility">
//             <Radio.Group>
//               <Radio value="true">Yes</Radio>
//               <Radio value="false">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item label="Flat Photos" name="propPhotos">
//             <Upload listType="picture" multiple>
//               <Button icon={<UploadOutlined />}>Upload Photos</Button>
//             </Upload>
//           </Form.Item>
//         </div>
//       </Card>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Form, Card, Row, Col, InputNumber, Switch } from "antd";
import UploadImages from "./Upload";
import "./Residential.css";
import FormItem from "antd/es/form/FormItem";

export default function Amenities({ handleuploadPics }) {
  const [imageUrls, setImageUrls] = useState([]);

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   const url = await UploadImages(file);
  //   setImageUrls((prevUrls) => [...prevUrls, url]);
  //   console.log(url);
  //   console.log("Hello");
  //   console.log("from eminities image urls", imageUrls);
  //   handleuploadPics(imageUrls);
  // };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const url = await UploadImages(file);
    
    // Update image URLs and ensure the new state is used in subsequent logic
    setImageUrls((prevUrls) => {
      const newUrls = [...prevUrls, url];
      handleuploadPics(newUrls); // Pass new URLs directly
      return newUrls; // Update state with new URLs
    });
    
    console.log(url);
    console.log("Hello");
    console.log("from eminities image urls", imageUrls);
  };
  
  return (
    <Card title="Amenities" className="form-card">
      <Row gutter={16}>
        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>
            Powerbackup
          </span>
          <Form.Item
            rules={[{ required: true }]}
            name="powerBackup"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>
            Water Facility
          </span>
          <Form.Item
            name="waterFacility"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
          >
            <Switch
              size="small"
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>
            Electricity Facility
          </span>
          <Form.Item
            name="electricityFacility"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
          >
            <Switch
              size="small"
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>CCTV</span>
          <Form.Item
            name="cctv"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
          >
            <Switch
              size="small"
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>Watchman</span>
          <Form.Item
            name="watchman"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
          >
            <Switch
              size="small"
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>

        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>
            GymFacility
          </span>
          <Form.Item
            name="gymFacility"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            valuePropName="checked"
          >
            <Switch
              size="small"
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} style={{ display: "flex" }}>
          <span style={{ marginTop: "4px", marginRight: "6px" }}>Elevator</span>
          <Form.Item
            name="elevator"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
          >
            <Switch
              size="small"
              checkedChildren="Yes"
              unCheckedChildren="No"
              defaultChecked={false}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8} style={{ display: "flex" }}>
          <Form.Item
            label="Nearest Medical Facility (in km)"
            name="medical"
            labelCol={{ span: 16 }} // Label takes full width
            wrapperCol={{ span: 12 }}
          >
            <InputNumber
              onKeyPress={(event) => {
                // Allow only numbers
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              min={1}
              placeholder="Enter number"
              style={{ width: "50%" }}
            />
          </Form.Item>
        </Col>

        <Col span={8} style={{ display: "flex" }}>
          <Form.Item
            label="Near Educational institutions (in km)"
            name="educational"
            labelCol={{ span: 16 }} // Label takes full width
            wrapperCol={{ span: 12 }}
          >
            <InputNumber
              onKeyPress={(event) => {
                // Allow only numbers
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              min={1}
              placeholder=""
              style={{ width: "50%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: "flex" }}>
          <Form.Item
            label="Nearby Grocery (in km)"
            name="grocery"
            labelCol={{ span: 16 }} // Label takes full width
            wrapperCol={{ span: 12 }} // Input also takes full wid
          >
            <InputNumber
              onKeyPress={(event) => {
                // Allow only numbers
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="Enter distance"
              style={{ width: "50%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormItem>
        <card>
          <div
            style={{ border: "1px solid #80808", padding: "10px" }}
            title="Upload Photos"
          >
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              {imageUrls.map((url, index) => (
                <Col span={8} key={index} style={{ marginBottom: "16px" }}>
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              ))}
              <Col span={8}>
                <label htmlFor="upload-input">
                  <input type="file" onChange={handleImageUpload} />
                </label>
              </Col>
            </Row>
          </div>
        </card>
      </FormItem>
    </Card>
  );
}
