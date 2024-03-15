import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar0 from "../components/NavBar0";
import ChooseRole from "../components/ChooseRole";
import SignUp01 from "../components/Signup01";
import SignUp02 from "../components/Signup02";

import {Container, TopContainer, BottomContainer} from  "../styles/pageStyles/AuthStyles";

function Signup() {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <ChooseRole />;
      case 1:
        return <SignUp01 />;
      case 2:
        return <SignUp02 />;
      default:
        return null;
    }
  };

  const handleStepCompletion = () => {
    setCurrentStep((prevStep) => prevStep + 1);
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

export default Signup