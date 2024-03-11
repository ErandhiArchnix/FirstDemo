import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar0 } from "../components/NavBar0";
import {Container, TopContainer, BottomContainer} from  "../styles/pageStyles/AuthStyles";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { AuthContext } from "../context/AuthContext"; 
// import axios from "axios";
// import { toast } from "react-toastify";
// import { MdEmail } from "react-icons/md";
// import { BsFillPersonFill } from "react-icons/bs";


function signup() {
  return (
    <Container>
        <TopContainer>
            <NavBar0 />
        </TopContainer>
        <BottomContainer>

        </BottomContainer>
    </Container>
  )
}

export default signup