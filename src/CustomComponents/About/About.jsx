import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutUsBack from '@/assets/img/aboutusback.png'
import './About.css'

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
                flex-col
            '

            style={{
                padding:'40px'
            }}
        >

            <h1 className='auhead'>
                About Us
            </h1>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>


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
