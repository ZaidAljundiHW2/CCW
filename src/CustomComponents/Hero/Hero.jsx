import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import HeroCarousel from './HeroCarousel'
import './Hero.css'
import { FaClipboard } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import backalt from '@/assets/img/altback.png'

const Hero = () => {

  return (
    <div 
      className='
        w-full 
        min-h-[100vh]
        relative 
        items-center
        flex
      '

      style={{
        backgroundImage:`url(${backalt})`,
        backgroundSize:'coverx',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        overflowX:'hidden'
      }}
      

      id='home'
    >

        
        
        
        
        {/* Hero Text */}
        <div
          className='
            w-full
            md:w-[40%]
            flex
            flex-col
            gap-0
            z-10
            herotextwrapper
          '

          
        >
          <div
            style={{
              gap:'-10x'
            }}
          >

          
            <motion.h1 
              className='heroheader'

              initial={{opacity:0, x:-100}}

              animate={{opacity:1, x:0}}

              transition={{duration:1, ease:'easeInOut', delay:.2}}
              
            >
              FRESH CATCH.
            </motion.h1>

            <motion.h1 
              className='heroheader' 
              style={{color:'#ef571b'}}

              initial={{opacity:0, x:-100}}

              animate={{opacity:1, x:0}}

              transition={{duration:1, ease:'easeInOut', delay:.1}}
            >
              BIG FLAVOUR.
            </motion.h1>

            <motion.h1 
              className='heroheader' 
              style={{color:'#68a7d6'}}
              initial={{opacity:0, x:-100}}

              animate={{opacity:1, x:0}}

              transition={{duration:1, ease:'easeInOut'}}
            >
              FRANCHISE READY.
            </motion.h1>

          </div>

          <motion.p
            initial={{opacity:0, x:-100}}

            animate={{opacity:1, x:0}}

            transition={{duration:1, ease:'easeInOut'}}

            className='herotext'
          >
            Premium seafood boils, bold flavours, and an unforgettable experience - in Burlington and coming to communities across Canada.
          </motion.p>

          <motion.div
            className='
              flex
              gap-5
            '

            style={{
              paddingTop:'20px'
            }}

            initial={{opacity:0, x:-100}}

            animate={{opacity:1, x:0}}

            transition={{duration:1, ease:'easeInOut'}}
          >

            <button className='herobutton' style={{background:'#ef571b'}}>
              View Menu

              <FaClipboard />
            </button>

            <button className='herobutton' style={{background:'black'}}>
              Book a Table

              <FaCalendarAlt />
            </button>
              

            <button className='herobutton' style={{background:'#68a7d6'}}>
              Request Franchise

              <FaDoorClosed />
            </button>

            

          </motion.div>

        </div>

        <div 
          className='
            absolute 
            inset-0 
            overflow-hidden
          '
          
        


        >
        {/* Hero Image */}
          <HeroCarousel />
        </div>
      
    </div>
  )
}

export default Hero
