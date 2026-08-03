import { Box } from '@chakra-ui/react'
import './ItemCard.css'
import { motion } from 'motion/react'
import { resolveImg } from '@/customLib/utils/resolveImage'

const ItemCard = ({ItemObj, incStep, incOrder}) => {

    

  return (
    <motion.div    
        className='
            ItemCard
            rounded-lg
            shadow-lg
            relative
            overflow-hidden
        '

        layout
        transition={{ duration: 0.25, layout: { duration: 0.4, ease: 'easeOut' }}}

        onClick={() => {
            incStep();
            incOrder(ItemObj.Name);
        }}
    >

        <img
            src={resolveImg(ItemObj.Img)}
            alt={ItemObj.Name}
            className='absolute inset-0 w-full h-full'
            style={{
                objectFit: 'cover',
                objectPosition: 'center'
            }}
        />

        <Box className='flex bg-white h-[30%] justify-center items-center relative' style={{padding:'5px'}}>

            <h1 className='text-black'>
                {ItemObj.Name}
            </h1>

        </Box>
      
    </motion.div>
  )
}

export default ItemCard