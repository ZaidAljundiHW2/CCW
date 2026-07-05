import React from 'react'
import Back2 from '@/assets/img/back2.png'
import { Flex, Box } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import ContactForm from './ContactForm'

const Contact = () => {
  return (
    <div 
        style={{
            marginTop:'-5%',
            backgroundImage: `url(${Back2})`,
            backgroundSize:'cover',
            width:'100%',
            minHeight:'80vh',
            padding:'2%'
        }}

        className='flex flex-col gap-5'
        
    
    >

        <h1>
            CONTACT US
        </h1>

        <Flex className='flex-1 bg-yellow-500 gap-5' padding={'2%'}>

            {/* Contact Form */}

            <Flex
                className='
                    flex-col
                    flex-1
                    bg-green-500
                    rounded-lg
                    shadow-lg

                '   

                style={{
                    padding:'2%'
                }}
            >

                <ContactForm />

                

            </Flex>


            {/* Separator */}

            <Box className='w-[5px] bg-red-500'/>

            

            {/* Social Media  */}

            <Flex
                className='
                    flex-1
                    bg-blue-500
                '
            >

            </Flex>

        </Flex>

        
      
    </div>
  )
}

export default Contact
