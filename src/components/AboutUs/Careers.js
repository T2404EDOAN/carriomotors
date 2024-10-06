import React, { useState } from "react";
import "../../assets/styles/Careers.css";
import anhe from "../../assets/images/Mec_images/anhe.jpg";
import { Input, Typography, Checkbox, Button, message } from "antd";
import axios from "axios";
const { TextArea } = Input;

const Careers = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "",
    questions: "",
  });
  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "firstName":
        if (!value) errorMessage = "First Name is required.";
        break;
      case "lastName":
        if (!value) errorMessage = "Last Name is required.";
        break;
      case "email":
        if (!value) {
          errorMessage = "Email is required.";
        } else if (!validateEmail(value)) {
          errorMessage = "Email is not valid.";
        }
        break;
      case "phone":
        if (!value) errorMessage = "Phone number is required.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  const handleCheckBox = (e) => {
    setFormData({ ...formData, contactMethod: e.target.value });
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      message.error("Please fix the errors in the form.");
      return;
    }
    try {
      const response = await axios.post(
        "https://carriomotors.io.vn/api/get_contact.php",
        new URLSearchParams(formData)
      );
      console.log(response.status);
      if (response.status == "200") {
        message.success("du lieu da duoc day");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          contactMethod: "",
          questions: "",
        });
        setErrors({});
      } else {
        message.error("ko gui dc du lieu");
      }
    } catch (error) {
      message.error("co loi gi do xay ra");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) {
      formErrors.firstName = "First Name is required.";
    }
    if (!formData.lastName) {
      formErrors.lastName = "Last Name is required.";
    }
    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Email is not valid.";
    }
    if (!formData.phone) {
      formErrors.phone = "Phone number is required.";
    }
    if (!formData.contactMethod) {
      formErrors.contactMethod = "Please select a contact method.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };
  return (
    <div className="careers-main-container">
      <div className="careers-left">
        <img src={anhe} alt="anhe" />
      </div>
      <div className="careers-right">
        <div className="title-careers1">
          Experience the ease of online shopping.
        </div>
        <div className="title-carees2">
          The Carriomotors showroom experience – now in your own home. To
          continue shopping for your Carriomotors online, please provide some
          additional information.
        </div>
        <div
          className="line1"
          style={{ borderBottom: "1px solid lightgray", width: "100%" }}
        ></div>
        <div className="information">Information</div>
        <div className="inputcar-info">
          <Typography.Title level={5}>
            First Name<sub className="star1">*</sub>
          </Typography.Title>
          <Input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInput}
          />
        </div>
        {errors.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}
        <div className="inputcar-info">
          <Typography.Title level={5}>
            Last Name<sub className="star1">*</sub>
          </Typography.Title>
          <Input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInput}
          />
        </div>
        {errors.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}
        <div className="inputcar-info">
          <Typography.Title level={5}>
            Email Address<sub className="star1">*</sub>
          </Typography.Title>
          <Input
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
        </div>
        {errors.email && <div className="error-message">{errors.email}</div>}
        <div className="inputcar-info">
          <Typography.Title level={5}>
            Phone<sup className="star">*</sup>
          </Typography.Title>
          <Input
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInput}
          />
        </div>
        {errors.phone && <div className="error-message">{errors.phone}</div>}
        <div className="method">
          What is your preferred contact method?<sup className="star">*</sup>
        </div>
        <div>
          <Checkbox
            value="Call"
            checked={formData.contactMethod === "Call"}
            onChange={handleCheckBox}
          >
            Call
          </Checkbox>
          <Checkbox
            value="Email"
            checked={formData.contactMethod === "Email"}
            onChange={handleCheckBox}
          >
            Email
          </Checkbox>
        </div>
        {errors.contactMethod && (
          <div className="error-message">{errors.contactMethod}</div>
        )}
        <div className="ques">
          Any questions or special requests? (Optional)
          <sup className="star">*</sup>
        </div>
        <Input.TextArea
          placeholder="Controlled autosize"
          name="questions"
          value={formData.questions}
          onChange={handleInput}
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />

        <div className="end">
          We respect your privacy. When you submit your contact information, we
          agree to only contact you in accordance with our Privacy Policy.
        </div>
        <div
          className="line2"
          style={{ borderBottom: "1px solid lightgray", width: "100%" }}
        ></div>
        <div className="button">
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Careers;
