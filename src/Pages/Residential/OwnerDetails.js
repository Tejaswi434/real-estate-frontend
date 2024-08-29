import React from "react";
import { Form, Input, Select, Card } from "antd";
import "./Residential.css";

const { Option } = Select;

export default function OwnerDetails() {
  return (
    <div>
      <Card title="Owner Details" className="form-card">
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

          <Form.Item label="Owner Name" name="ownerName">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="ownerEmail">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Phone no" name="contact">
            <Input placeholder="Enter your contact number" />
          </Form.Item>
        </div>
      </Card>
    </div>
  );
}
