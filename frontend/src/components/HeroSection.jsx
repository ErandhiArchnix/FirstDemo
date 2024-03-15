import React from "react";
import image01 from "../assets/image01.png";
import image02 from "../assets/image02.png";
import image03 from "../assets/image03.png";
import { AImg, ButtonWrapper, Container01, HLine, ImgContainer, SpanContainer, StyledButton, Text, Top } from "../styles/componentStyles/HeroSectionStyles";


function Home() {
  return (
    <div>
      <Container01>
        <Top>
          The Best Place for <br></br>Guides and Travelers.
        </Top>

        <SpanContainer>
          <Text>Find Your Perfect Guide</Text>
          <HLine></HLine>
          <Text>Guide Your Most Preferred Travels</Text>
          <HLine></HLine>
          <Text>Start for Free</Text>
        </SpanContainer>
        <ButtonWrapper>
          <StyledButton>Start as a Guide</StyledButton>
          <StyledButton>Start as a Traveler</StyledButton>
        </ButtonWrapper>

        <ImgContainer>
          <AImg>
            <img src={image02} alt="" height={"450px"} />
          </AImg>
          <AImg style={{ backgroundColor: "#F0634C" }}>
            <img src={image01} alt="" height={"450px"} />
          </AImg>
          <AImg>
            <img src={image03} alt="" height={"450px"} />
          </AImg>
        </ImgContainer>
      </Container01>
    </div>
  );
}

export default Home;