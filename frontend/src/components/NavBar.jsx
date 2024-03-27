import React from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
// import { FaChalkboardTeacher } from "react-icons/fa";
import { useState } from "react";
import {
  // CenterContainer,
  Container,
  Icon,
  // IconBtn,
  LeftContainer,
  Line,
  // LinkText,
  // LogoutBtn,
  NameContainer,
  RightContainer,
  Role,
  Username,
} from "../styles/componentStyles/NavBarStyles";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Navbar({ query, role, id }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };
  axios
    .get(`http://localhost:8000/api/user/getUser/${id}`)
    .then((res) => {
      console.log(res.data[0]);
      setUserName(res.data[0].user_name);
    })
    .catch((err) => console.log(err));

  return (
    <Container data-aos="fade-down">
      <LeftContainer>{query}</LeftContainer>
      <RightContainer>
        <Icon>
          <RiNotification2Fill />
        </Icon>
        <Line></Line>
        <Icon>
          <FaUserCircle />
        </Icon>

        <NameContainer onClick={handleProfile}>
          <Username style={{ cursor: "pointer" }}>{userName}</Username>
          <Role>{role}</Role>
        </NameContainer>
      </RightContainer>
    </Container>
  );
}
