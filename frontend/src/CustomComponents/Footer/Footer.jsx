import { useEffect } from 'react'
import FooterBack from '@/assets/img/footer-background.webp'
import { Flex, Box } from '@chakra-ui/react'
import Logo from '@/assets/img/logo-full-transparent.webp'
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import InstagramIcon from '@/assets/icons/instagram.webp'
import FacebookIcon from '@/assets/icons/facebook.webp'
import TiktokIcon from '@/assets/icons/tiktok.webp'
import './Footer.css'
import { useState } from 'react';
import ToS from './ToS';
import PrivacyPolicy from './PrivacyPolicy'
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import YoutubeIcon from '@/assets/icons/youtube.webp'
const Footer = forwardRef((props, ref) => {

    const [showPP, setShowPP] = useState(false);
    const [showToS, setShowToS] = useState(false);
    const [instLink, setInstLink] = useState("");
    const [fcbkLink, setFcbkLink] = useState("");
    const [tktkLink, setTktkLink] = useState("");
    const [ytLink, setYtLink] = useState("");

    const [genDetails, setGenDetails] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [legal, setLegal] = useState();

    const getSocialMedia = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/general-details/social-media`);

            const jsonData = await response.json();

            const instaobj = jsonData.find(item => item.label === "Instagram").val;
            const fcbkobj = jsonData.find(item => item.label === "Facebook").val;
            const tktkobj = jsonData.find(item => item.label === "TikTok").val;
            const ytobj = jsonData.find(item => item.label === "Youtube").val;

            setInstLink(instaobj);
            setFcbkLink(fcbkobj);
            setTktkLink(tktkobj);
            setYtLink(ytobj);
            
        } catch (error) {
            console.error(error);
        }
    };

    const getFooterDetails = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/general-details/footer`);

            const jsonData = await response.json();

            setGenDetails(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    const getLegal = async() => {

        try {
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/general-details/legal`);

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

    return (

        <div
            className='
                flex
                flex-col
                md:gap-5
                gap-0
                footerwrapper
                max-md:items-center
                
            '
            style={{
                backgroundImage:`url(${FooterBack})`,
                backgroundSize:'100% 100%',
                backgroundPosition:'center',
                
                
            }}

            ref={ref}
        >
            
            {!isLoading && (
                <>

                    <div className='md:gap-15 flex max-md:flex-col gap-5 w-full max-md:items-center max-md:justify-center max-md:text-center' style={{padding:'20px'}}>

                        <div className='flex-1 flex items-center justify-center max-md:hidden'>

                        
                            <img src={Logo} alt="Captain's Crab logo" className='footerlogo'/>
                        </div>

                        <Flex className='max-md:order-1 items-center justify-center md:gap-15'>
                            {/* Quick Links */}
                            <Flex className='flex-col flex-1'>

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
                            <Flex className='flex-col gap-2 flex-1'>

                                <h1 className='FH'>
                                    CONTACT US
                                </h1>

                                <a href={genDetails.find(item => item.label === "Location")?.val} className='cursor-pointer'>
                                    <Flex className='items-center md:gap-5 gap-1'>
                                        <CiLocationOn className='footericon' color='gold'/>
                                        
                                            <p className='footertext'>
                                                {genDetails.find(item => item.label === "Address")?.val}
                                            </p>
                                        
                                    </Flex>
                                </a>

                                <a 
                                    href={`tel:${genDetails.find(item => item.label === "Phone Number")?.val}`}
                                >
                                    <Flex className='items-center md:gap-5 gap-1 cursor-pointer'>

                                        <CiPhone 
                                            className='footericon' 
                                            color='gold'
                                        />

                                        <p className='footertext'>
                                            {genDetails.find(item => item.label === "Phone Number")?.val}
                                        </p>

                                    </Flex>
                                </a>

                                <a 
                                    href={`mailto:${genDetails.find(item => item.label === "Email")?.val}`}
                                >
                                    <Flex className='items-center md:gap-5 gap-1 cursor-pointer'>

                                        <CiMail 
                                            className='footericon' 
                                            color='gold'
                                        />

                                        <p className='footertext'>
                                            {genDetails.find(item => item.label === "Email")?.val}
                                        </p>

                                    </Flex>
                                </a>

                                <Flex className='items-center md:gap-5 gap-1'>
                                    <CiClock2 className='footericon' color='gold'/>
                                    <p className='footertext'>
                                        {genDetails.find(item => item.label === "Timings")?.val}
                                    </p>
                                </Flex>

                            </Flex>

                        </Flex>
                        

                        <Flex className='max-md:order-3'>

                            {/* Social Media */}
                            <Flex className='flex-col flex-1 gap-2'>

                                <h1 className='FH'>FOLLOW US</h1>

                                <Flex className='gap-2 max-md:gap-5'>

                                    <a href={instLink}>
                                        <img src={InstagramIcon} alt="Captain's Crab Instagram icon" className='SMI'/>
                                    </a>

                                    <a href={tktkLink}>
                                        <img src={TiktokIcon} alt="Captain's Crab TikTok icon" className='SMI'/>
                                    </a>

                                    <a href={fcbkLink}>
                                        <img src={FacebookIcon} alt="Captain's Crab Facebook icon" className='SMI'/>
                                    </a>

                                    <a href={ytLink}>
                                        <img src={YoutubeIcon} alt="Captain's Crab YouTube icon" className='SMI'/>
                                    </a>

                                </Flex>

                            </Flex>

                            

                        </Flex>

                        <Flex className='flex-col max-md:flex-row flex-1 items-center justify-start gap-2 order-2'>
                                
                            <Flex className='flex-col'>
                                <h1 className='FH2'> FRESH CATCHES</h1>
                                <h1 className='FH2'> BIG FLAVOURS</h1>
                                <h1 className='FH2'> GOOD TIMES AHEAD</h1>
                            </Flex>
                            

                            <img src={Logo} alt="Captain's Crab logo" className='footerlogo2'/>


                        </Flex>
                        



                    </div>

                    {/* Separator */}
                    <Box className='w-[80%] h-[2px]'
                        style={{
                            background:'linear-gradient(to left, transparent 2%, gray, transparent 97%)'
                        }}
                    />

                    {/* TOS and Copyright */}
                    <Flex className='items-center gap-6 max-md:gap-2 max-md:justify-center'>
                        <h1 className='footertext'>
                            @ 2026 Captain's Crab Seafood Boil House. All Rights Reserved.

                        </h1>
                        
                        <Box className='h-[20px] w-[1px] bg-[#d9ebff]'/>

                        <h1 className='footertext'>
                            Designed by Magnified Production
                        </h1>


                        <Flex className='gap-6 flex-1 items-center justify-end max-md:gap-2' style={{paddingRight:'10px'}}>

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

                </>
            )}

        
        </div>
    )
})

export default Footer;