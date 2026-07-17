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
import { AnimatePresence } from 'motion/react';
import { Menu, Portal } from "@chakra-ui/react"
import OrderPopup from './OrderPopup';
import BookReservationPopup from './BookReservationPopup';

const Navbar = () => {


    // const navcomponents = ['Home']
    
    const [expandedMenu, setExpandedMenu] = useState(false);

    const [showOrderPopup, setShowOrderPopup] = useState(false);
    const [showBook, setShowBook] = useState(false);


    
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

    <div className='fixed w-full z-50' id='navbar'>

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

                        className='navicon'
                    />


                </Box>

                <Menu.Root >
                    <Menu.Trigger asChild>
                        <Box 
                            className='
                                flex 
                                justify-center 
                                items-center
                                z-10
                                
                                cursor-pointer
                                absolute
                                left-[20px]
                                top-[25px]
                            '
                            
                            onClick={toggleMenu}

                            
                        >
                            <motion.img 
                                src={WheelIcon} 
                                alt='wheel expanding menu icon' 
                                style={{
                                    aspectRatio:'square',
                                }}
                                animate={{
                                    rotate: expandedMenu ? 360 : -360,
                                }}
                            />


                        </Box>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item onClick={(e) => handleNavLink(e, "#home")}>Home</Menu.Item>
                            <Menu.Item onClick={(e) => handleNavLink(e, '#menu')}>Menu</Menu.Item>
                            <Menu.Item onClick={(e) => handleNavLink(e, '#locations')}>Locations</Menu.Item>
                            <Menu.Item onClick={(e) => handleNavLink(e, '#franchise')}>Franchise</Menu.Item>
                            <Menu.Item onClick={(e) => handleNavLink(e, '#about')}>About</Menu.Item>
                            <Menu.Item onClick={(e) => handleNavLink(e, '#contact')}>Contact</Menu.Item>
                            <Menu.Item value="export">Book</Menu.Item>
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                    </Menu.Root>


                <AnimatePresence>

                    {expandedMenu && (

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

                            animate ={{
                                opacity: 1,
                                x:0
                            }}

                            exit={{
                                opacity:0,
                                x:-100
                            }}

                            
                        >

                        
                            <button
            
                                onClick={(e) => handleNavLink(e, "#home")}

                               
                            
                            >
                                Home
                            </button>

                            <button onClick={(e) => handleNavLink(e, '#menu')}>
                                Menu
                            </button>

                            <button
                                onClick={(e) => handleNavLink(e, "#locations")}
                            >
                                Locations
                            </button>

                             <button
                                onClick={(e) => handleNavLink(e, "#franchise")}
                            >
                                Franchise
                            </button>

                            <button
                                onClick={(e) => handleNavLink(e, "#about")}
                            >
                                About
                            </button>

                            <button
                                onClick={(e) => handleNavLink(e, "#contact")}
                            >
                                Contact
                            </button>

                           



                            <button
                                className='book'

                                onClick={() => setShowBook(true)}
                            >
                                Book Now
                            </button>

                            

                        </motion.div>

                    )}

                    

                </AnimatePresence>


            </Flex>

            <Flex 
                className='
                    flex-1
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
                        rounded-full
                        hover:cursor-pointer
                    ' 

                    style={{
                        background:'#ef571b'
                    }}

                    onClick={() => setShowOrderPopup(true)}
                    
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

        {showOrderPopup && (<OrderPopup setShowOrderPopup={setShowOrderPopup}/>)}
        {showBook && (<BookReservationPopup setShowBook={setShowBook}/>)}
      
    </div>
  )
}

export default Navbar
