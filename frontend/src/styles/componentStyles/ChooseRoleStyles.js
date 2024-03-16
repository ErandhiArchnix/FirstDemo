import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&family=VT323&display=swap');
   * {
      box-sizing: border-box;
   }
   body {
      background: #F5F5F5;
      margin: 0;
      font-family: 'Poppins', sans-serif;
    }
   ul {
        list-style: none;
    }
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 550px;
  min-width: 300px;
  width: 65%;
  height: 60%;
  margin: 0% auto;
  padding: 5px 5%;
`;

export const OutSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 550px;
  min-width: 300px;
  width: 65%;
  height: 60%;
  margin: 0% auto;
  padding: 5px 5%;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  margin: 5px;

  &.forgetPass {
    font-size: 2.5rem;
  }

  &.resetPass {
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;

    &.forgetPass {
      font-size: 2rem;
    }
  }
`;

export const FirstMsg = styled.p`
  color: #f0634c;
  margin-bottom: 35px;
  text-align: center;
  font-size: 1.5rem;

  &.signup {
    font-size: 1rem;
  }

  &.forgetPass {
    font-size: 1rem;
  }

  &.resetPass {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CommandButton = styled.button`
  margin: 10px;
  border: none;
  background-color: transparent;
  text-decoration: none;
  box-shadow: none;
`;

export const RoleButton = styled.button`
  margin: 10px;
  border: none;
  background-color: transparent;
  text-decoration: none;
  box-shadow: none;
`;

export const btnStyles = {
  "&.MuiButton-text": {
   color: "#F0634C",
   border: "2px solid #F0634C",
   borderRadius: "10px",
   textTransform: "none",
   padding: "5px 30px",
   fontWeight: 600,
   fontSize: "20px",
   lineHeight: "36px",
   letterSpacing: "0em",
   textAlign: "center",
  },
  "&.MuiButton-text.active": {
    color: "#000000",
    textTransform: "none",
    padding: "10px 20px",
    borderRadius: "15px",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "36px",
    letterSpacing: "0em",
    textAlign: "center",
  },

  "&.MuiButton-outlined": {
    color: "black",
    border: "2px solid white",
    borderRadius: "15px",
    textTransform: "none",
    padding: "10px 30px",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "36px",
    letterSpacing: "0em",
    textAlign: "center",
  },
  "&.MuiButton-contained": {
    background: "#F0634C",
    borderRadius: "15px",
    textTransform: "none",
    padding: "10px 30px",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "36px",
    letterSpacing: "0em",
    textAlign: "center",
  },
};

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;


