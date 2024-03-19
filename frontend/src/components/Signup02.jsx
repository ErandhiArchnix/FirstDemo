import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { Container, BottomContainer } from "../styles/pageStyles/AuthStyles";
import {
  GlobalStyle,
  Form,
  Title,
  FirstMsg,
  Region,
  FormInput,
  ErrorMsg,
  TermsAndCoLink,
  CustomCheck,
  BoldTxt,
  Btn,
  BottomText,
  ButtonWrapper,
  SelectWrapper,
  PhoneCover,
} from "../styles/componentStyles/Signup02Styles.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Signup02() {
  const navigate = useNavigate();
  const { dispatch, formData } = useContext(AuthContext); // Access the dispatch function from the AuthContext

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleTPChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: formData[1]?.name || "",
        email: formData[1]?.email || "",
        password: formData[1]?.password || "",
        confirmPassword: formData[1]?.confirmPassword || "",
        gender: formData[2]?.gender || "",
        telephoneNumber: phoneNumber || "",
        region: formData[2]?.region || "",
        agreedToTerms: false,
      },
      validationSchema: Yup.object({
        gender: Yup.string().required("Gender is required"),
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
          phone_number: phoneNumber,
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
            toast.success("Check your mailbox to confirm email.");
            navigate("/login");
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
    console.log(phoneNumber);
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
            <select
              id="gender"
              name="gender"
              placeholder="Gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {touched.gender && errors.gender && (
              <ErrorMsg>{errors.gender}</ErrorMsg>
            )}
          </SelectWrapper>

          <PhoneCover>
            Phone Number:
            <PhoneInput
              country={"us"}
              className={
                touched.telephoneNumber && errors.telephoneNumber ? "error" : ""
              }
              value={values.telephoneNumber}
              onChange={handleTPChange}
              onBlur={handleBlur}
            />
            {!valid && <ErrorMsg>Please enter a valid phone number.</ErrorMsg>}
          </PhoneCover>

          <Region>
            <FormInput
              type="text"
              id="region"
              name="region"
              className={touched.region && errors.region ? "error" : ""}
              placeholder="Region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.region && errors.region && (
              <ErrorMsg>{errors.region}</ErrorMsg>
            )}
          </Region>

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
            <Btn type="submit">Sign Up</Btn>
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
