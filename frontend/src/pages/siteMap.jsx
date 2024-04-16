import React from 'react'
import HomeMap from '../components/Map'
import NavBar0 from '../components/NavBar0'
import { HomePageContainer } from '../styles/pageStyles/SiteHomeStyles'

const Home = () => {
  return (
    <HomePageContainer>
      <NavBar0 />
      <HomeMap />
    </HomePageContainer>
  )
}

export default Home