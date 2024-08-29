import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Card,
  Radio,
  Checkbox,
  Upload,
  Row,
  Col,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Commericial = () => {
  const [componentVariant, setComponentVariant] = useState("filled");
  const [ltype, setLtype] = useState(null);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const options = [
    { label: "Agricultural", value: "Agricultural" },
    { label: "Retail", value: "Retail" },
    { label: "Industrial", value: "Industrial" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Social Activities", value: "Social Activities" },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const calculateTotalAmount = (amount, time) => {
    return Math.round(amount * time);
  };

  const selling = () => (
    <>
      <Row gutter={16} style={{ marginBottom: "-20px" }}>
        <Col span={8}>
          <Form.Item
            label="Plot Size"
            name="plotSize"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter plot size!" }]}
          >
            <InputNumber
              min={1}
              placeholder="in sqft"
              style={{ width: "60%" }}
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price!" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <InputNumber
              min={1}
              placeholder="per sqft"
              style={{ width: "60%" }}
              value={time}
              onChange={(value) => {
                setTime(value);
                console.log(value, "   ", amount);
                setTotalAmount(calculateTotalAmount(amount, value));
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Total Amount"
            name="totalAmount"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            {totalAmount}
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const rent = () => (
    <>
      <Row gutter={16} style={{ marginBottom: "-18px" }}>
        <Col span={8}>
          <Form.Item
            label="Plot Size"
            name="plotSize"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter plot size!" }]}
          >
            <InputNumber
              min={1}
              placeholder="in sqft"
              style={{ width: "60%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Rent"
            name="rent"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter rent!" }]}
          >
            <InputNumber
              min={1}
              placeholder="per month"
              style={{ width: "60%" }}
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Number of Months"
            name="duration"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please enter number of months!" },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: "60%" }}
              value={time}
              onChange={(value) => {
                setTime(value);
                console.log(value, "   ", amount);
                setTotalAmount(calculateTotalAmount(amount, value));
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: "-18px" }}>
        <Col span={12}>
          <Form.Item
            label="Total Amount"
            name="totalAmount"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            {totalAmount}
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const lease = () => (
    <>
      <Row gutter={16} style={{ marginBottom: "-18px" }}>
        <Col span={8}>
          <Form.Item
            label="Plot Size"
            name="plotSize"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter plot size!" }]}
          >
            <InputNumber
              min={1}
              placeholder="in sqft"
              style={{ width: "60%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Lease"
            name="leasePrice"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter lease!" }]}
          >
            <InputNumber
              min={1}
              placeholder="per year"
              style={{ width: "60%" }}
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Number of Years"
            name="duration"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please enter number of years!" },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: "60%" }}
              value={time}
              onChange={(value) => {
                setTime(value);
                console.log(value, "   ", amount);
                setTotalAmount(calculateTotalAmount(amount, value));
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: "-18px" }}>
        <Col span={12}>
          <Form.Item
            label="Total Amount"
            name="totalAmount"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
            {totalAmount}
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  //need to change token everytime
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2ZDA1ZGRlMzExNjgzYzI2Yjk2NjY4MiIsImVtYWlsIjoiamFuZS5zbWl0aEBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IlNtaXRoIiwicGhvbmVOdW1iZXIiOiI5ODc2NTQzMjEwIiwicm9sZSI6M30sImlhdCI6MTcyNDk1MjgyOSwiZXhwIjoxNzI0OTU2NDI5fQ.t_IrDBSR4w5qnwwcdxrspp5b8bLURaMDTjKPs-FRDf0";
  const onFinish = async (values) => {
    const ownerDetails = {
      ownerName: values.ownerName,
      ownerContact: values.ownerContact,
      ownerEmail: values.ownerEmail,
      isLegalDispute: values.isLegalDispute,
    };

    let landDetails = {
      landPurpose: values.landPurpose,
      plotSize: values.plotSize,
      landUsage: values.landUsage,
    };

    if (values.landPurpose === "Sell") {
      landDetails = {
        ...landDetails,
        price: values.price,
        totalAmount: values.plotSize * values.price,
      };
    } else if (values.landPurpose === "Rent") {
      landDetails = {
        ...landDetails,
        rent: values.rent,
        duration: values.duration,
        totalAmount: values.rent * values.duration,
      };
    } else if (values.landPurpose === "Lease") {
      landDetails = {
        ...landDetails,
        leaseprice: values.leaseprice,
        duration: values.duration,
        totalAmount: values.leaseprice * values.duration,
      };
    }

    const amenties = {
      isElectricity: values.isElectricity,
      isWaterFacility: values.isWaterFacility,
      isRoadFace: values.isRoadFace,
    };
    const propertyDetails = {
      ownerDetails,
      landDetails,
      amenties,
    };
    const finalObject = {
      propertyType: "Commercial",
      propertyDetails,
    };
    console.log(finalObject);
    try {
      const response = await axios.post(
        "http://172.17.10.34:3000/commercials/postcommercial",
        finalObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Property added successfully:", response.data);
    } catch (error) {
      console.error(
        "Error adding property:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Form
      name="propertyDetails"
      onFinish={onFinish}
      {...formItemLayout}
      onValuesChange={onFormVariantChange}
      variant={componentVariant}
      style={{
        marginBottom: "-20%",
        margin: "20px auto",
        padding: "3%",
        border: "1px solid black",
        maxWidth: "50%",
        borderRadius: "2%",
      }}
      initialValues={{ variant: componentVariant }}
    >
      <Card
        title="Owner Details"
        style={{
          marginBottom: "20px",
          border: "1px solid #808080",
          paddingLeft: "20px",
        }}
      >
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={12}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please enter Owner Details!" },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: "Owner Name can only contain letters and spaces!",
                },
                {
                  max: 32,
                  message: "Owner Name cannot exceed 32 characters!",
                },
              ]}
            >
              <Input
                style={{
                  width: "70%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact"
              name="ownerContact"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input!" },
                {
                  pattern: /^\d{10}$/,
                  message: "Contact number must be digits of length 10!",
                },
              ]}
            >
              <Input
                style={{
                  width: "70%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="E-mail"
              name="ownerEmail"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { message: "Please input!" },
                {
                  type: "email",
                  message: "The input is not a valid E-mail!",
                },
              ]}
            >
              <Input
                style={{
                  width: "70%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Any Disputes"
              name="isLegalDispute"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group>
                <Radio value="true"> Yes </Radio>
                <Radio value="false"> No </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        title="Land Details"
        style={{
          marginBottom: "20px",
          border: "1px solid #808080",
          paddingLeft: "20px",
        }}
      >
        <Form.Item
          label="Please select one"
          name="landPurpose"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Radio.Group>
            <Radio value="Sell" onClick={() => setLtype("sell")}>
              {" "}
              Sell{" "}
            </Radio>
            <Radio value="Rent" onClick={() => setLtype("rent")}>
              {" "}
              Rent{" "}
            </Radio>
            <Radio value="Lease" onClick={() => setLtype("lease")}>
              {" "}
              Lease{" "}
            </Radio>
          </Radio.Group>
        </Form.Item>

        {ltype === "sell" ? (
          selling()
        ) : ltype === "rent" ? (
          rent()
        ) : ltype === "lease" ? (
          lease()
        ) : (
          <></>
        )}
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={24}>
            <Form.Item
              label="Can be used for"
              name="landUsage"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please select at least one option!",
                }, // Set 'required: true' with a validation message
              ]}
            >
              <Checkbox.Group options={options} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        title="Amenties"
        style={{
          marginBottom: "20px",
          border: "1px solid #808080",
          paddingLeft: "20px",
        }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Electricity"
              name="isElectricity"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Radio.Group>
                <Radio value="true"> Yes </Radio>
                <Radio value="false"> No </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Water facility"
              name="isWaterFacility"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Radio.Group>
                <Radio value="true"> Yes </Radio>
                <Radio value="false"> No </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Road faced"
              name="isRoadFace"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Radio.Group>
                <Radio value="true"> Yes </Radio>
                <Radio value="false"> No </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        title="Upload Photos"
        style={{
          border: "1px solid #808080",
          paddingLeft: "20px",
        }}
      >
        <Form.Item
          name="upload"
          label="Upload pictures"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload pictures!",
            },
          ]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Card>
      <br></br>
      <FormItem>
        <Button
          type="primary"
          style={{ float: "right", marginRight: "-40%" }}
          htmlType="submit"
        >
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default Commericial;
