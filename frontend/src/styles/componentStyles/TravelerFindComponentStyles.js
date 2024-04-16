import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  /* margin: 15px 5px 0px 0px; */
  padding: 5px;
  margin-bottom: 30px;
  flex-direction: column;
`;

export const TopContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  flex-direction: row;
`;

export const FilterContainer = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 60%;
  /* height: 120px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

export const MapContainer = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 40%;
  /* height: 120px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

export const Map = styled.div`
  display: flex;
  width: 95%;
  height: 450px;
  /* align-items: top center; */
  border: 2px solid #f0634c;
  /* box-shadow: 15px 20px 32px rgba(0, 0, 0, 0.2); */
  margin: 30px 30px 30px 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* max-width: 550px;
  min-width: 300px; */
  width: 90%;
  height: 60%;
  margin: 0% auto;
  padding: 5px 5%;

  a {
    color: #f0634c;
    text-decoration: none;
  }
`;

export const FirstMsg = styled.p`
  color: black;
  margin-bottom: 35px;
  margin-top: 30px;
  text-align: center;
  font-size: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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
`;

export const ErrorMsg = styled.p`
  color: #fc8181;
  font-size: 0.75rem;
  text-align: left;
  margin: 0.1rem 0 0 0;
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
  padding: 15px 10px;
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

export const Wrapper = styled.div`
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

export const RangeWrapper = styled.div`
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

export const BottomContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  /* flex-direction: row; */
`;

export const ResultContainer = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 100%;
  /* height: 120px; */
  display: flex;
  padding-bottom: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

export const ResultBar = styled.div`
  margin: 5px;
  width: 95%;
  height: 80px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: white;
  overflow: hidden;
`;

export const ImageContainer = styled.img`
  align-items: center;
  width: 60px;
  height: 60px;
  margin-left: 15px;
  border-radius: 50%;
  background-color: red;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  font-size: 10px;
  height: 90%;
  width: 75%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Region = styled.span`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 300;
  color: rgba(119, 124, 136, 1);
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
  cursor: pointer;
`;

export const Icon = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1001; /* Ensure modal is above the button */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  align-items: center;
  justify-content: center;
  /* overflow-y: scroll; */
  
`;

export const ModalContentCover = styled.div`
  display: flex;
  z-index: 1001;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  /* padding: 30px; */
  border-radius: 5px;
  height: 100%;
  width: 650px;
  overflow-y: scroll;

`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  /* padding: 30px; */
  border-radius: 5px;
  /* height: 600px; */
  width: 600px;
  /* overflow-y: scroll; */

`;

export const RequestContainer = styled.div`
  /* position: absolute; */
  /* height: 450px;
  width: 500px; */
  margin: 30px 30px 30px 30px;
  align-items: center;
  flex: 1;
  /* margin: 5px; */
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 5px;
  right: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 30px;
`;

export const SaveButtton = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0634c;
  border-radius: 20px;
  border: #f0634c;
  color: #ffff;
  margin-left: 200px;
  font-weight: 600;
  margin-bottom: 30px;

  &:hover {
    color: black;
  }
`;

export const Topic = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: #85929e;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
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

export const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
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

export const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* max-width: 550px;
  min-width: 300px; */
  width: 90%;
  height: 90%;
  /* margin: 0% auto;
  padding: 5px 5%; */

  a {
    color: #f0634c;
    text-decoration: none;
  }
`;

export const DateInput = styled.span`
  width: 85%;
  height: 55px;
  box-sizing: border-box;
  padding: 15px;
  font-size: 1rem;
  /* opacity: 0.6; */
  /* transition: opacity 0.25s ease-out; */
  border: 2px #777c88 solid;
  border-radius: 0px;
  margin-bottom: 15px;
  box-shadow: 2px -2px 0px 0px rgba(187, 187, 187, 0.8);
  transition: box-shadow 0.2s ease-in;
  cursor: pointer;
  /* &::-webkit-input-placeholder {
    opacity: 0.6;
    transition: opacity 0.25s ease-out;
  }
  &:hover::-webkit-input-placeholder,
  &:focus::-webkit-input-placeholder {
    opacity: 0;
  }

  &.error {
    border: 2px solid #e7195a;
  } */
`;
