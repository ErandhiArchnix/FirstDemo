import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TopContainer,
  UserDetails,
  SubUserDetails,
  Topic,
  DetailsCard,
  Label,
  Details,
  RightContainer,
  CalenderContainer,
  GalleryContainer,
  BottomContainer,
  BasicInfo,
  ImageContainer,
  InfoContainer,
  UserName,
  Role,
  ButtonContainer,
  EditButton
} from "../styles/pageStyles/ProfilePageStyles";
import EditIcon from '@mui/icons-material/Edit';

function TravelerProfile({ id }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/getUser/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserName(res.data[0].user_name);
        const userData = {};
        res.data.forEach((user) => {
          const userId = user.user_id;
          if (!userData[userId]) {
            // If the user ID is not already in userData, initialize it
            userData[userId] = { ...user, languages: [] };
          }
          userData[userId].languages.push({
            name: user.language_name,
          });
        });
        console.log(userData);
        setEmail(res.data[0].email);
        setRegion(res.data[0].region);
        setTelephoneNumber(res.data[0].phone_number);
        setGender(res.data[0].gender);
        setLanguages(userData[id].languages);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <TopContainer>
        <BasicInfo>
          <ImageContainer />
          <InfoContainer>
            <UserName>{userName}</UserName>
            <Role>Traveler</Role>
          </InfoContainer>
          <ButtonContainer>
            <EditButton onClick={openModal}>
                <EditIcon />
            </EditButton>
          </ButtonContainer>
        </BasicInfo>
      </TopContainer>
      <BottomContainer>
        <UserDetails>
          <SubUserDetails>
            <Topic>User Details</Topic>
            <DetailsCard>
              <Label>Email</Label>
              <Details>{email}</Details>
            </DetailsCard>
            <DetailsCard>
              <Label>Region</Label>
              <Details>{region}</Details>
            </DetailsCard>
            <DetailsCard>
              <Label>Telephone Number</Label>
              <Details>{telephoneNumber}</Details>
            </DetailsCard>
            <DetailsCard>
              <Label>Gender</Label>
              <Details>{gender}</Details>
            </DetailsCard>
            <DetailsCard>
              <Label>Languages</Label>
              <Details>
                {languages.map((language) => language.name).join(", ")}
              </Details>
            </DetailsCard>
          </SubUserDetails>
        </UserDetails>
        <RightContainer>
          <CalenderContainer>grt</CalenderContainer>
          <GalleryContainer>hy</GalleryContainer>
        </RightContainer>
      </BottomContainer>
    </Container>
  );
}

export default TravelerProfile;
