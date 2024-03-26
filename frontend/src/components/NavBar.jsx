import React, { useContext } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  CenterContainer,
  Container,
  Icon,
  IconBtn,
  LeftContainer,
  Line,
  LinkText,
  LogoutBtn,
  NameContainer,
  RightContainer,
  Role,
  Username,
} from "../styles/componentStyles/NavBarStyles";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Navbar({ query, role, id }) {
  const teacher = true;
  const [show, setShow] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProfile = () => {
    setIsProfile(true);
    navigate("/profile");
  };
  axios
    .get(`http://localhost:8000/api/user/getUser/${id}`)
    .then((res) => {
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
