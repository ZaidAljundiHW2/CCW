import React from 'react'
import Back2 from '@/assets/img/back2.png'
import { Flex } from '@chakra-ui/react'

const Contact = () => {
  return (
    <div 
        style={{
            marginTop:'-5%',
            backgroundImage: `url(${Back2})`,
            backgroundSize:'cover',
            width:'100%',
            minHeight:'80vh',
            padding:'5%'
        }}

        className='flex gap-5'
    
    >

        <Flex className='flex-1 bg-yellow-500' padding={'2%'}>

            <Flex
                className='
                    flex-col
                '   
            >

                <h1>
                    CONTACT US
                </h1>

                <h1>
                    THE BURLINGTON FLAGSHIP
                </h1>

            </Flex>

        </Flex>

        
      
    </div>
  )
}

export default Contact
