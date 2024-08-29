import React from "react";
import { Form, Input, Radio, Select, InputNumber, Card, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./Residential.css";

const { Option } = Select;

export default function FlatDetails() {
  return (
    <div>
      <Card title="Flat Details" className="form-card">
        <div className="form-row">
          <Form.Item label="Apartment Name" name="apartmentName">
            <Input placeholder="Enter apartment name" />
          </Form.Item>
          <Form.Item label="Flat Number" name="apartmentNumber">
            <Input placeholder="Enter flat number" />
          </Form.Item>
          <Form.Item label="Apartment Layout" name="apartmentLayout">
            <Select placeholder="Select BHK type" style={{ width: "100%" }}>
              <Option value="1BHK">1BHK</Option>
              <Option value="2BHK">2BHK</Option>
              <Option value="3BHK">3BHK</Option>
              <Option value="4BHK">4BHK</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={
              <span>
                Flat Size (in Sqft){" "}
                <Tooltip title="Enter the size of the flat in square feet">
                  <InfoCircleOutlined style={{ marginLeft: 4 }} />
                </Tooltip>
              </span>
            }
            name="flatSize"
          >
            <InputNumber
              min={1}
              placeholder="Enter flat size"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Price per Sqft{" "}
                <Tooltip title="Enter the price for Sqft">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            name="flatCost"
          >
            <InputNumber
              min={1}
              placeholder="Enter price per square foot"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Flat Cost" name="totalCost">
            <Input placeholder="Enter flat cost" />
          </Form.Item>
          <Form.Item label="Flat Facing" name="flatFacing">
            <div className="radio-group">
              <Radio.Group>
                <Radio value="North">North</Radio>
                <Radio value="South">South</Radio>
                <Radio value="East">East</Radio>
                <Radio value="West">West</Radio>
              </Radio.Group>
            </div>
          </Form.Item>
          <Form.Item label="Furniture" name="furnitured">
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
