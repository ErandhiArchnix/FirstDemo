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
import { CenterContainer, Container, Icon, IconBtn, LeftContainer, Line, LinkText, LogoutBtn, NameContainer, RightContainer, Role, Username } from "../styles/componentStyles/NavBarStyles";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";


export default function Navbar({ query }) {
  const teacher = true;
  const [show, setShow] = useState(false);
  const [ isProfile , setIsProfile] = useState(false)

  const navigate = useNavigate()

  
  const { user,dispatch } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProfile = () => {
    setIsProfile(true);
    navigate("/profile");

  }
  return (
    <Container data-aos="fade-down">
      <LeftContainer>{isProfile? query = "User Profile": query}</LeftContainer>
      
      <RightContainer>
        <Icon>
          <RiNotification2Fill />
        </Icon>
        <Line></Line>
        <Icon>
          <FaUserCircle />
        </Icon>
        
        <NameContainer onClick={handleProfile}>
          <Username style={{cursor:'pointer'}}>{user.username}</Username>
          <Role>{user.isTeacher ? 'Teacher' : 'Student'}</Role>
        </NameContainer>
      </RightContainer>
    </Container>
  );
}