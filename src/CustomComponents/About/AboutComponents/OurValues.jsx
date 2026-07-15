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
            gap-10
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

                className='md:w-[5%] w-[10%] h-[auto] contain'

            />
        </Flex>

        <div className='grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-3 items-stretch justify-center flex-1'>

            {OurValuesJSON.map((value, i) => (
                <ValueCard Value={value} key={i} />
            ))}

        </div>

            

        
      
    </div>
  )
}

export default OurValues
