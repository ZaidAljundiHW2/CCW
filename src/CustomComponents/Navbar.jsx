import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { CiCirclePlus } from "react-icons/ci";
import './Navbar.css'
import { useState } from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { motion } from 'motion/react';

const Navbar = () => {


    const navcomponents = ['Home', 'Menu', 'Locations', 'About', 'Contact']
    // const navcomponents = ['Home']
    
    const [expandedMenu, setExpandedMenu] = useState(false);

    const toggleMenu = () => {
        setExpandedMenu(!expandedMenu)
    }


  return (
    <div>

        <Flex className='w-full h-[12vh] bg-red-500'>

            <Flex padding={'10px'} className='w-[70%] h-[100%] bg-purple-500 gap-5'>
                
                <Flex className='w-[10%] h-full items-center justify-center '>

                    <Box 
                        className='
                            w-[100%] 
                            h-[100%] 
                            flex 
                            justify-center 
                            items-center
                            z-10'
                        
                        onClick={toggleMenu}
                    >
                        {expandedMenu ? <CiCircleMinus size={'80%'}/> : <CiCirclePlus size={'80%'}/>}
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

            <Flex className='w-[30%] h-[100%] bg-green-500 justify-end items-center gap-2'>

                <Button className='w-[30%] h-[100%]'>

                    Book Now

                </Button>
                

                {/* Box for Logo */}
                <Box className='w-[20%] h-[100%] bg-yellow-500'>

                </Box>


            </Flex>

        </Flex>
      
    </div>
  )
}

export default Navbar
