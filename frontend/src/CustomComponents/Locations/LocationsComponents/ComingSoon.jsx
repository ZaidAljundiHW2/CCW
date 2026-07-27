import React, { useState, useEffect } from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import Lighthouse from '@/assets/img/lighthouse.png'
import Wave2 from '@/assets/icons/waveicon2.png'
import "./ComingSoon.css"
import CSCard from './CSCard'
import { motion, AnimatePresence } from 'motion/react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import {
  Badge,
  Box,
  Carousel,
  HStack,
  Icon,
  IconButton,
  Image,
  Span,
  Stack,
} from "@chakra-ui/react"
import { FaStar } from "react-icons/fa"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const ComingSoon = () => {

    const API = import.meta.env.VITE_API_URL;

    const [isLoading, setIsLoading] = useState(false);
    
    const [comingSoonItems, setComingSoonItems] = useState([]);

    const slidesPerPage = 3;
    const pageCount = Math.ceil(comingSoonItems.length / slidesPerPage);
    const showArrows = pageCount > 1;

    const getCS = async() => {

        try {

            const response = await fetch(API + '/coming-soon');
            const jsonData = await response.json();

            setComingSoonItems(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const load = async() => {

            await getCS();
            setIsLoading(false);
        }

        load();

    },[])

    return (
        <div
            className='
                flex
                bg-[#F2F0EF]
                gap-5
                items-center
                justify-center
                landscape:flex-row
                flex-col
            '
            style={{
                padding:'20px',
            }}
        >

            {/* Text */}
            <Flex className='flex-1 gap-5 items-center justify-center'>

                <motion.div
                    initial={{opacity:0, x:-50}}
                    whileInView={{opacity:1, x:0}}
                    transition={{duration:.5, ease:'easeOut'}}
                >
                    <img src={Lighthouse}/>
                </motion.div>

                <Flex className='flex-col'>

                    <motion.h1 className='CSH'
                        initial={{opacity:0, x:-50}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:.5, ease:'easeOut', delay:.2}}
                    >
                        MORE LOCATIONS COMING SOON.
                    </motion.h1>

                    <motion.img src={Wave2} 
                        style={{
                            height:'20px',
                            width:'auto'
                        }}
                        initial={{opacity:0, x:-50}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:.5, ease:'easeOut', delay:.1}}
                    />

                    <motion.p className='CST'
                        initial={{opacity:0, x:-50}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:.5, ease:'easeOut'}}
                    >
                        We're setting sail for new shores! Captain's Crab is expanding to bring bold, craveable seafood experiences to communities across Canada.
                    </motion.p>    

                </Flex>

            </Flex>

            {/* Cards Carousel */}
            <Flex className='flex-1 w-full flex-col gap-4' style={{padding:'20px'}}>

                {isLoading ? (
                    <p style={{color:'black', alignSelf:'center'}}>Loading...</p>
                ) : (
                    <Carousel.Root slideCount={comingSoonItems.length} slidesPerPage={slidesPerPage} gap="3" w="full">
                        <HStack align="stretch" gap="2" w="full" h="280px">
                            {showArrows && (
                                <Carousel.PrevTrigger asChild>
                                    <IconButton size="xs" variant="subtle" alignSelf="center">
                                        <LuChevronLeft />
                                    </IconButton>
                                </Carousel.PrevTrigger>
                            )}

                            <Box flex="1" minW="0" h="full">
                                <Carousel.ItemGroup h="full">
                                    {comingSoonItems.map((CSLocation, index) => (
                                        <Carousel.Item
                                            key={CSLocation.csid}
                                            index={index}
                                            h="full"
                                        >
                                            <CSCard csitem={CSLocation} index={index}/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel.ItemGroup>
                            </Box>

                            {showArrows && (
                                <Carousel.NextTrigger asChild>
                                    <IconButton size="xs" variant="subtle" alignSelf="center">
                                        <LuChevronRight />
                                    </IconButton>
                                </Carousel.NextTrigger>
                            )}
                        </HStack>
                    </Carousel.Root>
                )}
            </Flex>

        </div>
    )
}

export default ComingSoon