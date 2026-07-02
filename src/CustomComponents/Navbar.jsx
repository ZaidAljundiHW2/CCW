import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { CiCirclePlus } from "react-icons/ci";
import './Navbar.css'
import { useState } from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { motion } from 'motion/react';
import CompanyLogo from '../assets/icons/benefit-crab.png'
import WheelIcon from '../assets/icons/benefit-wheel.png'

const Navbar = () => {


    const navcomponents = ['Home', 'Menu', 'Locations', 'About', 'Contact']
    // const navcomponents = ['Home']
    
    const [expandedMenu, setExpandedMenu] = useState(false);

    const toggleMenu = () => {
        setExpandedMenu(!expandedMenu)
    }


  return (
    <div className='fixed top-0 left-0 w-full z-50'>

        <Flex 
            className='w-full h-[12vh]'
            bg={'linear-gradient(0, transparent 5%, rgb(0 0 0 / 50%) 50%)'}

        >

            <Flex padding={'10px'} className='w-[70%] h-[100%] bg-transparent gap-5'>
                
                <Flex className='w-[10%] h-full items-center justify-center '>

                    <Box 
                        className='
                            w-[100%] 
                            h-[100%] 
                            flex 
                            justify-center 
                            items-center
                            z-10
                            '
                        
                        onClick={toggleMenu}
                    >
                        {/* {expandedMenu ? <CiCircleMinus size={'80%'}/> : <CiCirclePlus size={'80%'}/>} */}
                        <motion.img 
                            src={WheelIcon} 
                            alt='wheel expanding menu icon' 
                            style={{padding: '20%'}}
                            animate={{
                                rotate: expandedMenu ? 360 : -360,
                            }}
                        />


                    </Box>


                </Flex>
                
                <Flex className='w-[90%] h-full'>

                
                    {navcomponents.map((navitem) => (
                        <motion.div 
                            class='navcomponents' 
                            key={navitem}

                            animate={{

                                opacity: expandedMenu ? 1 : 0,
                                x: expandedMenu ? 0 : -100
                                
                            }}
                        >
                            {navitem}
                        </motion.div>
                    ))}

                </Flex>

            </Flex>

            <Flex className='w-[30%] h-[100%] bg-transparent justify-end items-center gap-5'>

                <button class='book'>

                    Book Now

                </button>
                

                {/* Box for Logo */}
                <Box padding={4} className='w-[20%] h-[100%] bg-transparent'>

                    <img src={CompanyLogo} alt='company logo'/>

                </Box>


            </Flex>

        </Flex>
      
    </div>
  )
}

export default Navbar
