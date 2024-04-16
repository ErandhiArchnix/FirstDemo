import React, { useState } from "react";
import OtpInput from "react-otp-input";
import {
  Container,
  MiddleContainer,
  Top,
  SpanContainer,
  Text,
  VerifyButton,
} from "../styles/pageStyles/otpConfirmationStyles";
import Button from "@mui/material/Button";
import { btnStyles } from "../styles/componentStyles/NavBar0Styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OtpConfirm() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const token = window.location.pathname.split("/").pop();

  const handleClick = () => {
    const request = {
        otp: otp,
      };
    console.log(otp);
    axios.put(`http://localhost:8000/api/auth/confirmation/otp/${token}`, request).then((res) => {
          if (res.data.Status === "User Confirmed. Please Login") {
            console.log(res.data.Status);
            toast.success(res.data.Status);
            navigate("/login");
            return;
          } else {
            console.log(res.data.error);
            toast.error(res.data.error);
            
          }
        });
  };

  return (
    <Container>
      <MiddleContainer>
        <Top>Enter Your OTP</Top>
        <SpanContainer>
          <Text>Check your inbox for the OTP</Text>
        </SpanContainer>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            display: "flex",
            width: "100px", // Adjust width as needed
            height: "100px", // Adjust height as needed
            fontSize: "50px", // Adjust font size as needed
            textAlign: "center",
            margin: "10px 10px", // Adjust margin as needed
            border: "2px solid #ccc", // Adjust border as needed
            borderRadius: "5px", // Adjust border radius as needed
          }}
        />
        <VerifyButton>
          <Button onClick={handleClick} sx={btnStyles} variant="contained">
            Confirm
          </Button>
        </VerifyButton>
      </MiddleContainer>
    </Container>
  );
}
