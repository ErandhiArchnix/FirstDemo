import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { Container, BottomContainer } from "../styles/pageStyles/AuthStyles";
import {
  GlobalStyle,
  Form,
  Title,
  FirstMsg,
  ErrorMsg,
  TermsAndCoLink,
  CustomCheck,
  BoldTxt,
  Btn,
  BottomText,
  ButtonWrapper,
  SelectWrapper,
  PhoneCover,
  SelectInput,
} from "../styles/componentStyles/Signup02Styles.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import WcIcon from "@mui/icons-material/Wc";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import countries from "country-list";

function Signup02() {
  const navigate = useNavigate();
  const { dispatch, formData } = useContext(AuthContext); // Access the dispatch function from the AuthContext

  const countryOptions = countries
    .getNames()
    .map((country) => <option value={country}>{country}</option>);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: formData[1]?.name || "",
        email: formData[1]?.email || "",
        password: formData[1]?.password || "",
        confirmPassword: formData[1]?.confirmPassword || "",
        gender: formData[2]?.gender || "",
        telephoneNumber: formData[2]?.telephoneNumber || "",
        region: formData[2]?.region || "",
        agreedToTerms: false,
      },
      validationSchema: Yup.object({
        gender: Yup.string().required("Gender is required"),
        telephoneNumber: Yup.string().required("Telephone number is required").matches(
          /^\+?[1-9]\d{1,14}$/,
          "Please enter a valid phone number"
        ),
        region: Yup.string().required("Region is required"),
      }),
      onSubmit: async (values) => {
        if (values.agreedToTerms === false) {
          return toast.error("Please accept terms and conditions");
        }

        const userData = {
          user_name: values.name,
          email: values.email,
          password: values.password,
          gender: values.gender,
          phone_number: values.telephoneNumber,
          region: values.region,
          user_type: localStorage.getItem("selectedRole"),
        };

        console.log(userData);

        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/signup",
            userData
          );
          const user = response.data;
          console.log("Sent to backend");
          console.log(user);
          if (user) {
            // console.log(confirm.data.Status);
            console.log(user);
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            toast.success("Check your mailbox to confirmation email.");
            console.log(response.data.Status);
            localStorage.setItem("emailtoken", response.data.token);
            const token = localStorage.getItem("emailtoken");
            navigate(`confirmation/otp/${token}`);
            localStorage.removeItem("emailtoken");
          }
        } catch (error) {
          if (error.response && error.response.data) {
            // Check if error.response exists and has data
            toast.error(error.response.data.message);
            dispatch({
              type: "LOGIN_FAILURE",
              payload: error.response.data.message,
            });
          }
        }
      },
    });

  const handlePrevious = () => {
    console.log(formData[2]?.gender);
    console.log(formData[1]?.name);
    console.log(formData[2]?.telephoneNumber);
    dispatch({ type: "PREVIOUS_STEP" });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { step: 2, data: values },
    });
  };

  // useEffect(() => {
  //   dispatch({ type: "LOGOUT" }); // Reset the state when the component unmounts
  // }, [dispatch]);

  return (
    <Container>
      <BottomContainer>
        <GlobalStyle />
        <Form onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <FirstMsg className="signup">
            Complete your details for better service.
          </FirstMsg>

          <SelectWrapper>
            <i>
              <WcIcon size={18} />
            </i>
            <SelectInput
              id="gender"
              name="gender"
              placeholder="Gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.gender && errors.gender ? "error" : ""}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </SelectInput>
            {touched.gender && errors.gender && (
              <ErrorMsg>{errors.gender}</ErrorMsg>
            )}
          </SelectWrapper>

          <PhoneCover>
            <PhoneInput
              className={
                touched.telephoneNumber && errors.telephoneNumber ? "error" : ""
              }
              id="telephoneNumber"
              name= "telephoneNumber"
              value={values.telephoneNumber}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "telephoneNumber",
                    value: value,
                  },
                });
              }}
              onBlur={(value) => {
                handleBlur({
                  target: {
                    name: "telephoneNumber",
                    value: value,
                  },
                });
              }}
              inputStyle={{
                width: "100%",
                boxSizing: "border-box",
                padding: "15px 60px",
                fontSize: "1rem",
                borderRadius: "10px",
                marginBottom: "10px",
                boxShadow: "inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2)",
                transition: "box-shadow 0.2s ease-in",
                height: "130%",
                
              }}
              placeholder="Phone Number"
              containerStyle={{
                width: "100%",
                borderRadius: "10px",
                border:
                  touched.telephoneNumber && errors.telephoneNumber
                    ? "2px solid #e7195a" // Apply error border style
                    : "2px #777c88 solid",
              }}
              buttonStyle={{
                borderRadius: "10px",
              }}
            />
            {touched.telephoneNumber && errors.telephoneNumber && (
              <ErrorMsg>{errors.telephoneNumber}</ErrorMsg>
            )}
          </PhoneCover>

          <SelectWrapper>
            <i>
              <SouthAmericaIcon size={18} />
            </i>
            <SelectInput
              className={touched.region && errors.region ? "error" : ""}
              id="region"
              name="region"
              placeholder="Region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Region</option>
              {countryOptions}
            </SelectInput>
            {touched.region && errors.region && (
              <ErrorMsg>{errors.region}</ErrorMsg>
            )}
          </SelectWrapper>

          <TermsAndCoLink>
            <CustomCheck
              type="checkbox"
              id="customCheck1"
              name="agreedToTerms"
              value={values.agreedToTerms}
              onChange={handleChange}
            />
            &nbsp;
            <BoldTxt>
              <label className="boldTxt">
                I agree to the{" "}
                <Link to="/signup/termsandconditions">terms & conditions</Link>
              </label>
            </BoldTxt>
          </TermsAndCoLink>

          <ButtonWrapper>
            <Btn onClick={handlePrevious}>Previous</Btn>
            <Btn type="submit" disabled={!values.agreedToTerms}>Sign Up</Btn>
          </ButtonWrapper>

          <BottomText>
            <BoldTxt>
              Already have an account? <Link to="/login"> Log in</Link>
            </BoldTxt>
          </BottomText>
        </Form>
      </BottomContainer>
    </Container>
  );
}

export default Signup02;
