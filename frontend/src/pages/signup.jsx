import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar0 from "../components/NavBar0";
import ChooseRole from "../components/ChooseRole";
import SignUp01 from "../components/Signup01";
import SignUp02 from "../components/Signup02";
import { AuthContext } from "../context/AuthContext";

import {Container, TopContainer, BottomContainer} from  "../styles/pageStyles/AuthStyles";

function Signup() {
  const { currentStep, formData, dispatch } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: "LOGOUT" }); // Reset the state when the component unmounts
  }, [dispatch]);

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <ChooseRole dispatch={dispatch}/>;
      case 1:
        return <SignUp01 dispatch={dispatch} data={formData[1]} />;
      case 2:
        return <SignUp02 dispatch={dispatch} data={formData[2]} />;
      default:
        return null;
    }
  };

  return (
    <Container>
        <TopContainer>
            <NavBar0 />
        </TopContainer>
        <BottomContainer>
          {renderStep(currentStep)}
        </BottomContainer>
    </Container>
  )
}

export default Signup;
