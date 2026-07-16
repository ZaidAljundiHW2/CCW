import React from 'react'
import FooterBack from '@/assets/img/footer-background.png'
import { Flex, Box } from '@chakra-ui/react'
import Logo from '@/assets/img/logo-full-transparent.png'
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import InstagramIcon from '@/assets/icons/instagram.png'
import FacebookIcon from '@/assets/icons/facebook.png'
import TiktokIcon from '@/assets/icons/tiktok.png'
import './Footer.css'
import WaveIcon3 from '@/assets/icons/waveicon3.png'

const Footer = () => {
  return (
    <div
        className='
            flex
            flex-col
            md:gap-5
            gap-0
            items-center
            footerwrapper
            
        '
        style={{
            backgroundImage:`url(${FooterBack})`,
            backgroundSize:'100% 100%',
            backgroundPosition:'center',
            
            
        }}
    >
        
        
        <Flex className='md:gap-15 gap-5'>

            <Flex className='flex-1 items-center justify-center'>

            
                <img src={Logo} className='footerlogo'/>
            </Flex>

            {/* Quick Links */}
            <Flex className='flex-col'>

                <h1 className='FH'>
                    QUICK LINKS
                </h1>

                <p className='footertext'>Home</p>
                <p className='footertext'>Menu</p>
                <p className='footertext'>Locations</p>
                <p className='footertext'>Franchise</p>
                <p className='footertext'>About Us</p>
                <p className='footertext'>Contact</p>

            </Flex>

            {/* Contact */}
            <Flex className='flex-col gap-2'>

                <h1 className='FH'>
                    CONTACT US
                </h1>

                <Flex className='items-center md:gap-5 gap-1'>
                    <CiLocationOn className='footericon' color='gold'/>
                    <p className='footertext'>1250 Brant Street, Burlington, ON LS7 1X6</p>
                </Flex>

                <Flex className='items-center md:gap-5 gap-1'>
                    <CiPhone className='footericon' color='gold'/>
                    <p className='footertext'>647 271 3140</p>
                </Flex>

                <Flex className='items-center md:gap-5 gap-1'>
                    <CiMail className='footericon' color='gold'/>
                    <p className='footertext'>captainscrab@gmail.com</p>
                </Flex>

                <Flex className='items-center md:gap-5 gap-1'>
                    <CiClock2 className='footericon' color='gold'/>
                    <p className='footertext'>Mon - Sun: 11:00 AM - 10:00 PM</p>
                </Flex>

            </Flex>

            {/* Social Media */}

            <Flex className='flex-col'>

                <h1 className='FH'>FOLLOW US</h1>

                <Flex className='md:flex-row flex-col gap-2'>

                    <img src={InstagramIcon} className='SMI'/>
                    <img src={TiktokIcon} className='SMI'/>
                    <img src={FacebookIcon} className='SMI'/>

                </Flex>

            </Flex>

            {/* Separator */}
            <Box className='w-[2px]'
                style={{
                    background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'
                }}
            />

            <Flex className='flex-col w-[20%] justify-center md:gap-4 gap-0'>

                <h1 className='FH2'> FRESH CATCHES</h1>
                <h1 className='FH2'> BIG FLAVOURS</h1>
                <h1 className='FH2'> GOOD TIMES AHEAD</h1>
                {/* <img src={WaveIcon3} className='wi3'/> */}

                <img src={Logo} className='footerlogo2'/>


            </Flex>



        </Flex>

        {/* Separator */}
        <Box className='w-[80%] h-[2px]'
            style={{
                background:'linear-gradient(to left, transparent 2%, gray, transparent 97%)'
            }}
        />

        {/* TOS and Copyright */}
        <Flex className='w-full items-center justify-center'>
            <h1 className='w-[60%] footertext'>
                @ 2024 Captain's Crab Seafood Boil House. All Rights Reserved.

            </h1>

            <Flex className='gap-6 items-center justify-center'>

                <h1 className='footertext'>
                    Privacy Policy
                </h1>

                <Box className='h-[20px] w-[1px] bg-[#d9ebff]'/>

                <h1 className='footertext'>
                    Terms of Service
                </h1>

            </Flex>
            

        </Flex>


      
    </div>
  )
}

export default Footer
