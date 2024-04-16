import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #FFE1DA ;
`;

export const MiddleContainer = styled.div`
  /* display: flex;
  flex-direction: row;
  align-content: center; */
  margin-top: 100px;
  border-radius: 10px;
  box-shadow: 15px 20px 32px rgba(0, 0, 0, 0.2);
  width: 755px;
  background-color: white;
  /* height: 300px; */
`;

export const Top = styled.h1`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

export const SpanContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
`;

export const Text = styled.span`
  padding: 10px;
  font-weight: 12px;
`;

export const VerifyButton = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
  border: none;
  background-color: transparent;
  text-decoration: none;
  box-shadow: none;
`;
