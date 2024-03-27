import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
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
  LanguageWrapper,
  SelectWrapper,
  SelectInput,
  ErrorMsg,
  RangeWrapper,
} from "../styles/componentStyles/TravelerFindComponentStyles";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import WcIcon from "@mui/icons-material/Wc";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import countries from "country-list";
import Multiselect from "multiselect-react-dropdown";
import NumericInput from "react-numeric-input";
import { SiZig } from "react-icons/si";

const languagesIs = require("@cospired/i18n-iso-languages");
languagesIs.registerLocale(
  require("@cospired/i18n-iso-languages/langs/en.json")
);

function TravelerFindPage() {
  const navigate = useNavigate();
  const { dispatch, formData } = useContext(AuthContext); // Access the dispatch function from the AuthContext
  const [options, setOptions] = useState([]);

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: formData[1]?.name || "",
        email: formData[1]?.email || "",
        password: formData[1]?.password || "",
        confirmPassword: formData[1]?.confirmPassword || "",
        gender: formData[2]?.gender || "",
        telephoneNumber: formData[2]?.telephoneNumber || "",
        region: formData[2]?.region || "",
        languages: formData[2]?.languages || [],
        agreedToTerms: false,
      },
      validationSchema: Yup.object({
        gender: Yup.string().required("Gender is required"),
        telephoneNumber: Yup.string()
          .required("Telephone number is required")
          .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
        region: Yup.string().required("Region is required"),
      }),
      onSubmit: async (values) => {
        if (values.agreedToTerms === false) {
          return toast.error("Please accept terms and conditions");
        }

        const selectedLanguageNames = values.languages.map(
          (language) => language.name
        );

        const userData = {
          user_name: values.name,
          email: values.email,
          password: values.password,
          gender: values.gender,
          phone_number: values.telephoneNumber,
          region: values.region,
          languages: selectedLanguageNames,
          user_type: localStorage.getItem("selectedRole"),
        };

        console.log(userData);

        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/signup",
            userData
          );
          const user = response.data;
          console.log("Sent to backend");
          console.log(user);
          if (user) {
            // console.log(confirm.data.Status);
            console.log(user);
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            toast.success("Check your mailbox to confirmation email.");
            console.log(selectedLanguageNames);
            console.log(response.data.Status);
            localStorage.setItem("emailtoken", response.data.token);
            const token = localStorage.getItem("emailtoken");
            navigate(`confirmation/otp/${token}`);
            localStorage.removeItem("emailtoken");
          }
        } catch (error) {
          if (error.response && error.response.data) {
            // Check if error.response exists and has data
            toast.error(error.response.data.message);
            dispatch({
              type: "LOGIN_FAILURE",
              payload: error.response.data.message,
            });
          }
        }
      },
    });

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

            <SelectWrapper>
              <SelectInput
                className={touched.region && errors.region ? "error" : ""}
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
              {touched.region && errors.region && (
                <ErrorMsg>{errors.region}</ErrorMsg>
              )}
            </SelectWrapper>

            <LanguageWrapper>
              <Multiselect
                options={options}
                selectedValues={values.languages}
                onSelect={onSelect}
                onRemove={onRemove}
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
            </LanguageWrapper>

            <RangeWrapper>
              <NumericInput min={0} max={100} placeholder="Range"/>
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

            <LanguageWrapper>
              <Multiselect
                options={options}
                selectedValues={values.languages}
                onSelect={onSelect}
                onRemove={onRemove}
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
            </LanguageWrapper>

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
              ></GoogleMap>
            </LoadScript>
          </Map>
        </MapContainer>
      </TopContainer>
    </Container>
  );
}

export default TravelerFindPage;
