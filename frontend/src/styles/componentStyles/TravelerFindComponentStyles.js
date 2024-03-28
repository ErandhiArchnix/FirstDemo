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
  color: #f0634c;
  margin-bottom: 35px;
  text-align: center;
  font-size: 1.5rem;
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