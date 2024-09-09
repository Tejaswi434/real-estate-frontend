import { Button, Form, notification } from 'antd'
import React, { useState } from 'react'
import OwnerDetails from './OwnerDetails'
import FlatDetails from './FlatDetails'
import Amenities from './Amenities'
import Address from './Address'
import axios from 'axios'

const ResidentialForm = ({setShowFormType}) => {
    const [token,setToken]=useState(localStorage.getItem(`token${localStorage.getItem("role")}`))
    const [addressDetails, setAddressDetails] = useState({
      country: "India",
      state: "Andhra Pradesh",
      district: "",
      mandal: "",
      village: "",
    });
    const [imageUrls, setImageUrls] = useState([]);
    const openNotification = (type, message, description) => {
        notification[type]({
          message: message,
          description: description,
          placement: "topRight",
          duration: 3,
        });
      };

    const handleAddress = (address => {
        console.log("Hello from residential js");
        setAddressDetails(address);
        console.log(address);
      })
    const handleuploadPics = (imageUrls1) => {
        console.log("From residential js", imageUrls1);
        setImageUrls(imageUrls1);
        console.log("imageUrls", imageUrls);
      }

    const onFinish = async (values) => {

        console.log("from on finish", imageUrls);
        console.log("hi fro on finish")
        let object = {
          propertyType: values.propertyType,
          owner: {
            ownerName: values.ownerName,
            ownerEmail: values.ownerEmail,
            contact: values.contact,
          },
          propertyDetails:
          {
            apartmentName: values.apartmentName,
            flatNumber: values.apartmentNumber,
            apartmentLayout: values.apartmentLayout,
            flatSize: values.flatSize,
            flatCost: values.flatCost,
            totalCost: values.totalCost,
            flatFacing: values.flatFacing,
            furnitured: values.furnitured,
            propDesc:values.propDesc
          },
    
          amenities:
          {
            powerSupply: values.powerSupply,
            waterFacility: values.waterFacility,
            electricityFacility: values.electricityFacility,
            elevator: values.elevator,
            watchman: values.watchman,
            cctv: values.cctv,
            medical: values.medical,
            religious: values.religious,
            educational: values.educational,
            grocery: values.grocery,
            gymFacility: values.gymFacility,
          },
    
          propPhotos: imageUrls,
          address: addressDetails
        };
        console.log("I am hello from middle");
        try {
          const response = await axios.post(
            "http://172.17.15.53:3000/residential/add",
            object,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Property added successfully:", response.data);
          openNotification(
            "success",
            "Form submitted successfully!",
            "Your form has been submitted without any issues."
          );
          // handleCloseForm()
          setShowFormType(null);
        } catch (error) {
          openNotification(
            "error",
            "Submission failed",
            "There was an error while submitting your form."
          );
          console.error(
            "Error adding property:",
            error.response ? error.response.data : error.message
          );
        }
      };

  return (
    <Form
              layout="vertical"
              onFinish={onFinish}
              className="residential-form"
            >
              <div className="form-cards">
                <OwnerDetails />
                <FlatDetails />
                <Amenities handleuploadPics={handleuploadPics} />
                <Address
                  onAddressChange={handleAddress}
                />
                <Form.Item className="form-item-submit">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
  )
}

export default ResidentialForm
