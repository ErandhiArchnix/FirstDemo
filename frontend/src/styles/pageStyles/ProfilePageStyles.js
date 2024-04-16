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
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  /* flex-direction: row; */
`;

export const UserDetails = styled.div`
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
  background-color: #f4f6f6;
`;

export const SubUserDetails = styled.div`
  flex: 1;
  margin: 5px;
  width: 95%;
  /* height: 120px; */
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const DetailsCard = styled.div`
  flex: 1;
  margin: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Label = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: #e74c3c;
  margin-bottom: 0px;
`;

export const Details = styled.p`
  font-size: 14px;
  font-weight: normal;
  color: #85929e;
  /* margin-bottom: 3px; */
`;

export const Topic = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: #85929e;
  margin-bottom: 3px;
`;

export const RightContainer = styled.div`
  flex: 1;
  padding: 5px;
  margin: 5px;
  max-width: 40%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* box-shadow: #dadada; */
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: #f4f6f6;
`;

export const CalenderContainer = styled.div`
  flex: 1;
  margin: 5px;
  width: 95%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const GalleryContainer = styled.div`
  flex: 1;
  margin: 5px;
  width: 95%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  box-shadow: #dadada;
  border-radius: 15px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const FirstMsg = styled.p`
  color: black;
  margin-bottom: 35px;
  margin-top: 30px;
  text-align: center;
  font-size: 1.5rem;
`;

export const BottomContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  flex-direction: row;
`;

export const BasicInfo = styled.div`
  margin: 5px;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  /* background-color: white; */
  overflow: hidden;
  background-color: #f4f6f6;
`;

export const ImageContainer = styled.img`
  align-items: center;
  width: 120px;
  height: 120px;
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

export const ButtonContainer = styled.div`
  font-size: 10px;
  height: 90%;
  /* width: 75%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EditButton = styled.button`
  padding: 5px 8px;
  border-radius: 10px;
  &:hover {
    padding: 6px 9px;
  }
`;

export const UserName = styled.span`
  font-size: 35px;
  font-weight: bold;
  color: #566573;
  /* margin-bottom: 3px; */
  /* cursor: pointer; */
`;

export const Role = styled.span`
  margin-top: 5px;
  font-size: 20px;
  /* font-weight: 300; */
  color: #e74c3c;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1001; /* Ensure modal is above the button */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* height: 200px;
  width: 200px; */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  /* padding: 30px; */
  border-radius: 5px;
  height: 600px;
  width: 600px;
`;

export const FormContainer = styled.div`
  /* position: absolute; */
  height: 450px;
  width: 500px;
  margin: 50px 50px 30px 50px;
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

  &:hover {
    color: black;
  }
`;

export const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   /* max-width: 550px;
   min-width: 300px; */
   width: 95%;
   /* height: 60%; */
   margin: 0% auto;
   padding: 5px 5%;

   a {
      color: #f0634c;
      text-decoration: none;
    }

   &.login{
      padding: 30px 5% ;
    }
`;

export const FormInput = styled.input`
   width: 100%;
   box-sizing: border-box;
   padding: 15px 40px;
   font-size: 0.95rem;
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

//name input field in signup
export const Name = styled.div`
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

//email input field
export const Email = styled.div`
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
