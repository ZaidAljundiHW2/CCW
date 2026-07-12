import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutUsBack from '@/assets/img/aboutusback.png'

const About = () => {
  return (
    <div
        className='
            min-h-[70vh]
            w-full
            flex
            bg-white
            
        '

        id='about'

        style={{
            padding:'20px',
            backgroundImage:'linear-gradient(to right, #012447, #1b2c3d)'
        }}
    >

        <Flex
            className='
                flex-1
                rounded-lg
                shadow-xl
            '
        >

        </Flex>

        <Flex
            className='
                flex-1
                rounded-lg
                shadow-lg
            '
            style={{
                backgroundImage:`url(${AboutUsBack})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat'
            }}
        >

        </Flex>
      
    </div>
  )
}

export default About
