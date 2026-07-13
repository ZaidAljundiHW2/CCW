import React from 'react'
import { Flex } from '@chakra-ui/react'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import OurValuesJSON from '@/assets/JSONs/OurValues.json'

import ValueCard from './ValueCard'

const OurValues = () => {
  return (
    <div
        className='
            min-h-[50vh]
            bg-[#f2eeee]
            flex
            flex-col
            gap-5
        '

        style={{
            padding:'20px'
        }}
    >
        
        
        <Flex
            className='items-center gap-3 justify-center items-center'
        >
            <h1 className='WhyCCHead' style={{color: '#ef571b', fontSize:'2rem'}}>
                OUR VALUES
            </h1>

            <img src={waveicon3} 
                style={{
                    width:'5%',
                    height:'auto',
                    objectFit:'contain'
                }}/>
        </Flex>

        <Flex className='flex-1  gap-5'>

            {OurValuesJSON.map((value, i) => (
                <ValueCard Value={value} key={i} />
            ))}

        </Flex>

            

        
      
    </div>
  )
}

export default OurValues
