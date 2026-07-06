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
            min-h-[40vh]
            flex
            flex-col
            gap-5
            items-center
            
        '
        style={{
            backgroundImage:`url(${FooterBack})`,
            backgroundSize:'100% 100%',
            backgroundPosition:'center',
            padding:'20px',
            
        }}
    >
        
        
        <Flex className='gap-15'>

            <img src={Logo} style={{
                height:'200px',
                width:'200px'
            }}/>

            {/* Quick Links */}
            <Flex className='flex-col'>

                <h1 className='FH'>
                    QUICK LINKS
                </h1>

                <p>Home</p>
                <p>Menu</p>
                <p>Locations</p>
                <p>Franchise</p>
                <p>About Us</p>
                <p>Contact</p>

            </Flex>

            {/* Contact */}
            <Flex className='flex-col w-[20%] gap-2'>

                <h1 className='FH'>
                    CONTACT US
                </h1>

                <Flex className='items-center gap-5'>
                    <CiLocationOn size={'1.25rem'} color='gold'/>
                    <p>1250 Brant Street, Burlington, ON LS7 1X6</p>
                </Flex>

                <Flex className='items-center gap-5'>
                    <CiPhone size={'1.25rem'} color='gold'/>
                    <p>647 271 3140</p>
                </Flex>

                <Flex className='items-center gap-5'>
                    <CiMail size={'1.25rem'} color='gold'/>
                    <p>captainscrab@gmail.com</p>
                </Flex>

                <Flex className='items-center gap-5'>
                    <CiClock2 size={'1.25rem'} color='gold'/>
                    <p>Mon - Sun: 11:00 AM - 10:00 PM</p>
                </Flex>

            </Flex>

            {/* Social Media */}

            <Flex className='flex-col'>

                <h1 className='FH'>FOLLOW US</h1>

                <Flex className='gap-2'>

                    <img src={InstagramIcon} className='SMI'/>
                    <img src={TiktokIcon} className='SMI'/>
                    <img src={FacebookIcon} className='SMI'/>

                </Flex>

            </Flex>

            {/* Separator */}
            <Box className='w-[2px] h[80%]'
                style={{
                    background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'
                }}
            />

            <Flex className='flex-col w-[20%] justify-center gap-4'>

                <h1 className='FH2'> FRESH CATCHES</h1>
                <h1 className='FH2'> BIG FLAVOURS</h1>
                <h1 className='FH2'> GOOD TIMES AHEAD</h1>
                <img src={WaveIcon3} style={{
                    width:'1000px',
                    height:'50px'
                }}/>

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
            <h1 className='w-[60%]'>
                @ 2024 Captain's Crab Seafood Boil House. All Rights Reserved.

            </h1>

            <Flex className='gap-6 items-center justify-center'>

                <h1>
                    Privacy Policy
                </h1>

                <Box className='h-[20px] w-[1px] bg-[#d9ebff]'/>

                <h1>
                    Terms of Service
                </h1>

            </Flex>
            

        </Flex>


      
    </div>
  )
}

export default Footer
