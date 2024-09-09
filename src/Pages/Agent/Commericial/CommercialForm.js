import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Card,
  Radio,
  Checkbox,
  Row,
  Col,
  Switch,
  Select,
  Carousel,
} from "antd";

import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { notification } from "antd";
import Upload from "./Upload";
import { Option } from "antd/es/mentions";
import { districtData } from "./Data";
import "./Arrow.css";
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const CommercialForm = ({ setShowFormType }) => {
  const [componentVariant, setComponentVariant] = useState("filled");
  const [ltype, setLtype] = useState(null);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [hasPincode, setHasPincode] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMandal, setSelectedMandal] = useState("");
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [pincode, setPincode] = useState("");
  const [tokenData, setTokenData] = useState(
    localStorage.getItem(`token${localStorage.getItem("role")}`)
  );
  const [showDis, setShowDis] = useState(false);

  const [addressDetails, setAddressDetails] = useState({
    country: "",
    state: "",
    district: "",
    mandal: "",
    village: "",
  });
  const [imageUrls, setImageUrls] = useState([]);

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

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setMandals(Object.keys(districtData[value]?.mandals || {}));
    setSelectedMandal("");
    setVillages([]);
  };

  const handleMandalChange = (value) => {
    setSelectedMandal(value);
    setVillages(districtData[selectedDistrict]?.mandals[value] || []);
  };
  const handlePincodeChange1 = (checked) => {
    const value = checked ? "yes" : "no";
    setHasPincode(!hasPincode);
  };

  const handlePincodeChange = async (e) => {
    const pincodeValue = e.target.value;
    setPincode(pincodeValue);

    if (pincodeValue.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincodeValue}`
        );
        const postOffices = response.data[0].PostOffice;

        if (postOffices && postOffices.length > 0) {
          const district = postOffices[0].District;
          const mandal = postOffices[0].Block;
          const village = postOffices[0].Block;
          setAddressDetails({
            district: district,
            mandal: mandal,
            village: village,
          });
          console.log("address", addressDetails);
        } else {
          console.error("No PostOffice data found for the given pincode.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const calculateTotalAmount = (amount, time) => {
    return Math.round(amount * time);
  };
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 3,
    });
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
              style={{ width: "80%" }}
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              addonAfter="/sqft"
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
              style={{ width: "80%" }}
              value={time}
              onChange={(value) => {
                setTime(value);
                console.log(value, " ", amount);
                setTotalAmount(calculateTotalAmount(amount, value));
              }}
              addonAfter={<span>₹</span>}
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
              style={{ width: "80%" }}
              addonAfter="/sqft"
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
              style={{ width: "80%" }}
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              addonAfter={<span>₹</span>}
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
              placeholder="months"
              min={1}
              style={{ width: "80%" }}
              value={time}
              onChange={(value) => {
                setTime(value);
                console.log(value, " ", amount);
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
            labelCol={{ span: 6.5 }}
            wrapperCol={{ span: 24 }}
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
              style={{ width: "80%" }}
              addonAfter="/sqft"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Lease"
            name="leasePrice"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please enter lease price!" }]}
          >
            <InputNumber
              min={1}
              placeholder="per year"
              style={{ width: "80%" }}
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              addonAfter={<span>₹</span>}
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
              placeholder="years"
              min={1}
              style={{ width: "80%" }}
              value={time}
              onChange={(value) => {
                setTime(value);
                console.log(value, " ", amount);
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
            labelCol={{ span: 6.5 }}
            wrapperCol={{ span: 24 }}
          >
            {totalAmount}
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const url = await Upload(file);
    setImageUrls((prevUrls) => [...prevUrls, url]);
    console.log(imageUrls);
  };

  //need to change token everytime
  const onFinish = async (values) => {
    const owner = {
      ownerName: values.ownerName.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      ),
      ownerContact: values.ownerContact,
      ownerEmail: values.ownerEmail,
      isLegalDispute: values.isLegalDispute,
      disputeDesc: values.disputeDesc,
    };
    let landDetails = {
      sell: {},
      rent: {},
      lease: {},
      address: {
        country: "India",
        state: "Andhra Pradesh",
        pinCode: values.pinCode,
        district: !hasPincode ? addressDetails.district : values.district,
        mandal: !hasPincode ? addressDetails.mandal : values.mandal,
        village: !hasPincode ? addressDetails.village : values.village,
      },
      description: values.description,
    };
    let dummy = {
      landPurpose: values.landPurpose,
      plotSize: values.plotSize,
      landUsage: values.landUsage,
    };

    if (values.landPurpose === "Sell") {
      dummy = {
        ...dummy,
        price: values.price,
        totalAmount: values.plotSize * values.price,
      };
      landDetails.sell = dummy;
    } else if (values.landPurpose === "Rent") {
      dummy = {
        ...dummy,
        rent: values.rent,
        noOfMonths: values.duration,
        totalAmount: values.rent * values.duration,
      };
      landDetails.rent = dummy;
    } else if (values.landPurpose === "Lease") {
      dummy = {
        ...dummy,
        leasePrice: values.leasePrice,
        duration: values.duration,
        totalAmount: values.leasePrice * values.duration,
      };
      landDetails.lease = dummy;
    }

    const amenities = {
      isElectricity: values.isElectricity,
      isWaterFacility: values.isWaterFacility,
      isRoadFace: values.isRoadFace,
    };

    const uploadPics = [];
    imageUrls.forEach((imageUrl) => {
      uploadPics.push(imageUrl);
    });

    const propertyDetails = {
      owner,
      landDetails,
      amenities,
      uploadPics,
    };
    const finalObject = {
      propertyType: "Commercial",
      propertyTitle: values.propertyTitle.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      ),
      rating: 0,
      propertyDetails,
    };
    console.log(finalObject);
    // const tokenData = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjY2Y2Y3MGJiNGY1OTI2NmJkMDM2NzkxZiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoxfSwiaWF0IjoxNzI1NDMyMzA2LCJleHAiOjE3MjU0NTAzMDZ9.Pk7OoDGmmzos_SWqWHcTP7pzXt_kEL7DiLJ73cXQ4RI"
    try {
      const response = await axios.post(
        "http://172.17.15.53:3000/commercials/postcommercial",
        finalObject,
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      openNotification(
        "success",
        "Form submitted successfully!",
        "Property added successfully"
      );
      // handleButtonClick();
      setShowFormType(null);
    } catch (error) {
      openNotification(
        "error",
        "Submission failed",
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
        marginLeft: "10%",
        padding: "3%",
        border: "1px solid black",
        maxWidth: "80%",
        borderRadius: "2%",
      }}
      initialValues={{ variant: componentVariant }}
    >
      <Card
        title="Owner Details"
        style={{
          marginBottom: "20px",
          border: "1px solid #808080",
          paddingLeft: "15px",
        }}
      >
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={8}>
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
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
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
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
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
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={18}>
            <Form.Item
              label="Any Disputes"
              name="isLegalDispute"
              valuePropName="checked"
              onClick={() => {
                setShowDis(!showDis);
              }}
            >
              <Switch defaultChecked={false} size="small" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          {showDis ? (
            <Col span={24}>
              <Form.Item label="Describe about dispute" name="disputeDesc">
                <Input type="textarea" />
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </Card>

      <Card
        title="Land Details"
        style={{
          marginBottom: "20px",
          border: "1px solid #808080",
          paddingLeft: "15px",
        }}
      >
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={24}>
            <Form.Item
              label="Property Title"
              name="propertyTitle"
              rules={[
                {
                  required: true,
                  message: "Please provide any title!",
                },
              ]}
            >
              <Input
                type="text"
                style={{
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={24}>
            <Form.Item label="Property Description" name="description">
              {/* <Input
 style={{
 width: "70%",
 backgroundColor: "transparent",
 border: "1px solid lightgrey",
 }}
 /> */}
              <Input
                type="textarea"
                style={{
                  width: "80%",
                  backgroundColor: "transparent",
                  border: "1px solid lightgrey",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={24}>
            <Form.Item
              label="Please select one"
              name="landPurpose"
              labelCol={{ span: 6.5 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please select at least one option!",
                },
              ]}
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
          </Col>
        </Row>

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
                },
              ]}
            >
              <Checkbox.Group options={options} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        title="Address"
        style={{
          marginBottom: "20px",
          border: "1px solid #808080",
          paddingLeft: "15px",
        }}
      >
        <Row gutter={16} style={{ marginBottom: "-18px" }}>
          <Col span={24}>
            <Form.Item
              label="Do you have a Pincode?"
              name="pincode"
              valuePropName="checked"
              labelCol={{ span: 6.5 }}
              wrapperCol={{ span: 24 }}
            >
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={false}
                onChange={handlePincodeChange1}
              />
            </Form.Item>
          </Col>
        </Row>
        {!hasPincode ? (
          <>
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={12}>
                <Form.Item
                  label="Pincode"
                  name="pinCode"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input
                    onChange={handlePincodeChange}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid lightgrey",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Country" name="country">
                  <Input defaultValue={"India"} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={12}>
                <Form.Item label="State" name="state">
                  <Input defaultValue={"Andhra Pradesh"} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="District">
                  <Input value={addressDetails.district} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={12}>
                <Form.Item label="Mandal">
                  <Input value={addressDetails.mandal} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Village">
                  <Input value={addressDetails.village} readOnly />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={12}>
                <Form.Item label="Country" name="country">
                  <Input defaultValue="India" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="State" name="state">
                  <Input defaultValue="Andhra Pradesh" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={12}>
                <Form.Item
                  label="District"
                  name="district"
                  rules={[
                    { required: true, message: "Please select your district" },
                  ]}
                >
                  <Select
                    placeholder="Select your district"
                    onChange={handleDistrictChange}
                  >
                    <Option value="Visakhapatnam">Visakhapatnam</Option>
                    <Option value="Vizianagaram">Vizianagaram</Option>
                    <Option value="Srikakulam">Srikakulam</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mandal"
                  name="mandal"
                  rules={[
                    { required: true, message: "Please select your mandal" },
                  ]}
                >
                  <Select
                    placeholder="Select mandal"
                    value={selectedMandal}
                    onChange={handleMandalChange}
                  >
                    {mandals.map((mandal) => (
                      <Option key={mandal} value={mandal}>
                        {mandal}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={12}>
                <Form.Item
                  label="Village"
                  name="village"
                  rules={[
                    { required: true, message: "Please select your village" },
                  ]}
                >
                  <Select placeholder="Select village">
                    {villages.map((village) => (
                      <Option key={village} value={village}>
                        {village}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </Card>

      <Row gutter={16}>
        <Col span={10}>
          <Card
            title="Amenties"
            style={{
              marginBottom: "20px",
              border: "1px solid #808080",
              paddingLeft: "15px",
            }}
          >
            <Row gutter={16} style={{ marginBottom: "-18px" }}>
              <Col span={24} style={{ marginBottom: "-18px" }}>
                <Form.Item
                  label="Electricity"
                  name="isElectricity"
                  labelCol={{ span: 8.5 }}
                  wrapperCol={{ span: 24 }}
                  valuePropName="checked"
                >
                  <Switch defaultChecked={false} size="small" />
                </Form.Item>
              </Col>
              <Col span={24} style={{ marginBottom: "-18px" }}>
                <Form.Item
                  label="Water Facility"
                  name="isWaterFacility"
                  labelCol={{ span: 8.5 }}
                  wrapperCol={{ span: 24 }}
                  valuePropName="checked"
                >
                  <Switch defaultChecked={false} size="small" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Road faced"
                  name="isRoadFace"
                  labelCol={{ span: 8.5 }}
                  wrapperCol={{ span: 24 }}
                  valuePropName="checked"
                >
                  <Switch defaultChecked={false} size="small" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={14}>
          <Card
            title="Upload Photos"
            style={{
              border: "1px solid #808080",
              paddingLeft: "15px",
              height: "91.5%",
            }}
          >
            <Carousel arrows>
              {imageUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <Row gutter={16} style={{ marginTop: "10px" }}>
              <Col span={8}>
                <label htmlFor="upload-input">
                  <input type="file" onChange={handleImageUpload} />
                </label>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <FormItem>
        <Button
          type="primary"
          style={{ float: "right", marginRight: "-40%", marginBottom: "-20%" }}
          htmlType="submit"
        >
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default CommercialForm;
