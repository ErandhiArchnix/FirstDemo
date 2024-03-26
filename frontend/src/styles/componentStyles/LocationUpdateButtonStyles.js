import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 30px; /* Adjust this value to set the distance from the bottom */
  right: 30px; /* Adjust this value to set the distance from the right */
  z-index: 1000;
`;

export const LocationButton = styled.button`
  position: relative;
  padding: 20px 20px;
  background-color: #f2563e;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background-color: #f1948a;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: "Update Your Location";
    position: absolute;
    bottom: 100%;
    right: -50%;
    transform: translateX(-50%);
    padding: 5px;
    color: #f2563e;
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    width: 200px;
    box-shadow: 11px 10px 50px rgba(0, 0, 0, 0.5);
  }
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

export const MapContainer = styled.div`
  position: absolute;
  height: 450px;
  width: 500px;
  margin: 50px 50px 100px 50px;
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;
