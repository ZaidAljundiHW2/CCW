import React from 'react'
import Back2 from '@/assets/img/back2.png'
import { Flex, Box, Text } from '@chakra-ui/react'
import ContactForm from './ContactForm'
import Wave2 from '@/assets/icons/waveicon2.png'
import './Contact.css'
import InstagramIcon from '@/assets/icons/instagram.png'
import FacebookIcon from '@/assets/icons/facebook.png'
import TiktokIcon from '@/assets/icons/tiktok.png'
import BoilBag from '@/assets/img/boil-bag-cutout-transparent.png'
import Tray from '@/assets/img/catering-trays-source.png'
import Back3 from '@/assets/img/back3.png'

const Contact = () => {
  return (
    <div 
        style={{
            marginTop:'-5%',
            backgroundImage: `url(${Back2})`,
            backgroundSize:'cover',
            width:'100%',
            minHeight:'80vh',
            padding:'2%'
        }}

        id='contact'

        className='flex flex-col gap-5'
        
    
    >

        <h1 className='CUH'>
            CONTACT US
        </h1>

        <Flex className='flex-1 bg-radial from-[#012446] from-40% to-[#1d4163] rounded-lg shadow-lg gap-5' padding={'2%'}>

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

            <Box className='w-[5px] bg-red-500'/>

            

            {/* Social Media  */}

            <Flex
                className='
                    flex-1
                    
                    rounded-lg
                    shadow-lg
                    flex-col
                    relative
                '

                

                style={{
                    padding:'20px',
                    backgroundImage:`url(${Back3})`
                }}
            >

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

                <Flex className='flex-col gap-0' paddingBottom={'20px'}>

                    <h1 className='CUH2'>
                        FOLLOW US
                    </h1>

                    <img src={Wave2} className='w-[150px]'/>


                </Flex>

                <Flex className='flex-1 flex-col gap-5' paddingLeft={'20px'}>

                    <Flex gap={'3'} className='items-center'>

                        <img src={InstagramIcon} style={{
                            height:'40px',
                            width:'40px'
                        }}/>
                        <Text className='CUT'>
                            @captainscrab.ca
                        </Text>

                    </Flex>

                    <Flex gap={'3'} className='items-center'>

                        <img src={TiktokIcon} style={{
                            height:'40px',
                            width:'40px'
                        }}/>
                        <Text className='CUT'>
                            @captainscrab.ca
                        </Text>

                    </Flex>

                    <Flex gap={'3'} className='items-center'>

                        <img src={FacebookIcon} style={{
                            height:'40px',
                            width:'40px'
                        }}/>
                        <Text className='CUT'>
                            /captainscrab.ca
                        </Text>

                    </Flex>

                </Flex>


            </Flex>

        </Flex>

        
      
    </div>
  )
}

export default Contact
