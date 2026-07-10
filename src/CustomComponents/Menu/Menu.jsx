import React from 'react'
import { Box, Flex, Grid, Button } from '@chakra-ui/react'
import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'
import { IoArrowBackCircle } from "react-icons/io5";
import ItemCard from './ItemCard';
import MenuItemsJSON from '@/assets/JSONs/menuitems.json'
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Bucket Imports
import BucketImg from '@/assets/img/FoodShowcase/bucket.png'
import BucketImagesJSON from '@/assets/JSONs/BucketImages.json'

const Menu = () => {

    const [stepNum, setStepNum] = useState(0);
    const [order, setOrder] = useState("Item: ");
    const [orderItems, setOrderItems] = useState([]);
    const [atEnd, setAtEnd] = useState();

    const incrementStep = () => {

        let next = stepNum+1;

        console.log(next);
        console.log(MenuItemsJSON.length);

        if (next === MenuItemsJSON.length){
            setAtEnd(true)
            return;
        } 

        setStepNum(next);
    };

    const decrementStep = () => {

        let prev = stepNum - 1;

        if (prev + 1 === 0) return;

        setStepNum(prev);
    };

    const incrementOrder = (itemName) => {

        let currOrder = order;
        let updatedItems = orderItems;
        updatedItems.push(itemName);

        let lastOrderIndex = currOrder.lastIndexOf(",")
        let lastItem = currOrder.slice(lastOrderIndex);

        console.log(updatedItems);

        if (lastItem === ", Mild" || lastItem === ", Spicy" || lastItem === ", Extra Spicy") return;

        let updatedOrder = currOrder + ", " + itemName;


        setOrder(updatedOrder);
        setOrderItems(updatedItems);

    };

    const decrementOrder = () => {

        let currOrder = order;
        let currItems = orderItems;
        let updatedItems = currItems.slice(0, currItems.length - 1);

        let lastOrderIndex = currOrder.lastIndexOf(",");

        console.log(updatedItems);

        if (lastOrderIndex == -1) return;

        let decrementedOrder = currOrder.slice(0, lastOrderIndex);

        setOrder(decrementedOrder);
        setOrderItems(updatedItems);
    }

    const restartMenu = () => {

        setOrder("Item: ");
        setOrderItems([]);
        setStepNum(0);
        setAtEnd(false);
    }


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
                rounded-lg
                shadow-lg
                bg-red-500
                gap-5
            '

            style={{
                padding:'20px'
            }}
        >
            
            {/* Options */}
            <AnimatePresence>

                {!(atEnd) && (
                    <Flex className='MenuCard flex-col flex-1'>

                        <IoArrowBackCircle size={'2rem'} onClick={() => {
                            decrementStep();
                            decrementOrder();
                        }}/>

                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={stepNum}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="MenuHeader"
                            >
                                {MenuItemsJSON[stepNum].Header}
                            </motion.h1>
                        </AnimatePresence>

                        <Flex className='justify-center items-center bg-red-500'>
                            <AnimatePresence mode='wait'>
                                <motion.div

                                    className='w-full h-full bg-red-500'
                                
                                    initial={{
                                        opacity:0
                                    }}

                                    animate={{
                                        opacity:1
                                    }}

                                    exit={{
                                        opacity:0
                                    }}

                                    key={stepNum}
                                >

                                    <Grid 
                                        className='
                                            w-full 
                                            place-items-center
                                            justify-center
                                            bg-yellow-500
                                            gap-5
                                            
                                        '

                                        templateColumns="repeat(3, 1fr)"

                                        style={{
                                            padding:'20px'
                                            
                                        }}


                                    >

                                        {MenuItemsJSON[stepNum].Items.map((item, i) => (

                                            <ItemCard 
                                                key={i} 
                                                ItemObj={item} 
                                                incStep={incrementStep}
                                                incOrder={incrementOrder}
                                                
                                            />
                                        ))}

                                    </Grid>

                                </motion.div>

                            </AnimatePresence>
                            


                        </Flex>

                        <h1 className='bg-red-500'>
                            {order}
                        </h1>
                        

                    </Flex>

                )}

            </AnimatePresence>
            
            

            {/* Separator */}

            {!(atEnd) && (

                <AnimatePresence>
                    <Box className='w-[2px] self-stretch'
                        style={{
                            background:'linear-gradient(to top, transparent 2%, gray, transparent 97%)'
                        }}
                    />
                </AnimatePresence>

            )}
            

            {/* Bucket Visual */}
            <Flex 
                className='
                    MenuCard 
                    items-center 
                    justify-center
                    relative
                    flex-1
                '
            >

                <div className='w-[75%] aspect-square flex relative' style={{maxWidth:'500px'}}>

            
                    <img src={BucketImg} className="w-full h-full object-contain"/>

                    {BucketImagesJSON.map((image, i) => (
                        <img 
                            src={image.Img} 
                            key={i} 
                            className='absolute transition-opacity duration-700'
                            style={{
                                opacity: orderItems.includes(image.Name) ? 1 : 0
                            }}
                        />
                    ))}

                </div>

                
                <AnimatePresence>
                    {atEnd && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className='flex justify-center items-center'
                        >
                            <Box
                                className="
                                    w-[70%]
                                    flex
                                    justify-center
                                    items-center
                                    flex-col
                                    gap-5
                                    bg-red-500
                                "
                                style={{
                                    padding: '20px'
                                }}
                            >
                                <h1 className='text-center'>
                                    {order}
                                </h1>

                                <Button className="w-[30%]" onClick={restartMenu}>
                                    Restart
                                </Button>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                



            </Flex>

            

            

        </Flex>



        

      
    </div>
  )
}

export default Menu
