// InfoSec.jsx
import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import ClockIcon from '@/assets/icons/contact-clock-orange.png'
import './InfoSec.css'
import { resolveImg } from '@/customLib/utils/resolveImage'
import { motion } from 'motion/react'

const InfoSec = ({info, index}) => {
    console.log(index);
  return (
    <motion.div className='w-full flex gap-5 items-center'

        initial={{opacity:0, y:-50}}

        whileInView={{opacity:1, y:0}}

        transition={{duration:.5, ease:'easeOut', delay:index*.2}}

        

    >

        <div className='md:w-10 w-5 aspect-square shrink-0 overflow-hidden'>
            <img
                src={resolveImg(info.img)}
                alt='icon'
                className='w-full h-full object-contain block'
            />
        </div>


        <div
            className='
                flex-1
                items-center
                flex
            '
        >

            <p className='IST'>
                {info.Text}
            </p>

        </div>




    </motion.div>
  )
}

export default InfoSec