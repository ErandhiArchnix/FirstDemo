import React from 'react'
import HeroSection from "../components/HeroSection"
import NavBar0 from '../components/NavBar0'
import { HomePageContainer } from '../styles/pageStyles/SiteHomeStyles'
import Footer from '../components/Footer'



const Home = () => {
  return (
    <HomePageContainer>
      <NavBar0 />
      <HeroSection/>
      <Footer />
    </HomePageContainer>
  )
}

export default Home