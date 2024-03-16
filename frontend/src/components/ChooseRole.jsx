import React from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext.js";
// import { Container, BottomContainer } from "../styles/pageStyles/AuthStyles";
import {
  GlobalStyle,
} from "../styles/componentStyles/ChooseRoleStyles.js";
import { Container, BottomContainer } from "../styles/pageStyles/AuthStyles";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { MdEmail } from "react-icons/md";
// import { BsFillPersonFill } from "react-icons/bs";
// import PasswordInput from "../components/PasswordInput";

function ChooseRole() {
  return (
    <Container>
      <BottomContainer>
        <GlobalStyle />
        Choose
      </BottomContainer>
    </Container>
  );
}

export default ChooseRole