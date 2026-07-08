import React from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'

const Menu = () => {
  return (
    <div 
        style={{
            marginTop:'-5%', 
            width:'100%', 
            minHeight:'100vh',
            backgroundImage:`url(${MenuBackground})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}

        className='flex justify-center items-center'
    >

        <Flex
            className='
                w-[90%]
                min-h-[90vh]
                rounded-lg
                shadow-lg
                bg-red-500
                items-stretch
                gap-5
            '

            style={{
                padding:'20px'
            }}
        >
            
            {/* Options */}
            <Flex className='MenuCard'>

                <h1>
                    Step 1: Choose your catch
                </h1>

                <Grid>

                </Grid>

            </Flex>

            {/* Separator */}
            <Box className='w-[2px] self-stretch'
                style={{
                    background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'
                }}
            />

            {/* Bucket Visual */}
            <Flex className='MenuCard'>

            </Flex>

            

        </Flex>



        

      
    </div>
  )
}

export default Menu
