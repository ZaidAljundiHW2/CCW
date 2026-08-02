import { forwardRef } from 'react'
import { Box, Flex, Menu, Portal } from '@chakra-ui/react'
import { GiPaperBagFolded } from "react-icons/gi";
import './Navbar.css'
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CompanyLogo from '@/assets/img/logo-full-transparent.png'
import WheelIcon from '@/assets/icons/benefit-wheel.png'
import OrderPopup from './OrderPopup';
import { Link } from 'react-router-dom';
import useNavTheme from './useNavTheme'

const Navbar = forwardRef((props, ref) => {

    const [expandedMenu, setExpandedMenu] = useState(false);
    const [showOrderPopup, setShowOrderPopup] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navTheme = useNavTheme('dark'); // 'dark' | 'light'

    const toggleMenu = () => {
        setExpandedMenu(!expandedMenu)
    }

  return (
    <div
        className='fixed w-full z-50 navbar-container'
        id='navbar'
        ref={ref}
        data-theme={navTheme}
    >

        <Flex className='navbar-inner' align='center' justify='space-between'>

            {/* LEFT SIDE: menu launcher + nav links */}
            <Flex align='center' gap='4' className='navbar-left'>

                {/* Desktop wheel icon (toggles inline nav bar) */}
                <Box className='navicon-wrapper' onClick={toggleMenu}>
                    <motion.img
                        src={WheelIcon}
                        alt='wheel expanding menu icon'
                        className='navicon'
                        animate={{ rotate: expandedMenu ? 360 : -360 }}
                    />
                </Box>

                {/* Mobile dropdown menu — open state controlled by Chakra,
                    no checkbox/label (that pattern fired two click events
                    per tap: one on the label, one synthesized on the
                    checkbox, which opened then immediately closed the menu) */}
                <Menu.Root
                    open={mobileMenuOpen}
                    onOpenChange={(details) => setMobileMenuOpen(details.open)}
                >
                    <Menu.Trigger asChild>
                        <Box className='dropdown-trigger burger' aria-label='Open menu'>
                            <span className={mobileMenuOpen ? 'burger-open' : ''}></span>
                            <span className={mobileMenuOpen ? 'burger-open' : ''}></span>
                            <span className={mobileMenuOpen ? 'burger-open' : ''}></span>
                        </Box>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <Link to={'/'}><Menu.Item>Home</Menu.Item></Link>
                                <Link to={'/Menu'}><Menu.Item>Menu</Menu.Item></Link>
                                <Link to={'/Locations'}><Menu.Item>Locations</Menu.Item></Link>
                                <Link to={'/Franchise'}><Menu.Item>Franchise</Menu.Item></Link>
                                <Link to={'/About'}><Menu.Item>About</Menu.Item></Link>
                                <Link to={'/Contact'}><Menu.Item>Contact</Menu.Item></Link>
                                <Link to={'/Book'}><Menu.Item value="export">Book</Menu.Item></Link>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

                <AnimatePresence>
                    {expandedMenu && (
                        <motion.div
                            className='componentBar'
                            key={'navbar'}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                        >
                            <Link to={'/'} className='Link'>Home</Link>
                            <Link to={'/Menu'} className='Link'>Menu</Link>
                            <Link to={'/Locations'} className='Link'>Locations</Link>
                            <Link to={'/Franchise'} className='Link'>Franchise</Link>
                            <Link to={'/About'} className='Link'>About</Link>
                            <Link to={'/Contact'} className='Link'>Contact</Link>
                            <Link className='book Link' to={'/Book'}>Book Now</Link>
                        </motion.div>
                    )}
                </AnimatePresence>

            </Flex>

            {/* RIGHT SIDE: order button + logo */}
            <Flex align='center' gap='3' className='navbar-right'>

                <button
                    className='orderbutton'
                    onClick={() => setShowOrderPopup(true)}
                >
                    <span>Order</span>
                    <GiPaperBagFolded />
                </button>

                <img
                    src={CompanyLogo}
                    alt='company logo'
                    className='company-logo'
                />

            </Flex>

        </Flex>

        {showOrderPopup && (<OrderPopup setShowOrderPopup={setShowOrderPopup} />)}

    </div>
  )
})

export default Navbar