import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import HeroCarousel from './HeroCarousel'

const Hero = () => {

  return (
    <div 
      className='
        w-full 
        min-h-screen
        relative 
        overflow-hidden
      '
    >

        <div className='absolute inset-0'>
        {/* Hero Image */}
          <HeroCarousel />
        </div>
        {/* Brightness lowering */}
        <Box className='w-full h-full bg-black/60 absolute'/>

        <Box 
          className='h-full w-full absolute'
          style={{
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 15%)'
          }}
        />
        
        {/* Hero Text */}
        <div
          className='
            min-h-screen
            relative
            items-center
            inset-0
            flex  
            py-20
            z-10          
          '
          
        >

          <div 
            className='
              max-w-[50%] 
              min-h-[50%]
              border-4 
              border-red-500
              flex
              flex-col
              justify-center
              p-8
              gap-4
            '

            
          >
          
            <motion.h1 
              style={{
                fontSize:"4rem", 
                fontWeight:'bold',
                paddingLeft:'5%'
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
                paddingLeft:'10%',
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
      
    </div>
  )
}

export default Hero
