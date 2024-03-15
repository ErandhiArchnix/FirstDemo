import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext.js";
import { Container, BottomContainer } from "../styles/pageStyles/AuthStyles";
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
  BottomText,
  ButtonWrapper,
} from "../styles/componentStyles/Signup01Styles.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import PasswordInput from "../components/PasswordInput";

function Signup() {
  const { dispatch, formData } = useContext(AuthContext);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: formData[1]?.name || "",
        email: formData[1]?.email || "",
        password: formData[1]?.password || "",
        confirmPassword: formData[1]?.confirmPassword || "",
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

        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { step: 1, data: values },
        });
        dispatch({ type: "NEXT_STEP" });
      },
    });

  useEffect(() => {
    dispatch({ type: "LOGOUT" }); // Reset the state when the component unmounts
  }, [dispatch]);

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  return (
    <Container>
      <BottomContainer>
        <GlobalStyle />
        <Form onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <FirstMsg className="signup">
            Find your perfect travel guide. Start for free.
          </FirstMsg>

          <Name>
            <i>
              <BsFillPersonFill size={18} />
            </i>
            <FormInput
              type="text"
              className={touched.name && errors.name ? "error" : ""}
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </Name>

          <Email>
            <i>
              <MdEmail size={18} />
            </i>
            <FormInput
              type="email"
              className={touched.email && errors.email ? "error" : ""}
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
              className={
                touched.confirmPassword && errors.confirmPassword ? "error" : ""
              }
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
                <Link to="/signup/termsandconditions">terms & conditions</Link>
              </label>
            </BoldTxt>
          </TermsAndCoLink>
          <ButtonWrapper>
            <Btn onClick={handlePrevious}>Previous</Btn>
            <Btn>Next</Btn>
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

export default Signup;
