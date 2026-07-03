import React from 'react'
import { Box } from '@chakra-ui/react'
import SeparatorImg from '@/assets/img/Separator.png'

const Separator = () => {
  return (
    <div 
        style={{
            marginTop:'-5%', 
            zIndex:'-10', 
            position:'relative',
            height:'50vh',
            width:'100%',
            overflow:'hidden',
            backgroundImage: `url(${SeparatorImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment:'fixed'
        }}
    >
        <Box className='h-full w-full bg-black/50'/>


        
      
    </div>
  )
}

export default Separator
