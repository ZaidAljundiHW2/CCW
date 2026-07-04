import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import './CSCard.css'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import { IoLocationSharp } from "react-icons/io5";

const CSCard = ({image, location}) => {
  return (
    <Flex
        className='flex-1 items-center justify-center'
    >
        <Flex
            className='
                w-[90%]
                h-[90%]
                rounded-lg
                shadow-lg
                bg-[#F2F0EF]
                relative
                items-center
                justify-center
                overflow-hidden
            '
        >


            <Flex className='flex-col gap-5' style={{zIndex:'1'}}>

                <Flex className='w-full'>
                    <Heading className='CSCH'>
                        {location}
                    </Heading>
                    <IoLocationSharp color='orange' size={'2rem'}/>

                </Flex>


                <Flex className='items-center justify-center bg-[#012447] rounded-lg' style={{padding:'10px'}}>
                    <Heading className='CSCT'>
                        Coming Soon
                    </Heading>

                </Flex>
            </Flex>

            <img src={image} className='CSCimgG'/>


        </Flex>

    </Flex>
  )
}

export default CSCard
