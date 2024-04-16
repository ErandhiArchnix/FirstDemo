import React from "react";
import logo from "../assets/logo.png";
import {Container01, SpanContainer,Box,Text,Para } from "../styles/componentStyles/FooterStyles";


function Footer () {
    return (
        <div>
            <Container01>
                <br></br>
                <SpanContainer>
                    <Box>
                        <img height={50} src={logo} alt="logo"/>
                        <Para>shufsg vksdkugvs kusvbusv kugsv jhbhvd juhbvsd uvusvf</Para>
                    </Box>
                    <Box>
                        <Text>Contact info</Text>
                        <br></br>
                        <Para>E-mail : crawlee@exampl.com</Para>
                        <br></br>
                        <Para>Main : 011-4562395</Para>
                        <br></br>
                        <Para>Address : abc, astf, auygda</Para>
                    </Box>
                    <Box>
                        <Text>Follow Us</Text>
                        
                    </Box>
                </SpanContainer>
            </Container01>
        </div>
    )
}

export default Footer