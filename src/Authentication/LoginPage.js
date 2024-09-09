// import React, { useState } from "react";
// import {
//   Button,
//   Checkbox,
//   Col,
//   Form,
//   Input,
//   Modal,
//   Row,
//   Select,
//   message,
// } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const { Option } = Select;
// const LoginPage = ({ visible, handleLoginClose }) => {
//   const [postUrl, setPostUrl] = useState("");
//   const [triggerPost, setTriggerPost] = useState(false);
//   const [loginData, setLoginData] = useState();

//   const [registerData, setRegisterData] = useState({
//     firstName: "",
//     secondname: "",
//   });
//   const [isLoginVisible, setIsLoginVisible] = useState(true);
//   const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
//   const [firstname, setFirstName] = useState("");
//   const [secondname, setSecondName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [city, setCity] = useState("");
//   const [Role, setRole] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const showRegisterModal = () => {
//     setIsLoginVisible(false);
//     setIsRegisterModalVisible(true);
//   };

//   const formItemLayout = {
//     labelCol: {
//       xs: {
//         span: 24,
//       },
//       sm: {
//         span: 6,
//       },
//     },
//     wrapperCol: {
//       xs: {
//         span: 24,
//       },
//       sm: {
//         span: 14,
//       },
//     },
//   };

//   const handleLoginCancel = () => {
//     console.log("login cancel");

//     console.log("i am from login cancel");
//     handleLoginClose();
//   };

//   const handleRegisterCancel = () => {
//     console.log("i am from registration cancel");

//     setIsLoginVisible(true);
//     setIsRegisterModalVisible(false);
//     handleLoginClose();
//     //
//   };
//   const handleUsernameKeyPress = (event) => {
//     if (/[^a-zA-Z]/.test(event.key)) {
//       event.preventDefault();
//     }
//   };
//   const [messageApi, contextHolder] = message.useMessage();
//   const submitting = (values) => {
//     console.log(values);
//     const role = values.role[0];
//     delete values.role;
//     delete values.confirmPassword;
//     let finalValues = {
//       ...values,
//       state: "Andhra Pradesh",
//       country: "India",
//       profilePicture: "",
//       role: role,
//     };

//     axios
//       .post("http://172.17.15.53:3000/create", finalValues)
//       .then((res) => {
//         messageApi.open({
//           type: "success",
//           content: "Registration successful!",
//           duration: 3,
//         });
//         setIsLoginVisible(true);
//         if (res.status === 201) {
//           setIsRegisterModalVisible(false);
//           setIsLoginVisible(true);
//         }
//       })
//       .catch((error) => {
//         messageApi.open({
//           type: "error",
//           content: "Registration Failed!",
//           duration: 3,
//         });
//       });
//   };
//   const toggleModal = (e) => {
//     console.log(e, "97");
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   const onLogin = (values) => {
//     console.log(values);
//     setLoginData(values);
//     setPostUrl("users/login");
//     setTriggerPost(true);

//     axios
//       .post("http://172.17.15.53:3000/login", values)
//       .then((res) => {
//         messageApi.open({
//           type: "success",
//           content: "Login successful!",
//           duration: 3,
//         });
//         localStorage.setItem("token", res.data.token);
//         console.log("hi");
//         console.log(res);
//         const role = parseInt(res.data.role);
//         localStorage.setItem("role", res.data.role);
//         handleLoginClose();
//         if (role == 3) {
//           navigate("/dashboard");
//         } else if (role == 2) {
//           navigate("/dashboard");
//         } else if (role == 1) {
//           navigate("/dashboard");
//         }
//       })
//       .catch((error) => {
//         messageApi.open({
//           type: "error",
//           content: "Login Failed!",
//           duration: 3,
//         });
//       });
//   };
//   const [form] = Form.useForm();
//   const [passwordsMatch, setPasswordsMatch] = useState(false);

//   const onFieldsChange = () => {
//     const password = form.getFieldValue("password");
//     const confirmPassword = form.getFieldValue("confirmPassword");
//     setPasswordsMatch(
//       password && confirmPassword && password === confirmPassword
//     );
//   };
//   const Registration = () => {
//     const [componentVariant, setComponentVariant] = useState("filled");
//     const onFormVariantChange = ({ variant }) => {
//       setComponentVariant(variant);
//     };
//     return (
//       <>
//         <Form
//           onFieldsChange={onFieldsChange}
//           form={form}
//           {...formItemLayout}
//           onValuesChange={onFormVariantChange}
//           variant={componentVariant}
//           style={{
//             maxWidth: 600,
//           }}
//           onFinish={submitting}
//           initialValues={{
//             variant: componentVariant,
//           }}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="FirstName"
//                 name="firstName"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "First name is required",
//                   },
//                   {
//                     pattern: /^[A-Za-z\s]+$/,
//                     message: "First name can only contain alphabets and spaces",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter First name"
//                   onKeyPress={(e) => {
//                     if (!/^[A-Za-z\s]*$/.test(e.key)) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Last Name"
//                 name="lastName"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Last name is required",
//                   },
//                   {
//                     pattern: /^[A-Za-z\s]+$/,
//                     message: "Last name can only contain alphabets and spaces",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter Last name"
//                   onKeyPress={(e) => {
//                     if (!/^[A-Za-z\s]*$/.test(e.key)) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Phone Number"
//                 name="phoneNumber"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Contact number is required",
//                   },
//                   {
//                     pattern: /^[0-9]{10}$/,
//                     message: "Contact number must be exactly 10 digits",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Email"
//                 name="email"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input!",
//                   },
//                   {
//                     type: "email",
//                     message: "The input is not a valid E-mail!",
//                   },
//                 ]}
//               >
//                 <Input type="email" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={24}>
//               <Form.Item label="Role" name="role" labelCol={12} wrapperCol={24}>
//                 <Checkbox.Group>
//                   <Checkbox value="3">Buyer</Checkbox>
//                   <br></br>
//                   <Checkbox value="2">Seller</Checkbox>
//                   <br></br>
//                   <Checkbox value="1">Agent</Checkbox>
//                   <br></br>
//                 </Checkbox.Group>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="City" name="city" labelCol={12} wrapperCol={24}>
//                 <Select placeholder="Select a city">
//                   <Option value="Vizag">Vizag</Option>
//                   <Option value="Vizianagaram">Vizianagaram</Option>
//                   <Option value="BHogapuram">BHogapuram</Option>
//                   <Option value="Srikakulam">Srikakulam</Option>
//                   <Option value="Munjeru">Munjeru</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Pincode"
//                 name="pinCode"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Pincode is required",
//                   },
//                   {
//                     pattern: /^\d{6}$/,
//                     message: "Pincode must be exactly 6 digits",
//                   },
//                 ]}
//               >
//                 <Input maxLength={6} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="Password"
//                 name="password"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input!",
//                   },
//                 ]}
//               >
//                 <Input type="password" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 labelCol={12}
//                 wrapperCol={24}
//                 rules={[
//                   {
//                     required: true,
//                     message: "confirm password is required",
//                   },
//                 ]}
//               >
//                 <Input type="password" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={24}>
//               <p style={{ margin: "-10px", textAlign: "center" }}>
//                 Don't you have an account?
//                 <span
//                   style={{
//                     color: "#1890ff",
//                     cursor: "pointer",
//                     marginLeft: "18px",
//                   }}
//                   onClick={() => {
//                     setIsLoginVisible(true);
//                   }}
//                 >
//                   Login
//                 </span>
//               </p>

//               <Form.Item
//                 style={{
//                   marginTop: "20px",
//                   marginRight: "40px",
//                   float: "right",
//                 }}
//                 wrapperCol={{
//                   offset: 8,
//                   span: 16,
//                 }}
//               >
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   disabled={!passwordsMatch}
//                 >
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </>
//     );
//   };
//   return (
//     <>
//       {contextHolder}
//       <Modal
//         title={
//           isLoginVisible ? (
//             <p style={{ textAlign: "center" }}>Login</p>
//           ) : (
//             <p style={{ textAlign: "center" }}>Register</p>
//           )
//         }
//         visible={visible}
//         onCancel={isLoginVisible ? handleLoginCancel : handleRegisterCancel}
//         footer={null}
//         onOk={() => toggleModal(0, false)}
//       >
//         {isLoginVisible ? (
//           <Form
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             style={{
//               maxWidth: 400,
//               marginLeft: "-20px",
//             }}
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onLogin}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//           >
//             <Form.Item
//               label="Username"
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your username!",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>
//             <p style={{ margin: "-10px", textAlign: "center" }}>
//               Don't you have an account?
//               <span
//                 style={{
//                   color: "#1890ff",
//                   cursor: "pointer",
//                   marginLeft: "18px",
//                 }}
//                 onClick={showRegisterModal}
//               >
//                 Register
//               </span>
//             </p>
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item
//                   style={{ marginTop: "20px", float: "right" }}
//                   wrapperCol={{
//                     offset: 8,
//                     span: 16,
//                   }}
//                 >
//                   <Button type="primary" htmlType="submit">
//                     Submit
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         ) : (
//           <Registration />
//         )}
//       </Modal>
//     </>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const LoginPage = ({ visible, handleLoginClose }) => {
  const [postUrl, setPostUrl] = useState("");
  const [triggerPost, setTriggerPost] = useState(false);
  const [loginData, setLoginData] = useState();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    secondname: "",
  });
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [secondname, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [Role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const showRegisterModal = () => {
    setIsLoginVisible(false);
    setIsRegisterModalVisible(true);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const handleLoginCancel = () => {
    console.log("login cancel");

    console.log("i am from login cancel");
    handleLoginClose();
  };

  const handleRegisterCancel = () => {
    console.log("i am from registration cancel");

    setIsLoginVisible(true);
    setIsRegisterModalVisible(false);
    handleLoginClose();
  };
  const handleUsernameKeyPress = (event) => {
    if (/[^a-zA-Z]/.test(event.key)) {
      event.preventDefault();
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const submitting = (values) => {
    console.log(values);
    const role = values.role[0];
    delete values.role;
    let finalValues = {
      ...values,
      state: "Andhra Pradesh",
      country: "India",
      profilePicture: "",
      role: role,
    };

    axios
      .post("http://172.17.15.53:3000/create", finalValues)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Registration successful!",
          duration: 3,
        });
        setIsLoginVisible(true);
        if (res.status === 201) {
          setIsRegisterModalVisible(false);
          setIsLoginVisible(true);
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Registration Failed!",
          duration: 3,
        });
      });
  };
  const toggleModal = (e) => {
    console.log(e, "97");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onLogin = (values) => {
    console.log(values);
    setLoginData(values);
    setPostUrl("users/login");
    setTriggerPost(true);

    axios
      .post("http://172.17.15.53:3000/login", values)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Login successful!",
          duration: 3,
        });
        localStorage.setItem(`token${parseInt(res.data.role)}`, res.data.token);
        console.log("hi");
        console.log(res);
        const role = parseInt(res.data.role);
        localStorage.setItem("role", res.data.role);
        handleLoginClose();
        if (role == 3) {
          navigate("/dashboard");
        } else if (role == 2) {
          navigate("/dashboard");
        } else if (role == 1) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "Login Failed!",
          duration: 3,
        });
      });
  };
  const [form] = Form.useForm();
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const onFieldsChange = () => {
    const password = form.getFieldValue("password");
    const confirmPassword = form.getFieldValue("confirmPassword");
    setPasswordsMatch(
      password && confirmPassword && password === confirmPassword
    );
  };
  const Registration = () => {
    const [componentVariant, setComponentVariant] = useState("filled");
    const onFormVariantChange = ({ variant }) => {
      setComponentVariant(variant);
    };
    return (
      <>
        <Form
          onFieldsChange={onFieldsChange}
          form={form}
          {...formItemLayout}
          onValuesChange={onFormVariantChange}
          variant={componentVariant}
          // style={{
          // maxWidth: 500,
          // }}
          onFinish={submitting}
          initialValues={{
            variant: componentVariant,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="FirstName"
                name="firstName"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "First name is required",
                  },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "First name can only contain alphabets and spaces",
                  },
                ]}
              >
                <Input
                  placeholder="Enter First name"
                  onKeyPress={(e) => {
                    if (!/^[A-Za-z\s]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "Last name is required",
                  },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Last name can only contain alphabets and spaces",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Last name"
                  onKeyPress={(e) => {
                    if (!/^[A-Za-z\s]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "Contact number is required",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Contact number must be exactly 10 digits",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid E-mail!",
                  },
                ]}
              >
                <Input
                  type="email"
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="City" name="city" labelCol={12}>
                <Select
                  placeholder="Select a city"
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                >
                  <Option value="Vizag">Vizag</Option>
                  <Option value="Vizianagaram">Vizianagaram</Option>
                  <Option value="Bhogapuram">Bhogapuram</Option>
                  <Option value="Srikakulam">Srikakulam</Option>
                  <Option value="Munjeru">Munjeru</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Pincode"
                name="pinCode"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "Pincode is required",
                  },
                  {
                    pattern: /^\d{6}$/,
                    message: "Pincode must be exactly 6 digits",
                  },
                ]}
              >
                <Input
                  maxLength={6}
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <Input
                  type="password"
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                labelCol={12}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: "confirm password is required",
                  },
                ]}
              >
                <Input
                  type="password"
                  style={{
                    width: "70%",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "white",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Role" name="role" labelCol={12} wrapperCol={24}>
                <Checkbox.Group>
                  <Checkbox value="3">Buyer</Checkbox>
                  <br></br>
                  <Checkbox value="2">Seller</Checkbox>
                  <br></br>
                  <Checkbox value="1">Agent</Checkbox>
                  <br></br>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <p style={{ margin: "-10px", textAlign: "center" }}>
                Don't you have an account?
                <span
                  style={{
                    color: "#1890ff",
                    cursor: "pointer",
                    marginLeft: "18px",
                  }}
                  onClick={() => {
                    setIsLoginVisible(true);
                  }}
                >
                  Login
                </span>
              </p>

              <Form.Item
                style={{
                  marginTop: "20px",
                  marginRight: "80px",
                  float: "right",
                }}
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!passwordsMatch}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <Modal
        title={
          isLoginVisible ? (
            <p style={{ textAlign: "center" }}>Login</p>
          ) : (
            <p style={{ textAlign: "center" }}>Register</p>
          )
        }
        width={isLoginVisible ? 430 : 600}
        visible={visible}
        onCancel={isLoginVisible ? handleLoginCancel : handleRegisterCancel}
        footer={null}
        onOk={() => toggleModal(0, false)}
      >
        {isLoginVisible ? (
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 400,
              marginLeft: "-20px",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input style={{ width: "70%" }} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password style={{ width: "70%" }} />
            </Form.Item>
            <p style={{ margin: "-10px", textAlign: "center" }}>
              Don't you have an account?
              <span
                style={{
                  color: "#1890ff",
                  cursor: "pointer",
                  marginLeft: "18px",
                }}
                onClick={showRegisterModal}
              >
                Register
              </span>
            </p>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  style={{
                    marginTop: "20px",
                    float: "right",
                    marginRight: "30px",
                  }}
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          <Registration />
        )}
      </Modal>
    </>
  );
};

export default LoginPage;
