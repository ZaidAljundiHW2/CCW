import React from 'react'
import { Box } from '@chakra-ui/react'
import './ItemCard.css'

const ItemCard = ({ItemObj, setStepNum}) => {
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

            <h1 className='ICT'>
                {ItemObj.Name}
            </h1>

        </Box>
      
    </Box>
  )
}

export default ItemCard
