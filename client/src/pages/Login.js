import "../styles/RegiserStyles.css";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const onfinishHandler = async (values) => {
    try {
      // Check if recaptchaToken exists
      if (!recaptchaToken) {
        message.error("Please complete the reCAPTCHA challenge.");
        return;
      }

      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", { ...values, recaptchaToken });
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="log">
      <h1 className="text-center">Doctor Appointment System</h1>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Login From</h3>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <ReCAPTCHA
            sitekey="6LfUD8gpAAAAACDFUDuFTygpXaxP2tAm4dXs7kz6"
            onChange={onRecaptchaChange}
          />
          <Link to="/register" className="m-2">
            New user Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

