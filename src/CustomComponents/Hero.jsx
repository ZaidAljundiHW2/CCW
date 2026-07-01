import React from 'react'
import HeroImg from '../assets/img/home-hero-final.png'
import { Box } from '@chakra-ui/react'

const Hero = () => {

  return (
    <div className='w-full h-[100vh] bg-green-500 relative'>

        <img src={HeroImg} alt='Hero Image' style={{height: '100%', width: '100%', objectFit: 'cover', position:'absolute'}}/>
        <Box className='w-full h-full bg-black/50 absolute'/>
      
    </div>
  )
}

export default Hero
