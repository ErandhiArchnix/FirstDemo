import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Container } from "../styles/pageStyles/AuthStyles";
import {
  GlobalStyle,
  Title,
  FirstMsg,
  RoleButton,
  btnStyles,
  BottomContainer,
  ButtonWrapper,
  CommandButton,
} from "../styles/componentStyles/ChooseRoleStyles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const { dispatch } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  // Function to handle button click for selecting a role
  const handleRoleSelection = (role) => {
    // Check if the selected role is already the same as the clicked button
    if (selectedRole === role) {
      // If the clicked button is already selected, deselect it
      localStorage.removeItem("selectedRole");
      setSelectedRole(null);
      dispatch({ type: "UPDATE_SELECTED_ROLE", payload: null });
    } else {
      // Generate value based on the selected role and save it to local storage
      localStorage.setItem("selectedRole", role);
      setSelectedRole(role);
      dispatch({ type: "UPDATE_SELECTED_ROLE", payload: role });
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("selectedRole");
    localStorage.removeItem("user")
    setSelectedRole(null);
    // dispatch({ type: "UPDATE_SELECTED_ROLE", payload: null });
    navigate("/");
  };

  // useEffect(() => {
  //   // Check local storage for previously selected role
  //   const storedRole = localStorage.getItem("selectedRole");
  //   if (storedRole) {
  //     // If a role is stored, update the state with the selected role
  //     setSelectedRole(storedRole);
  //     dispatch({ type: "UPDATE_SELECTED_ROLE", payload: storedRole });
  //   }
  // }, [dispatch]);

  const handleNext = () => {
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole === "null") {
      toast.error("Please select a role before proceeding.");
    } else {
      console.log(storedRole);
      dispatch({ type: "NEXT_STEP" });
    }
  };

  return (
    <Container>
      <BottomContainer>
        <GlobalStyle />
        <Title>Choose Your Role</Title>
        <FirstMsg className="signup">
          It's a Place to Meet Travelers and Guides
        </FirstMsg>
        <RoleButton>
          <Button
            onClick={() => handleRoleSelection("traveler")}
            variant="contained"
            sx={{
              ...btnStyles,
              ...(selectedRole === "traveler" &&
                btnStyles["&.MuiButton-outlined"]),
            }}
          >
            Traveler
          </Button>
        </RoleButton>

        <RoleButton>
          <Button
            onClick={() => handleRoleSelection("guide")}
            variant="contained"
            sx={{
              ...btnStyles,
              ...(selectedRole === "guide" &&
                btnStyles["&.MuiButton-outlined"]),
            }}
          >
            Guide
          </Button>
        </RoleButton>
        <ButtonWrapper>
          <CommandButton>
            <Stack spacing={2} direction="row">
              <Button onClick={handleCancel} sx={btnStyles} variant="text">
                Cancel
              </Button>
            </Stack>
          </CommandButton>
          <CommandButton>
            <Stack spacing={2} direction="row">
              <Button onClick={handleNext} sx={btnStyles} variant="text">
                Next
              </Button>
            </Stack>
          </CommandButton>
        </ButtonWrapper>
      </BottomContainer>
    </Container>
  );
}

export default RoleSelection;
