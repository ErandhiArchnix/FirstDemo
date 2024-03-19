import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import { toast } from "react-toastify";
import {
  GlobalStyle,
  Form,
  Title,
  FirstMsg,
  FormInput,
  Btn,
  BottomText,
  BoldTxt,
  ErrorMsg,
  Email,
  Password,
} from "../styles/componentStyles/LoginStyles";
import {
  Container,
  TopContainer,
  BottomContainer,
} from "../styles/pageStyles/AuthStyles";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import NavBar0 from "../components/NavBar0";

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  axios.defaults.withCredentials = true;

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit: async (values) => {
        try {
          dispatch({ type: "LOGIN_START" });

          const userData = {
            email: values.email,
            password: values.password,
          };

          const response = await axios.post(
            "http://localhost:8000/api/auth/login",
            userData
          );
          const user = response.data;
          console.log(user);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          navigate("/dashboard");
          toast.success(response.data.Status);
        } catch (error) {
          toast.error(error.response.data.message);
          dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        }
      },
    });

  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, [user, navigate]);

  return (
    <Container>
      <TopContainer>
        <NavBar0 />
      </TopContainer>

      <BottomContainer>
        <GlobalStyle />
        <Form onSubmit={handleSubmit} className="login">
          <Title>Login</Title>
          <FirstMsg>Welcome back</FirstMsg>

          <Email>
            <i className="email">
              <MdEmail size={18} />
            </i>
            <FormInput
              type="email"
              className={touched.email && errors.email ? "error" : ""}
              placeholder="Email"
              required
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

          {/* <ForgetPass>
               <BoldTxt>
                  <Link to="/login/forgetPassword">Forgot password?</Link>
               </BoldTxt>
            </ForgetPass> */}

          <Btn type="submit">Log in</Btn>

          <BottomText>
            <BoldTxt>
              Not registered yet? <Link to="/signup">Create an account</Link>
            </BoldTxt>
          </BottomText>
        </Form>
      </BottomContainer>
    </Container>
  );
}

export default Login;
