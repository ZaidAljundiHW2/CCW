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

const ExistingLocation = () => {

  return (
    <div style={{
        marginTop:'-5%'
    }}>

        <Box
            className='w-full min-h-[50vh] relative'
            style={{
                backgroundImage: `url(${HomeMapBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <Flex
                className='
                    w-full
                    relative
                '
                style={{ minHeight: '50vh' }}
            >

                <Box
                    className='
                        w-[71%]
                        py-10
                        items-center
                        flex
                    '

                    style={{
                        paddingLeft:'10%',
                        paddingRight: '5%'
                    }}

                >
                    <Box
                        className='
                            max-w-[40%]
                            flex
                            flex-col
                            justify-center
                            text-black
                        '
                    >

                        <Flex className='flex-1 w-full'>
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
                        </Flex>

                        

                        <h1 className='ELH2'>Burlington, Ontario</h1>

                        <p className='ELT'>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident"
                        </p>

                    </Box>



                </Box>

                <div
                    className='
                        flex
                        max-w-[29%]
                        justify-center
                        items-center
                        min-w-0

                        
                    '

                    style={{
                        padding:'1%'
                    }}
                >

                    <div
                        className='flex rounded-lg shadow-lg gap-2 flex-col justify-center relative w-full min-w-0'
                        style={{ padding: '5%' }}
                    >
                        <h1 className='ELH2 min-w-0 break-words'>Visit the flagship</h1>

                        

                        <p className='ELT'>Our home port in the heart of burlington serving up bold flavours and good times</p>

                        <VStack className='w-full' align='stretch' spacing={2}>

                            {InfoJSON.map((infopiece) => (
                                <InfoSec info={infopiece} key={infopiece.Text}/>
                            ))}

                        </VStack>

                        <Flex className='w-full items-center justify-center gap-5' padding={'5%'}>

                            <Button className='flex-1 ELDir'>

                                Directions

                            </Button>


                            <Button className='flex-1 ELBook'>

                                Book

                            </Button>
                        </Flex>

                        
                    </div>



                </div>

            </Flex>



        </Box>

    </div>
  )
}

export default ExistingLocation