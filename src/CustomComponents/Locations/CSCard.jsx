import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import './CSCard.css'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import { IoLocationSharp } from "react-icons/io5";

const CSCard = ({image, location}) => {
  return (
    
    <Flex
        className='
            rounded-lg
            shadow-lg
            items-start
            justify-center
            overflow-hidden
            flex-1
            
        '

        style={{
            padding:'20px',
            background:`url(${image})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}
    >


        <Flex className='flex-col gap-5 justify-center items-center' style={{zIndex:'1'}}>

            <Flex className='w-full md:flex-row flex-col items-center'>
                <h1 className='CSCH'>
                    {location}
                </h1>
                <IoLocationSharp color='#ef571b' size={'2rem'}/>

            </Flex>


            <Flex className='items-center justify-center flex-1 bg-[#012447] rounded-lg' style={{padding:'10px'}}>
                <h1 className='CSCT'>
                    Coming Soon
                </h1>

            </Flex>
        </Flex>



    </Flex>

  )
}

export default CSCard
