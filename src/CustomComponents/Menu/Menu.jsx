import React from 'react'
import { Box } from '@chakra-ui/react'

const Menu = () => {
  return (
    <div style={{marginTop:'-5%', position:'relative', width:'100%', height:'100vh'}}>

        <Box 
            className='
                w-full
                h-full
                bg-green-500
                absolute
            '
        />

        <Box 
            className='
                w-full 
                h-full 
                absolute
            '

            style={{backgroundImage:'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 15%)'}}
        />

        <Box 
            className='
                w-full 
                h-full 
                absolute
            '

            style={{backgroundImage:'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 15%)'}}
        />

      
    </div>
  )
}

export default Menu
