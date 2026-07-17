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
            min-w-[0]
            md:flex-1
            w-[45%]
            CSCard
            
        '

        style={{
            
            background:`url(${image})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}
    >


        <Flex className='flex-col gap-5 justify-center items-center' style={{zIndex:'1'}}>

            <Flex className='w-full md:flex-row flex-col justify-center items-center'>
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



    </Flex>

  )
}

export default CSCard
