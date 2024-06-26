import React from "react";
import {useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { LeftSide, LoginBtn, LogoutBtn, MainContainer, Middle, StyledNavLink, RightSide, btnStyles } from "../styles/componentStyles/NavBar0Styles";


function NavbarHorizontal() {
  const navigate = useNavigate();

  return (
    <div>
      <MainContainer>
        <LeftSide>
          <img src={logo} alt="logo" className="logo" />
        </LeftSide>

        <Middle>
          <StyledNavLink to="/">Home</StyledNavLink>

          <StyledNavLink to="/map">Map</StyledNavLink>

          <StyledNavLink to="/about">About</StyledNavLink>
        </Middle>

        <RightSide>
          {/* {user ? (
            <>
              <StyledNavLink to="/dashboard/">Dashboard</StyledNavLink>
              <LoginBtn>
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={() => {dispatch({ type: "LOGOUT" });}}
                    sx={btnStyles}
                    variant="outlined"
                  >
                    Logout
                  </Button>
                </Stack>
              </LoginBtn>
            </>
          ) : (
            <> */}
              <LoginBtn>
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={() => navigate("/login")}
                    sx={btnStyles}
                    variant="outlined"
                  >
                    Login
                  </Button>
                </Stack>
              </LoginBtn>

              <LogoutBtn>
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={() => navigate("/signup")}
                    sx={btnStyles}
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </LogoutBtn>
            {/* </>
          )} */}
        </RightSide>
      </MainContainer>
    </div>
  );
}

export default NavbarHorizontal;