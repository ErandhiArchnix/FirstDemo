import React from 'react'
import About from '../components/About'
import NavBar0 from '../components/NavBar0'
import { HomePageContainer } from '../styles/pageStyles/SiteHomeStyles'



const Home = () => {
  return (
    <HomePageContainer>
      <NavBar0 />
      <About/>
    </HomePageContainer>
  )
}

export default Home