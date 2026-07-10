import React from 'react'
import { Box } from '@chakra-ui/react'
import './ItemCard.css'
import fitty from 'fitty'
import { useEffect } from 'react'

const ItemCard = ({ItemObj, setStepNum}) => {

    useEffect(() => {
        fitty('fit');
    }, []);

  return (
    <Box    
        className='
            ItemCard
            rounded-lg
            shadow-lg
            
        '

        style={{
            backgroundImage:`url(${ItemObj.Img})`,
            backgroundSize:'cover',
            backgroundPosition: 'center'
        }}

        onClick={() => setStepNum(prev => prev + 1)}
    >

        <Box className='flex bg-white h-[30%] justify-center items-center'>

            <h1 className='text-black fit'>
                {ItemObj.Name}
            </h1>

        </Box>
      
    </Box>
  )
}

export default ItemCard
