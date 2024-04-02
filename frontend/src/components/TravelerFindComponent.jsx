import React, { useState, useEffect } from "react";
import {
  Container,
  TopContainer,
  FilterContainer,
  MapContainer,
  Map,
  Form,
  FirstMsg,
  Btn,
  ButtonWrapper,
  Wrapper,
  SelectWrapper,
  SelectInput,
  ErrorMsg,
  RangeWrapper,
  BottomContainer,
  ResultContainer,
  ResultBar,
  ImageContainer,
  InfoContainer,
  Region,
  UserName,
  Icon,
} from "../styles/componentStyles/TravelerFindComponentStyles";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import NumericInput from "react-numeric-input";

const languagesIs = require("@cospired/i18n-iso-languages");
languagesIs.registerLocale(
  require("@cospired/i18n-iso-languages/langs/en.json")
);

function TravelerFindPage() {
  const [languages, setLanguages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: {
        gender: "",
        region: [],
        languages: [],
        range: null,
        specialties: [],
      },
      onSubmit: async (values) => {
        const selectedLanguageNames = values.languages.map(
          (language) => language.name
        );

        const selectedRegionNames = values.region.map((region) => region.name);

        const selectedSpecialtyNames = values.specialties.map(
          (specialty) => specialty.name
        );

        const token = localStorage.getItem("token");

        const filterData = {
          gender: values.gender,
          region: selectedRegionNames,
          languages: selectedLanguageNames,
          range: values.range,
          specialties: selectedSpecialtyNames,
        };

        console.log(filterData);

        try {
          const response = await axios.post(
            "http://localhost:8000/api/search/filterUsers",
            filterData,
            { headers: { Authorization: token } }
          );
          const user = response.data;
          console.log("Sent to backend");
          console.log(user);
          // Assuming response.data contains the array of user objects
          const userData = {};

          response.data.forEach((user) => {
            const userId = user.user_id;
            if (!userData[userId]) {
              // If the user ID is not already in userData, initialize it
              userData[userId] = { ...user, specialties: [], languages: [] };
            }
            // Add specialties and languages to the respective arrays
            userData[userId].specialties.push({
              id: user.specialty_id,
              name: user.specialty_name,
            });
            userData[userId].languages.push({
              id: user.language_id,
              name: user.language_name,
            });
          });

          // Convert the object into an array of user objects
          setFilteredUsers(Object.values(userData));

          setLocations(
            response.data.map((item) => ({
              lat: item.latitude,
              lng: item.longitude,
            }))
          );
          console.log(locations);
        } catch (error) {
          if (error.response && error.response.data) {
            // Check if error.response exists and has data
            toast.error(error.response.data.message);
          }
        }
      },
    });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/search/getAllLanguages")
      .then((res) => {
        console.log(res.data);
        const optionsArray = res.data.map((item, index) => ({
          name: item.language_name,
          id: index + 1,
        }));
        console.log(optionsArray);
        setLanguages(optionsArray);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/search/getAllRegions")
      .then((res) => {
        console.log(res.data);
        const optionsArray = res.data.map((item, index) => ({
          name: item.region,
          id: index + 1,
        }));
        console.log(optionsArray);
        setRegions(optionsArray);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/search/getAllSpecialties")
      .then((res) => {
        console.log(res.data);
        const optionsArray = res.data.map((item, index) => ({
          name: item.specialty_name,
          id: index + 1,
        }));
        console.log(optionsArray);
        setSpecialties(optionsArray);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  const onRegionSelect = (selectedList) => {
    handleChange({ target: { name: "region", value: selectedList } });
  };

  const onRegionRemove = (selectedList) => {
    handleChange({ target: { name: "region", value: selectedList } });
  };

  const onLanguageSelect = (selectedList) => {
    handleChange({ target: { name: "languages", value: selectedList } });
  };

  const onLanguageRemove = (selectedList) => {
    handleChange({ target: { name: "languages", value: selectedList } });
  };

  const onSpecialtySelect = (selectedList) => {
    handleChange({ target: { name: "specialties", value: selectedList } });
  };

  const onSpecialtyRemove = (selectedList) => {
    handleChange({ target: { name: "specialties", value: selectedList } });
  };

  return (
    <Container>
      <TopContainer>
        <FilterContainer>
          <Form onSubmit={handleSubmit}>
            <FirstMsg>Find Your Best Guide</FirstMsg>

            <SelectWrapper>
              <SelectInput
                id="gender"
                name="gender"
                placeholder="Gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.gender && errors.gender ? "error" : ""}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </SelectInput>
              {touched.gender && errors.gender && (
                <ErrorMsg>{errors.gender}</ErrorMsg>
              )}
            </SelectWrapper>

            <Wrapper>
              <Multiselect
                options={regions}
                selectedValues={values.region}
                onSelect={onRegionSelect}
                onRemove={onRegionRemove}
                displayValue="name"
                className={touched.region && errors.region ? "error" : ""}
                id="region"
                name="region"
                placeholder="Region"
                value={values.region}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  multiselectContainer: {
                    width: "100%",
                    height: "100%",
                    padding: "0px 0px 0px 0px",
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
            </Wrapper>

            <Wrapper>
              <Multiselect
                options={languages}
                selectedValues={values.languages}
                onSelect={onLanguageSelect}
                onRemove={onLanguageRemove}
                displayValue="name"
                className={touched.languages && errors.languages ? "error" : ""}
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
                    padding: "0px 0px 0px 0px",
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
            </Wrapper>

            <RangeWrapper>
              <NumericInput
                min={0}
                max={10}
                placeholder="Range"
                value={values.range}
                onChange={(value) =>
                  handleChange({ target: { name: "range", value } })
                }
                onBlur={handleBlur}
              />
              <style>
                {`
                  .react-numeric-input {
                    width: 100% !important;
                    height: 53px !important;
                    background-color:transparent !important;
                    display: inline-block !important;
                    position: relative !important;
                  }

                  .react-numeric-input input {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0px 0px 0px 10px !important;
                    font-size: 1rem !important;
                    border-radius: 10px !important;
                    margin-bottom: 10px !important;
                    box-shadow: inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2) !important;
                    transition: box-shadow 0.2s ease-in !important;
                    border: 2px #777c88 solid !important;
                  }
                `}
              </style>
            </RangeWrapper>

            <Wrapper>
              <Multiselect
                options={specialties}
                selectedValues={values.specialties}
                onSelect={onSpecialtySelect}
                onRemove={onSpecialtyRemove}
                displayValue="name"
                className={touched.languages && errors.languages ? "error" : ""}
                id="specialties"
                name="specialties"
                placeholder="Specialties"
                value={values.specialties}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  multiselectContainer: {
                    width: "100%",
                    height: "100%",
                    padding: "0px 0px 0px 0px",
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
            </Wrapper>

            <ButtonWrapper>
              <Btn type="submit">Filter</Btn>
            </ButtonWrapper>
          </Form>
        </FilterContainer>
        <MapContainer>
          <Map>
            <LoadScript googleMapsApiKey="AIzaSyAg8TOi8OhdM1NxVymss1CEqZD3VRT342w">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={{ lat: 0, lng: 0 }}
                zoom={2}
              >
                {locations.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: location.lat, lng: location.lng }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </Map>
        </MapContainer>
      </TopContainer>
      <BottomContainer>
        <ResultContainer>
        <FirstMsg>Result</FirstMsg>
          {filteredUsers.map((item, index) => (
            <ResultBar key={index}>
              <ImageContainer
                // src={
                //   item.courseCover.length != 0 ? item.courseCover[0].url : ""
                // }
              />
              <InfoContainer>
                <Region>{item.region}</Region>
                <UserName>{item.user_name}</UserName>
              </InfoContainer>
              <Icon></Icon>
            </ResultBar>
          ))}
        </ResultContainer>
      </BottomContainer>
    </Container>
  );
}

export default TravelerFindPage;
