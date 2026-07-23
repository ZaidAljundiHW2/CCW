import React, { useEffect } from 'react'
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
import { useState } from 'react';
import ToS from './ToS';
import PrivacyPolicy from './PrivacyPolicy'
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Footer = forwardRef((props, ref) => {

    const API = 'http://localhost:5000'

    const [showPP, setShowPP] = useState(false);
    const [showToS, setShowToS] = useState(false);
    const [instLink, setInstLink] = useState("");
    const [fcbkLink, setFcbkLink] = useState("");
    const [tktkLink, setTktkLink] = useState("");

    const [genDetails, setGenDetails] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [legal, setLegal] = useState();

    const getSocialMedia = async() => {

        try {

            const response = await fetch(API + '/admin/CMS/general-details/social-media');

            const jsonData = await response.json();

            const instaobj = jsonData.find(item => item.label === "Instagram").val;
            const fcbkobj = jsonData.find(item => item.label === "Facebook").val;
            const tktkobj = jsonData.find(item => item.label === "TikTok").val;

            setInstLink(instaobj);
            setFcbkLink(fcbkobj);
            setTktkLink(tktkobj);
            
        } catch (error) {
            console.error(error);
        }
    };

    const getFooterDetails = async() => {

        try {

            const response = await fetch(API + '/admin/CMS/general-details/footer');

            const jsonData = await response.json();

            setGenDetails(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    const getLegal = async() => {

        try {
            
            const res = await fetch(API + '/admin/CMS/general-details/legal');

            const jsonData = await res.json();

            setLegal(jsonData);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const load = async() => {

            await getSocialMedia();
            await getFooterDetails();
            await getLegal();
            setIsLoading(false);
            
        };

        load();

    },[]);

    if (isLoading) {
        return <></>;
    }

    return (

        <div
            className='
                flex
                flex-col
                landscape:gap-5
                gap-0
                items-center
                footerwrapper
                
            '
            style={{
                backgroundImage:`url(${FooterBack})`,
                backgroundSize:'100% 100%',
                backgroundPosition:'center',
                
                
            }}

            ref={ref}
        >
            
            
            <Flex className='landscape:gap-15 gap-5'>

                <Flex className='flex-1 items-center justify-center'>

                
                    <img src={Logo} className='footerlogo'/>
                </Flex>

                {/* Quick Links */}
                <Flex className='flex-col'>

                    <h1 className='FH'>
                        QUICK LINKS
                    </h1>

                    <Link to={'/'}>
                        <p className='footertext footertextclickable'>Home</p>
                    </Link>
                    
                    <Link to={'/Menu'}>
                        <p className='footertext footertextclickable'>Menu</p>
                    </Link>

                    <Link to={'/Locations'}>
                        <p className='footertext footertextclickable'>Locations</p>
                    </Link>

                    <Link to={'/Franchise'}>
                        <p className='footertext footertextclickable'>Franchise</p>
                    </Link>

                    <Link to={'/About'}>
                        <p className='footertext footertextclickable'>About Us</p>
                    </Link>

                    <Link to={'/Contact'}>
                        <p className='footertext footertextclickable'>Contact</p>
                    </Link>

                    <Link to={'/Book'}>
                        <p className='footertext footertextclickable'>Book</p>
                    </Link>

                </Flex>

                {/* Contact */}
                <Flex className='flex-col gap-2'>

                    <h1 className='FH'>
                        CONTACT US
                    </h1>

                    <Flex className='items-center landscape:gap-5 gap-1'>
                        <CiLocationOn className='footericon' color='gold'/>
                        <p className='footertext'>
                            {genDetails.find(item => item.label === "Address")?.val}
                        </p>
                    </Flex>

                    <Flex className='items-center landscape:gap-5 gap-1'>
                        <CiPhone className='footericon' color='gold'/>
                        <p className='footertext'>
                            {genDetails.find(item => item.label === "Phone Number")?.val}
                        </p>
                    </Flex>

                    <Flex className='items-center landscape:gap-5 gap-1'>
                        <CiMail className='footericon' color='gold'/>
                        <p className='footertext'>
                            {genDetails.find(item => item.label === "Email")?.val}
                        </p>
                    </Flex>

                    <Flex className='items-center landscape:gap-5 gap-1'>
                        <CiClock2 className='footericon' color='gold'/>
                        <p className='footertext'>
                            {genDetails.find(item => item.label === "Timings")?.val}
                        </p>
                    </Flex>

                </Flex>

                {/* Social Media */}

                <Flex className='flex-col'>

                    <h1 className='FH'>FOLLOW US</h1>

                    <Flex className='landscape:flex-row flex-col gap-2'>

                        <a href={instLink}>
                            <img src={InstagramIcon} className='SMI'/>
                        </a>

                        <a href={tktkLink}>
                            <img src={TiktokIcon} className='SMI'/>
                        </a>

                        <a href={fcbkLink}>
                            <img src={FacebookIcon} className='SMI'/>
                        </a>

                    </Flex>

                </Flex>

                {/* Separator */}
                <Box className='w-[2px]'
                    style={{
                        background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'
                    }}
                />

                <Flex className='flex-col w-[20%] justify-start gap-0'>

                    <h1 className='FH2'> FRESH CATCHES</h1>
                    <h1 className='FH2'> BIG FLAVOURS</h1>
                    <h1 className='FH2'> GOOD TIMES AHEAD</h1>
                    <img src={WaveIcon3} className='wi3'/>

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

                    <h1 className='footertext footertextclickable' onClick={() => {setShowPP(true); setShowToS(false)}}>
                        Privacy Policy
                    </h1>

                    <Box className='h-[20px] w-[1px] bg-[#d9ebff]'/>

                    <h1 className='footertext footertextclickable' onClick={() => {setShowToS(true); setShowPP(false)}}>
                        Terms of Service
                    </h1>

                </Flex>
                

            </Flex>


            {showPP && (<PrivacyPolicy setShowPP={setShowPP} text={legal.find(item => item.label === "Privacy Policy").val}/>)}

            {showToS && (<ToS setShowToS={setShowToS} text={legal.find(item => item.label === "Terms of Service").val}/>)}


        
        </div>
    )
})

export default Footer;