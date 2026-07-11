// InfoSec.jsx
import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import ClockIcon from '@/assets/icons/contact-clock-orange.png'
import './InfoSec.css'
import { resolveImg } from '@/customLib/utils/resolveImage'

const InfoSec = ({info}) => {
  return (
    <div className='w-full flex gap-5 items-center'>

        <div className='w-10 aspect-square shrink-0 overflow-hidden'>
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




    </div>
  )
}

export default InfoSec