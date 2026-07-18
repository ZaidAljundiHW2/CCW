import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import './CSCard.css'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import { IoLocationSharp } from "react-icons/io5";
import { motion } from 'framer-motion';

const CSCard = ({image, location, index}) => {
  return (
    
    <motion.div
        className='
            rounded-lg
            shadow-lg
            items-start
            justify-center
            overflow-hidden
            min-w-[0]
            landscape:flex-1
            flex
            w-[45%]
            CSCard
            
        '

        style={{
            
            background:`url(${image})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}

        initial={{opacity:0, x:-50}}

        whileInView={{opacity:1, x:0}}

        transition={{duration:.5, ease:'easeOut', delay:.2 * index}}
    >


        <Flex className='flex-col gap-5 justify-center items-center' style={{zIndex:'1'}}>

            <Flex className='w-full landscape:flex-row flex-col justify-center items-center'>
                <h1 className='CSCH w-full min-w-0'>
                    {location}
                </h1>
                <IoLocationSharp color='#ef571b' className='locationicon'/>

            </Flex>


            <Flex className='items-center justify-center bg-[#012447] rounded-lg CSCardbutton'>
                <h1 className='CSCT' style={{color:'white'}}>
                    Coming Soon
                </h1>

            </Flex>
        </Flex>



    </motion.div>

  )
}

export default CSCard
