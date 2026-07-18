import React, { forwardRef } from 'react'
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
import { Link } from 'react-router-dom';

const Navbar = forwardRef((props, ref) => {


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

    <div className='fixed w-full z-50' id='navbar' ref={ref}>

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
                    <Menu.Trigger asChild className='dropdown'>
                        <Box 
                            className='
                                flex 
                                justify-center 
                                items-center
                                z-10
                                w-[70px]
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
                            <Link to={'/'}>
                                <Menu.Item>Home</Menu.Item>
                            </Link>

                            <Link to={'/Menu'}>
                                <Menu.Item>Menu</Menu.Item>
                            </Link>

                            <Link to={'/Locations'}>
                                <Menu.Item>Locations</Menu.Item>
                            </Link>

                            <Link to={'/Franchise'}>
                                <Menu.Item>Franchise</Menu.Item>
                            </Link>

                            <Link to={'/About'}>
                                <Menu.Item>About</Menu.Item>
                            </Link>
                            
                            <Link to={'/Contact'}>
                                <Menu.Item>Contact</Menu.Item>
                            </Link>

                            <Link>
                                <Menu.Item value="export">Book</Menu.Item>
                            </Link>
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

                            initial ={{ opacity: 0, x:-100 }}
                            animate ={{ opacity: 1, x:0 }}
                            exit={{ opacity:0, x:-100 }}

                            
                        >

                            <Link to={'/'} className='Link'>
                                Home
                            </Link>
                            
                            <Link to={'/Menu'} className='Link'>
                                Menu
                            </Link>
                            
                            <Link to={'/Locations'} className='Link'>
                                Locations
                            </Link>
                            
                            <Link to={'/Franchise'} className='Link'>
                                Franchise
                            </Link>

                            <Link to={'/About'} className='Link'>
                                About
                            </Link>
                            
                            <Link to={'/Contact'} className='Link'>
                                Contact
                            </Link>

                            
                            <Link className='book Link' onClick={() => setShowBook(true)}>
                                Book Now
                            </Link>

                            

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
})

export default Navbar
