import React from 'react'
import HeroImg1 from '../assets/img/home-hero-final.png'
import HeroImg2 from '../assets/img/group-dining.png'
import HeroImg3 from '../assets/img/restaurant-exterior.png'
import HeroImg4 from '../assets/img/group-dining-new.png'
import { Box, Heading, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import HeroCarousel from './HeroCarousel'

const Hero = () => {

  return (
    <div className='w-full h-[100vh] relative flex justify-start items-center'>

        {/* Hero Image */}
        <HeroCarousel />

        {/* Brightness lowering */}
        <Box className='w-full h-full bg-black/50 absolute'/>
        
        {/* Hero Text */}
        <div
          className='
            h-[50%]
            w-[40%]
            absolute
          '
          style={{
            left:'4%',
          }}
        >

          <motion.h1 
            style={{
              fontSize:"4rem", 
              paddingLeft:'5%', 
              fontWeight:'bold'
            }}

            initial={{
              x:-50,
              opacity:0
            }}

            animate={{
              x:0,
              opacity:1,
            }}

            transition={{
              duration:.8,
              ease: 'easeOut'
            }}

          >

            

            Captain Crabs

          </motion.h1>

          <motion.p 
            style={{
              paddingLeft:'15%',
              paddingTop: '2%',
              fontSize:'1.2rem'
            }}

            initial={{
              y:50,
              opacity:0
            }}

            animate={{
              y:0,
              opacity:1,
            }}

            transition={{
              duration:.8,
              ease: 'easeOut'
            }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </motion.p>

        </div>
      
    </div>
  )
}

export default Hero
