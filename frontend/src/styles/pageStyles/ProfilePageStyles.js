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
  justify-content: center;
  box-shadow: #dadada;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background-color: white;
`;

export const GalleryContainer = styled.div`
  flex: 1;
  margin: 5px;
  width: 95%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: #dadada;
  border-radius: 15px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
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
