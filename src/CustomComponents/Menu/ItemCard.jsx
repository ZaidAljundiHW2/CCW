import React from 'react'
import { Box } from '@chakra-ui/react'
import './ItemCard.css'
import fitty from 'fitty'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { resolveImg } from '@/customLib/utils/resolveImage'

const ItemCard = ({ItemObj, incStep, incOrder}) => {

    

  return (
    <motion.div    
        className='
            ItemCard
            rounded-lg
            shadow-lg
            
        '

        layout
        transition={{ duration: 0.25, layout: { duration: 0.4, ease: 'easeInOut' }}}

        style={{
            backgroundImage:`url(${resolveImg(ItemObj.Img)})`,
            backgroundSize:'cover',
            backgroundPosition: 'center'
        }}

        onClick={() => {
            incStep();
            incOrder(ItemObj.Name);
        }}
    >

        <Box className='flex bg-white h-[30%] justify-center items-center' style={{padding:'5px'}}>

            <h1 className='text-black'>
                {ItemObj.Name}
            </h1>

        </Box>
      
    </motion.div>
  )
}

export default ItemCard
