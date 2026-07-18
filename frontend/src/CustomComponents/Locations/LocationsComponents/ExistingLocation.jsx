// ExistingLocation.jsx
import React from 'react'
import { Box, Flex, VStack, Button, Heading } from '@chakra-ui/react'
import HomeMapBackground from '@/assets/img/home-map-background-pin.png'
import InfoSec from './InfoSec'
import './ExistingLocation.css'
import { useState, useEffect } from 'react'
import InfoJSON from '@/assets/JSONs/infosec.json'
import DownArrow from '@/assets/icons/DownArrow.png'
import WaveIcon from '@/assets/icons/waveicon.png'
import WaveIcon2 from '@/assets/icons/waveicon2.png'
import ELBack from '@/assets/img/Backgrounds/elback.png'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const ExistingLocation = () => {

  return (
    <div
        id='locations'
        className='
            flex
            landscape:flex-row
            portrait:flex-col
            
        '

        
        
    >

        <Box
            className='landscape:w-[60%] ELFC w-full flex items-center'
            style={{
                backgroundImage: `url(${ELBack})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}
        >

           

                
            <Box
                className='
                    max-w-[60%]
                    flex
                    flex-col
                    justify-center
                    text-black
                    rounded-lg
                    shadow-lg
                    
                '

                style={{padding:'3%', background:'rgb(255 255 255 / 85%) '}}
            >

                <motion.div className='flex w-full'
                
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.2}}
                >
                    <h1 className='ELH'>Our Home Port</h1>

                    <img 
                        src={WaveIcon} 
                        alt='wave icon' 
                        style={{
                            width:'20%',
                            height:'auto',
                            objectFit:'contain'
                        }}
                    />
                </motion.div>

                

                <motion.h1 className='ELH2'
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.1}}
                >
                    Burlington, Ontario

                </motion.h1>

                <motion.p className='ELT'
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut'}}
                >
                    Visit our flagship location in the heart of Burlington - where every meal is a celebration of fresh seafood, community, and unforgettable flavor.
                </motion.p>

            </Box>



                



        </Box>

        <Box
            className='
                landscape:w-[40%]
                w-full
                bg-[#f2eeee]
                flex
                justify-center
                items-center
                outerelwrapper
                
            '
            
        >

            <div
                className='SELW flex h-full rounded-lg shadow-lg gap-2 flex-col justify-center relative w-full min-w-0'
                style={{ background:'#f2eeee' }}
            >
                <motion.h1 className='ELH2 min-w-0 break-words'
                    initial={{opacity:0, y:-50}}

                    whileInView={{opacity:1, y:0}}

                    transition={{duration:.5, ease:'easeOut'}}
                >
                    Visit the flagship
                </motion.h1>

                

                <motion.p className='ELT'
                    initial={{opacity:0, y:-50}}

                    whileInView={{opacity:1, y:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.1}}
                >
                    Our home port in the heart of burlington serving up bold flavours and good times
                </motion.p>

                <VStack className='w-full' align='stretch' spacing={2}>

                    {InfoJSON.map((infopiece, i) => (
                        <InfoSec info={infopiece} index={i} key={i}/>
                    ))}

                </VStack>

                <Flex className='w-full items-center justify-center gap-5' padding={'5%'}>

                    <button className='ELDir'>

                        Directions

                    </button>


                    <Link className='ELBook' to={'/Book'}>
                        Book
                    </Link>
                </Flex>

                
            </div>

        </Box>

    </div>
  )
}

export default ExistingLocation