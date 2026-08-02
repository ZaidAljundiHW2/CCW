import Back2 from '@/assets/img/back2.webp'
import { Flex, Box, Text } from '@chakra-ui/react'
import ContactForm from './ContactForm'
import Wave2 from '@/assets/icons/waveicon2.webp'
import './Contact.css'
import InstagramIcon from '@/assets/icons/instagram.webp'
import FacebookIcon from '@/assets/icons/facebook.webp'
import YoutubeIcon from '@/assets/icons/youtube.webp'
import TiktokIcon from '@/assets/icons/tiktok.webp'
import BoilBag from '@/assets/img/boil-bag-cutout-transparent.webp'
import Tray from '@/assets/img/catering-trays-source.webp'
import Back3 from '@/assets/img/back3.webp'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const Contact = () => {

    const [instLink, setInstLink] = useState("");
    const [fcbkLink, setFcbkLink] = useState("");
    const [tktkLink, setTktkLink] = useState("");
    const [ytLink, setYtLink] = useState("");

    

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

    useEffect(() => {

        const load = async() => {

            await getSocialMedia();
        }

        load();

    },[])



  return (
    <div 
        style={{
            backgroundImage: `url(${Back2})`,
            backgroundSize:'cover',
            width:'100%',
            
        }}

        id='contact'

        className='flex flex-col gap-5 contactwrapper'
        
    
    >

        <motion.h1 className='CUH' style={{color:'white', paddingTop:'var(--nav-height)'}}
            initial={{opacity:0, x:-50}}

            whileInView={{opacity:1, x:0}}

            transition={{duration:.5, ease:'easeOut', delay:.1}}
        >
            CONTACT US
        </motion.h1>

        <motion.div className='flex landscape:flex-row flex-col bg-radial from-[#012446] from-40% to-[#1d4163] rounded-lg shadow-lg landscape:gap-5 gap-0' 
            style={{padding:'2%'}}
            initial={{opacity:0, y:-50}}

            whileInView={{opacity:1, y:0}}

            transition={{duration:.5, ease:'easeOut'}}
        >

            {/* Contact Form */}
            <Flex
                className='
                    flex-col
                    flex-1
                    rounded-lg
                    shadow-lg
                    bg-[#F2F0EF]
                '   

                style={{
                    padding:'2%'
                }}
            >

                <ContactForm />

                

            </Flex>


            {/* Separator */}

            <Box className='w-[5px]'/>

            

            {/* Social Media  */}
            <Flex className='flex-1 rounded-lg
                        shadow-lg' style={{
                        backgroundImage:`url(${Back3})`
                    }}>

            
                <Flex
                    className='
                        flex-1
                        
                        
                        flex-col
                        relative
                        socmediawrapper
                    '

                    

                    
                >

                    

                    <Flex className='flex-col gap-0'>

                        <h1 className='CUH2' style={{color:'white'}}>
                            FOLLOW US
                        </h1>

                        <img src={Wave2} className='w-[150px]'/>


                    </Flex>

                    <Flex className='flex-1 flex-col landscape:gap-5 gap-2'>

                        <a href={instLink}>
                            <Flex gap={'3'} className='items-center'>

                                <img src={InstagramIcon} style={{
                                    height:'40px',
                                    width:'40px'
                                }}/>
                                <Text className='CUT' style={{color:'white'}}>
                                    @captainscrab
                                </Text>

                            </Flex>
                        </a>

                        <a href={tktkLink}>
                            <Flex gap={'3'} className='items-center'>

                                <img src={TiktokIcon} style={{
                                    height:'40px',
                                    width:'40px'
                                }}/>
                                <Text className='CUT' style={{color:'white'}}>
                                    @captainscrab
                                </Text>

                            </Flex>
                        </a>
                        
                        <a href={ytLink}>
                            <Flex gap={'3'} className='items-center'>

                                <img src={YoutubeIcon} style={{
                                    height:'40px',
                                    width:'40px'
                                }}/>
                                <Text className='CUT' style={{color:'white'}}>
                                    @CaptainsCrab
                                </Text>

                            </Flex>
                        </a>

                        <a href={fcbkLink}>
                            <Flex gap={'3'} className='items-center'>

                                <img src={FacebookIcon} style={{
                                    height:'40px',
                                    width:'40px'
                                }}/>
                                <Text className='CUT' style={{color:'white'}}>
                                    Captain's Crab
                                </Text>

                            </Flex>
                        </a>

                    </Flex>


                </Flex>

                <Flex className='flex-1 relative'>

                    <img 
                        src={BoilBag}
                        alt='boil bag'

                        className='CUI'
                    />

                    <img 
                        src={Tray}
                        alt='boil bag'

                        className='CUI2'
                    />

                </Flex>

            </Flex>

        </motion.div>

        

        
      
    </div>
  )
}

export default Contact
