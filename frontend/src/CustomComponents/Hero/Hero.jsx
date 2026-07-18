import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import HeroCarousel from './HeroCarousel'
import './Hero.css'
import { FaClipboard } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import backalt from '@/assets/img/altback.png'
import BookReservationPopup from '../Navbar/BookReservationPopup'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {

  const [showBook, setShowBook] = useState(false);

  const handleNavLink = (event, targetID) => {

        event.preventDefault();

        const target = document.querySelector(targetID);
        
        if (target) {

            const navbar = document.querySelector('#navbar');
            const navbarheight = navbar?.offsetHeight || 0;
            const offsetPosition = target.offsetTop - navbarheight;


            window.scrollTo ({
                top: offsetPosition,
                behavior: 'smooth'

            })

        }
  }

  return (
    <div 
      className='
        w-full 
        min-h-[100vh]
        relative 
        herowrapper
        flex
        portrait:items-start
        portrait:justify-center
        portrait:text-center
        landscape:items-center 
        landscape:justify-start
        
        
        
      '

      style={{
        backgroundImage:`url(${backalt})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        overflowX:'hidden'
      }}
      

      id='home'
    >

        
        
        
        
        {/* Hero Text */}
        <div
          className='
            portrait:w-[90%]
            landscape:w-[40%]
            flex
            flex-col
            gap-0
            z-10
            herotextwrapper
            bg-red-500
            
          '

          
        >
          

          
          <motion.h1 
            className='heroheader'

            style={{color:'white'}}

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


          <motion.p
            initial={{opacity:0, x:-100}}

            animate={{opacity:1, x:0}}

            transition={{duration:1, ease:'easeInOut'}}

            className='herotext'

            style={{color:'white'}}
          >
            Premium seafood boils, bold flavours, and an unforgettable experience - in Burlington and coming to communities across Canada.
          </motion.p>

          <motion.div
            className='
              flex
              portrait:justify-center
              portrait:items-center
              gap-5
            '

            style={{
              paddingTop:'20px'
            }}

            initial={{opacity:0, x:-100}}

            animate={{opacity:1, x:0}}

            transition={{duration:1, ease:'easeInOut'}}
          >

            <Link to={'/Menu'} className='herobutton' style={{background:'#ef571b'}}>
              View Menu

              <FaClipboard />
            </Link>

            <Link to={'/Book'} className='herobutton' style={{background:'black'}}>
              Book a Table

              <FaCalendarAlt />
            </Link>
              
            
            <Link to={'/Franchise'} className='herobutton' style={{background:'#68a7d6'}}>
              Request Franchise

              <FaDoorClosed />
            </Link>

            

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

        {showBook && (<BookReservationPopup setShowBook={setShowBook}/>)}
      
    </div>
  )
}

export default Hero
