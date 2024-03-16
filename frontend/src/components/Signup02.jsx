import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar0 from "../components/NavBar0";
import { AuthContext } from "../context/AuthContext.js";
import {Container, TopContainer, BottomContainer} from  "../styles/pageStyles/AuthStyles";
import {
  GlobalStyle,
  Form,
  Title,
  FirstMsg,
  Name,
  FormInput,
  ErrorMsg,
  Email,
  Password,
  TermsAndCoLink,
  CustomCheck,
  BoldTxt,
  Btn,
  BottomText
} from "../styles/componentStyles/AuthStyles";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import axios from "axios";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import PasswordInput from "../components/PasswordInput";

function Signup02() {

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Access the dispatch function from the AuthContext

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
          "please create a stronger password"
        ),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      if (values.agreedToTerms === false) {
        return toast.error("Please accept terms and conditions");
      }
    
      const userData = {
        user_name: values.name,
        email: values.email,
        password: values.password,
      };
    
      try {
        const response = await axios.post("http://localhost:8000/api/auth/signup", userData);
        const user = response.data;
        console.log("Sent to backend")
        if (user) {
          console.log(user);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          navigate("/"); // Redirect to the desired route after successful signup
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Check if error.response exists and has data
          toast.error(error.response.data.message);
          dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
        }
      }
    },    
  });

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  useEffect(() => {
    dispatch({ type: "LOGOUT" }); // Reset the state when the component unmounts
  }, [dispatch]);

  return (
    <Container>
        <BottomContainer>
          <GlobalStyle />
          <Form onSubmit={handleSubmit}>
              <Title>Sign Up</Title>
              <FirstMsg className="signup">
                Compete your details for better service.
              </FirstMsg>

              <Name>
                <i>
                    <BsFillPersonFill size={18} />
                </i>
                <FormInput
                    type="text"
                    className={
                      touched.name && errors.name ? "error" : ""
                    }
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                    <ErrorMsg>{errors.name}</ErrorMsg>
                )}
              </Name>

              <Email>
                <i>
                    <MdEmail size={18} />
                </i>
                <FormInput
                    type="email"
                    className={touched.email &&errors.email ? "error" : ""}
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                    <ErrorMsg>{errors.email}</ErrorMsg>
                )}
              </Email>

              <Password>
                <PasswordInput
                    className={touched.password && errors.password ? "error" : ""}
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                    <ErrorMsg>{errors.password}</ErrorMsg>
                )}
              </Password>

              <Password>
                <PasswordInput
                    className={touched.confirmPassword && errors.confirmPassword ? "error" : ""}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onPaste={(e) => {
                      e.preventDefault();
                      toast.error("Cannot paste password");
                      return false;
                    }}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                    <ErrorMsg>{errors.confirmPassword}</ErrorMsg>
                )}
              </Password>

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
                      <Link to="/signup/termsandconditions">
                          terms & conditions
                      </Link>
                    </label>
                </BoldTxt>
              </TermsAndCoLink>

              <Btn disabled={isSubmitting} type="submit">
                Sign Up
              </Btn>

              <button onClick={handlePrevious}>Previous</button>

              <button onClick={handlePrevious}>Previous</button>

              <BottomText>
                <BoldTxt>
                    Already have an account? <Link to="/login"> Log in</Link>
                </BoldTxt>
              </BottomText>
          </Form>
        </BottomContainer>
    </Container>
  )
}

export default Signup02