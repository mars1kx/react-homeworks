import React from 'react'
import BackgroundWrapper from '../components/BackgroundWrapperHome/BackgroundWrapperHome'
import HomeHero from '../components/HomeHero/HomeHero'

const Home: React.FC = () => {
  return (
    <BackgroundWrapper>
      <main>
        <HomeHero />
      </main>
    </BackgroundWrapper>
  )
}

export default Home 