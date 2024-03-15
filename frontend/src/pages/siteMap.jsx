import React from 'react'
import Map from '../components/Map'
import NavBar0 from '../components/NavBar0'
import { HomePageContainer } from '../styles/pageStyles/SiteHomeStyles'



const Home = () => {
  return (
    <HomePageContainer>
      <NavBar0 />
      <Map />
    </HomePageContainer>
  )
}

export default Home