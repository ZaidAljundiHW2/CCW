import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { CiCirclePlus } from "react-icons/ci";
import './Navbar.css'
import { useState } from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { motion } from 'motion/react';
import CompanyLogo from '@/assets/img/logo-full-transparent.png'
import WheelIcon from '@/assets/icons/benefit-wheel.png'
import { GiPaperBagFolded } from "react-icons/gi";

const Navbar = () => {


    const navcomponents = ['Home', 'Menu', 'Locations', 'About', 'Contact']
    // const navcomponents = ['Home']
    
    const [expandedMenu, setExpandedMenu] = useState(false);

    const toggleMenu = () => {
        setExpandedMenu(!expandedMenu)
    }

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
    <div className='fixed top-0 left-0 w-full z-50' id='navbar'>

        <Flex 
            className='w-full h-[12vh]'
        >

            <Flex padding={'10px'} className='gap-5 justify-center items-center'>
                

                <Box 
                    className='
                        flex 
                        justify-center 
                        items-center
                        z-10
                        cursor-pointer
                    '
                    
                    onClick={toggleMenu}

                    
                >
                    <motion.img 
                        src={WheelIcon} 
                        alt='wheel expanding menu icon' 
                        style={{
                            aspectRatio:'square',
                            width:'60px',
                            height:'auto',
                            flexShrink:'0'
                        }}
                        animate={{
                            rotate: expandedMenu ? 360 : -360,
                        }}
                    />


                </Box>


                
                <motion.div 
                    className=' 
                        flex 
                        componentBar
                    '

                    key={'navbar'}

                    initial ={{
                        opacity: 0,
                        x:-100
                    }}

                    animate={{

                        opacity: expandedMenu ? 1 : 0,
                        x: expandedMenu ? 0 : -100
                        
                    }}
                >

                
                    <button
                        style={{
                            paddingLeft:'40px',

                        }}

                        onClick={(e) => handleNavLink(e, "#home")}
                    
                    >
                        Home
                    </button>

                    <Box className='w-[2px] h-[70%]' style={{background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'}}/>

                    <button onClick={(e) => handleNavLink(e, '#menu')}>
                        Menu
                    </button>

                    <Box className='w-[2px] h-[70%]' style={{background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'}}/>

                    <button
                        onClick={(e) => handleNavLink(e, "#locations")}
                    >
                        Locations
                    </button>

                    <Box className='w-[2px] h-[70%]' style={{background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'}}/>


                    <button
                        onClick={(e) => handleNavLink(e, "#about")}
                    >
                        About
                    </button>
                    
                    <Box className='w-[2px] h-[70%]' style={{background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'}}/>


                    <button
                        onClick={(e) => handleNavLink(e, "#contact")}
                    >
                        Contact
                    </button>



                    <button
                        style={{
                            paddingRight:'40px',
                            
                        }}

                        className='book'
                    >
                        Book Now
                    </button>

                    

                </motion.div>

            </Flex>

            <Flex 
                className='
                    w-[45%] 
                    h-[100%] 
                    justify-end 
                    items-center 
                    gap-5
                '

                style={{
                    padding:'20px',
                    paddingTop:'50px'
                }}
            >

            

                <button 
                    className='
                        orderbutton
                    ' 

                    style={{
                        background:'#ef571b'
                    }}
                >
                    Order

                    <GiPaperBagFolded />
                </button>

                <img    
                    src={CompanyLogo} 
                    alt='company logo'
                    style={{
                        width:'100px',
                        
                    }}
                />

            </Flex>

        </Flex>
      
    </div>
  )
}

export default Navbar
