import React from "react";
import { Form, Button, Radio, InputNumber, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Residential.css";

export default function Amenities() {
  return (
    <div>
      <Card title="Amenities" className="form-card">
        <div className="form-row">
          <Form.Item label="24/7 Power BackUp" name="powerBackUp">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="24/7 Water Facility" name="waterFacility">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="24/7 Electricity Facility"
            name="electricityFacility"
          >
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Elevator" name="elevator">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Watchman" name="watchman">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="CCTV" name="cctv">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Nearest Medical Facility (in km)" name="medical">
            <InputNumber
              placeholder="Enter distance"
              style={{ width: "50%" }}
            />
          </Form.Item>
          <Form.Item label="Near Religious Sites  (in km)" name="religious">
            <InputNumber
              placeholder="Enter distance"
              style={{ width: "50%" }}
            />
          </Form.Item>
          <Form.Item
            label="Near Educational institutions (in km)"
            name="educational"
          >
            <InputNumber
              placeholder="Enter distance"
              style={{ width: "50%" }}
            />
          </Form.Item>
          <Form.Item label="Nearby Grocery (in km)" name="grocery">
            <InputNumber
              placeholder="Enter distance"
              style={{ width: "50%" }}
            />
          </Form.Item>
          <Form.Item label="Gym Facility" name="gymFacility">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Flat Photos" name="propPhotos">
            <Upload listType="picture" multiple>
              <Button icon={<UploadOutlined />}>Upload Photos</Button>
            </Upload>
          </Form.Item>
        </div>
      </Card>
    </div>
  );
}
