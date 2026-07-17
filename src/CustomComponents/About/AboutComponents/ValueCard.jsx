import React from 'react'
import { FaAnchor } from "react-icons/fa";
import { Flex } from '@chakra-ui/react';
import './ValueCard.css'
import { GiSadCrab } from "react-icons/gi";
import { LuHeartHandshake } from "react-icons/lu";
import { MdPeople } from "react-icons/md";
import { motion } from 'motion/react';

const ValueCard = ({Value, index}) => {
  return (
    <motion.div
        className='
        
            flex-1
            flex
            flex-col
            rounded-lg
            shadow-lg
            relative
            items-center
            justify-center
            text-center
            gap-5

        '

        style={{
            padding:'7% 20px 20px 20px',
        }}

        initial={{opacity:0, y:-50}}

        whileInView={{opacity:1, y:0}}

        transition={{duration:.5, ease:'easeInOut', delay:index*.2}}
    >  

        <Flex className='flex-col justify-center items-center'>

            {/* Icon */}
            <Flex
                className='
                    rounded-full
                    flex
                    justify-center
                    items-center
                    md:w-[25%]
                    w-[50%]

                '

                style={{
                    aspectRatio: '1 / 1',
                    borderWidth:'2px',
                    borderColor:'white',

                    background: (Value.Icon === "anchor" || Value.Icon === "handshake" ? '#ef571b' : '#135695')
                }}

            >

                {(Value.Icon === "anchor") && (<FaAnchor color='white' size={'2.5rem'}/>)}

                {Value.Icon === "crab" && (<GiSadCrab color='white' size={'2.5rem'}/>)}
                {Value.Icon === "handshake" && (<LuHeartHandshake color='white' size={'2.5rem'}/>)}
                {Value.Icon === "team" && (<MdPeople color='white' size={'2.5rem'}/>)}



            </Flex>

            <h1 className='WhyCCHead' style={{color:'#012447'}}>
                {Value.Header}
            </h1>

            <p className='WhyCCText' style={{color:'#012447'}}>
                {Value.Text}
            </p>
        </Flex>
      
    </motion.div>
  )
}

export default ValueCard
