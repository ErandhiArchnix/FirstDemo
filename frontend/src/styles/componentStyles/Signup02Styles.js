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

export const Form = styled.form`
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

  a {
    color: #f0634c;
    text-decoration: none;
  }

  &.login {
    padding: 30px 5%;
  }
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

export const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 15px;
  font-size: 1rem;
  border: 2px #777c88 solid;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2);
  transition: box-shadow 0.2s ease-in;
  &::-webkit-input-placeholder {
    opacity: 0.6;
    transition: opacity 0.25s ease-out;
  }
  &:hover::-webkit-input-placeholder,
  &:focus::-webkit-input-placeholder {
    opacity: 0;
  }

  &.error {
    border: 2px solid #e7195a;
  }
`;

export const CustomCheck = styled.input`
  accent-color: #f0634c;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Btn = styled.button`
  background-color: #f0634c;
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 120px;
  font-size: 1.2rem;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.25s ease-out;

  &:hover {
    opacity: 0.8;
  }

  &.google {
    width: 150px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BoldTxt = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

//error on signup and login
export const ErrorMsg = styled.p`
  color: #fc8181;
  font-size: 0.75rem;
  text-align: left;
  margin: 0.1rem 0 0 0;
`;

export const BottomText = styled.div`
  margin-top: 10px;
`;

//signUp
export const TermsAndCoLink = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;

//Terms And cond
export const TermsAndCoContainer = styled.div`
  border-radius: 20px;
  background-color: rgba(240, 99, 76, 0.12);
  max-width: 1000px;
  width: 100%;
  height: 60%;
  margin: 10px auto;
  padding: 30px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: justify;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  a {
    color: #f0634c;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  i {
    position: absolute;
    top: 1rem;
    left: 0.8rem;
    opacity: 0.5;
  }
  margin-bottom: 15px;
`;

export const SelectInput = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 40px;
  font-size: 1rem;
  border: 2px #777c88 solid;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2);
  transition: box-shadow 0.2s ease-in;
  &.error {
    border: 2px solid #e7195a;
  }
`;

export const PhoneCover = styled.div`
  position: relative;
  width: 100%;
  i {
    position: absolute;
    top: 1rem;
    left: 0.8rem;
    opacity: 0.5;
  }
  margin-bottom: 15px;
`;

export const LanguageWrapper = styled.div`
  position: relative;
  width: 100%;
  i {
    position: absolute;
    top: 1rem;
    left: 0.8rem;
    opacity: 0.5;
  }
  margin-bottom: 15px;
`;
