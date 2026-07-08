import React from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'
import { IoArrowBackCircle } from "react-icons/io5";
import ItemCard from './ItemCard';
import MenuItemsJSON from '@/assets/JSONs/menuitems.json'
import { useState } from 'react';

const Menu = () => {

    const LobstObj = MenuItemsJSON[0].Items[0];
    const CrabObj = MenuItemsJSON[0].Items[1];
    const ShrimpObj = MenuItemsJSON[0].Items[2];

    const [stepNum, setStepNum] = useState(0);

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

                <IoArrowBackCircle size={'2rem'}/>

                <h1 className='MenuHeader'>
                    // Step One: Choose your catch
                </h1>

                <Flex className='flex-1 justify-center items-center'>

                    <Grid 
                        className='
                            w-full 
                            
                            bg-yellow-500
                            gap-5
                            
                        '

                        templateColumns="repeat(3, 1fr)"

                        style={{
                            padding:'20px'
                        }}
                    >

                        {MenuItemsJSON[stepNum].Items.map((item, i) => (

                            <ItemCard key={i} ItemObj={item} setStepNum={setStepNum}/>
                        ))}

                    </Grid>


                </Flex>

                <h1>
                    Item:
                </h1>
                

            </Flex>

            {/* Separator */}
            <Box className='w-[2px] self-stretch'
                style={{
                    background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'
                }}
            />

            {/* Bucket Visual */}
            <Flex className='MenuCard w-[30%]'>

            </Flex>

            

        </Flex>



        

      
    </div>
  )
}

export default Menu
