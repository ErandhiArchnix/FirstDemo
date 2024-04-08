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
  EditButton,
  Modal,
  ModalContent,
  CloseButton,
  FormContainer,
  SaveButtton,
  Form,
  FormInput,
  Name,
  SelectWrapper,
  SelectInput,
  PhoneCover,
  LanguageWrapper,
} from "../styles/pageStyles/ProfilePageStyles";
import EditIcon from "@mui/icons-material/Edit";
import Multiselect from "multiselect-react-dropdown";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import countries from "country-list";
import PhoneInput from "react-phone-input-2";
const languagesIs = require("@cospired/i18n-iso-languages");
languagesIs.registerLocale(
  require("@cospired/i18n-iso-languages/langs/en.json")
);

function TravelerProfile({ id }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState([]);

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

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      name: userName,
      telephoneNumber: telephoneNumber,
      gender: gender,
      region: region,
      languages: languages,
    },
    onSubmit: async (values) => {
      const selectedLanguageNames = values.languages.map(
        (language) => language.name
      );

      const userData = {
        user_id: id,
        user_name: values.name,
        telephoneNumber: values.telephoneNumber,
        gender: values.gender,
        region: values.region,
        languages: selectedLanguageNames,
      };
      console.log(userData);
      try {
        const response = await axios.put(
          "http://localhost:8000/api/user/updateTravelerDetails",
          userData
        );
        const user = response.data;
        console.log("Sent to backend");
        console.log(user);
        toast.success("Traveler updated successfully");
        setIsModalOpen(false);
        window.location.reload();
      } catch (error) {
        if (error.response && error.response.data) {
          // Check if error.response exists and has data
          toast.error(error.response.data.message);
        }
      }
    },
  });

  useEffect(() => {
    setValues(() => ({
      // ...prevValues,
      name: userName,
      gender: gender,
      telephoneNumber: telephoneNumber,
      region: region,
      languages: languages,
    }));
  }, [userName, gender, languages, region, telephoneNumber, setValues]);

  // const handleSave = () => {};

  const countryOptions = countries
    .getNames()
    .map((country) => <option value={country}>{country}</option>);

  useEffect(() => {
    const languageNames = languagesIs.getNames("en");
    const optionsArray = Object.keys(languageNames).map((code, index) => ({
      name: languageNames[code],
      id: index + 1,
    }));
    setOptions(optionsArray);
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    handleChange({ target: { name: "languages", value: selectedList } });
  };

  const onRemove = (selectedList, removedItem) => {
    handleChange({ target: { name: "languages", value: selectedList } });
  };

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
          {isModalOpen && (
            <Modal>
              <ModalContent>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <FormContainer>
                  <Form onSubmit={handleSubmit}>
                    <Name>
                      {/* <i>
                        <BsFillPersonFill size={18} />
                      </i> */}
                      <FormInput
                        type="text"
                        // className={touched.name && errors.name ? "error" : ""}
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* {touched.name && errors.name && (
                        <ErrorMsg>{errors.name}</ErrorMsg>
                      )} */}
                    </Name>
                    <SelectWrapper>
                      <SelectInput
                        id="gender"
                        name="gender"
                        placeholder="Gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched.gender && errors.gender ? "error" : ""
                        }
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </SelectInput>
                      {/* {touched.gender && errors.gender && (
              <ErrorMsg>{errors.gender}</ErrorMsg>
            )} */}
                    </SelectWrapper>
                    <PhoneCover>
                      <PhoneInput
                        className={
                          touched.telephoneNumber && errors.telephoneNumber
                            ? "error"
                            : ""
                        }
                        id="telephoneNumber"
                        name="telephoneNumber"
                        value={values.telephoneNumber}
                        onChange={(value) => {
                          handleChange({
                            target: {
                              name: "telephoneNumber",
                              value: value,
                            },
                          });
                        }}
                        onBlur={(value) => {
                          handleBlur({
                            target: {
                              name: "telephoneNumber",
                              value: value,
                            },
                          });
                        }}
                        inputStyle={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "15px 60px",
                          fontSize: "1rem",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          boxShadow:
                            "inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2)",
                          transition: "box-shadow 0.2s ease-in",
                          height: "130%",
                        }}
                        placeholder="Phone Number"
                        containerStyle={{
                          width: "100%",
                          borderRadius: "10px",
                          border:
                            touched.telephoneNumber && errors.telephoneNumber
                              ? "2px solid #e7195a"
                              : "2px #777c88 solid",
                        }}
                        buttonStyle={{
                          borderRadius: "10px",
                        }}
                      />
                      {/* {touched.telephoneNumber && errors.telephoneNumber && (
                        <ErrorMsg>{errors.telephoneNumber}</ErrorMsg>
                      )} */}
                    </PhoneCover>

                    <SelectWrapper>
                      <SelectInput
                        className={
                          touched.region && errors.region ? "error" : ""
                        }
                        id="region"
                        name="region"
                        placeholder="Region"
                        value={values.region}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Region</option>
                        {countryOptions}
                      </SelectInput>
                      {/* {touched.region && errors.region && (
                        <ErrorMsg>{errors.region}</ErrorMsg>
                      )} */}
                    </SelectWrapper>

                    <LanguageWrapper>
                      <Multiselect
                        options={options}
                        selectedValues={values.languages}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                        className={
                          touched.languages && errors.languages ? "error" : ""
                        }
                        id="languages"
                        name="languages"
                        placeholder="Languages"
                        value={values.languages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          multiselectContainer: {
                            width: "100%",
                            height: "100%",
                            padding: "0px 0px 0px 40px",
                            fontSize: "1rem",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            boxShadow:
                              "inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2)",
                            transition: "box-shadow 0.2s ease-in",
                            border: "2px #777c88 solid",
                          },
                          searchBox: {
                            width: "100%",
                            padding: "10px 10px",
                            fontSize: "1rem",
                            borderRadius: "10px",
                            backgroundColor: "white",
                          },
                          option: {
                            backgroundColor: "#ffffff",
                            color: "#333",
                          },
                          chips: {
                            backgroundColor: "#eb7c7c",
                            fontSize: "14px",
                            height: "28px",
                          },
                          optionContainer: {
                            width: "100%",
                          },
                        }}
                      />
                    </LanguageWrapper>
                  </Form>
                </FormContainer>
                <SaveButtton onClick={handleSubmit}>Save</SaveButtton>
              </ModalContent>
            </Modal>
          )}
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
          <CalenderContainer>
            <Topic>Calender</Topic>
          </CalenderContainer>
          <GalleryContainer>
            <Topic>Gallery</Topic>
          </GalleryContainer>
        </RightContainer>
      </BottomContainer>
    </Container>
  );
}

export default TravelerProfile;
