import React from 'react'
import { Box, Flex, Grid, Button } from '@chakra-ui/react'
import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'
import { IoArrowBackCircle } from "react-icons/io5";
import ItemCard from './ItemCard';
import MenuItemsJSON from '@/assets/JSONs/menuitems.json'
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RestBack from '@/assets/img/Backgrounds/restback.jpg'

// Bucket Imports
import BucketImg from '@/assets/img/FoodShowcase/bucket.png'
import BucketImagesJSON from '@/assets/JSONs/BucketImages.json'
import InfiniteAppetizerCarousel from './InfiniteAppetizerCarousel';

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
            backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${MenuBackground})`,
            backgroundSize:'cover',
            backgroundPosition:'center'
        }}

    

        className='flex justify-center items-center flex-col gap-5'
    >

        <h1 className='MenuHeader2' style={{color:'white', paddingTop:"20px"}}>
            EXPLORE OUR MENU
        </h1>

        <motion.div
            className='
                w-[90%]
                rounded-lg
                shadow-lg
                gap-5
                items-center
                justify-center
                flex
            '

            style={{
                padding:'20px',
                backgroundImage: 'radial-gradient(#9ac8f5, #012447 30%)',
                position:'relative'
            }}

            layout
            transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}


        >
            
            {/* Options */}
            <AnimatePresence mode='popLayout'>

                {!(atEnd) && (
                    <motion.div 
                        key={'options'}
                        className='
                            MenuCard 
                            flex-col 
                            flex
                            flex-1
                        '
                        transition={{
                            opacity: { duration: 0.5 }
                        }}
                        exit={{ opacity: 0 }}


                    >

                        <IoArrowBackCircle size={'2rem'} onClick={() => {
                            decrementStep();
                            decrementOrder();
                        }}/>

                        <AnimatePresence mode='popLayout'>
                            <motion.h1
                                key={stepNum}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25, layout: { duration: 0.4, ease: 'easeInOut' }}}
                                className="MenuHeader"
                                layout

                            >
                                {MenuItemsJSON[stepNum].Header}
                            </motion.h1>
                        </AnimatePresence>

                        <Flex className='justify-center items-start'>
                            <AnimatePresence mode='popLayout'>
                                <motion.div

                                    className='w-full h-full'
                                
                                    initial={{
                                        opacity:0
                                    }}

                                    animate={{
                                        opacity:1
                                    }}

                                    exit={{
                                        opacity:0
                                    }}

                                    transition={{ duration: 0.25, ease: 'easeInOut' }}

                                    key={stepNum}

                                    
                                >

                                    <Grid 
                                        className='
                                            w-full 
                                            place-items-center
                                            justify-center
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
                        
                        <motion.div layout='position'>

                            <h1 className='MenuText'>
                                {order}
                            </h1>

                        </motion.div>
                        
                        

                    </motion.div>

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
            <motion.div 
                className='
                    MenuCard 
                    items-center 
                    justify-center
                    relative
                    flex
                    w-[100%]
                    flex-1
                    min-w-0
                    overflow-hidden
                '
                
                layout

                transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}

                style={{
                    backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${RestBack})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    backgroundRepeat:'no-repeat'
                }}


            >

                <div className='w-[75%] aspect-square flex relative' style={{maxWidth:'500px'}}>

            
                    <motion.img 
                        layout 
                        src={BucketImg} 
                        className="w-full h-full object-contain absolute"
                        transition={{layout: {delay:0.4}}}
                    />

                    {BucketImagesJSON.map((image, i) => (
                        <motion.img 
                            src={image.Img} 
                            key={i} 
                            transition={{layout: {delay:0.4}}}
                            className='absolute transition-opacity duration-700'
                            layout
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

                



            </motion.div>

            

            

        </motion.div>

        <motion.div  
            className='
                flex
                w-[100%] 
                flex-col
                justify-center
                items-center
                gap-5
                bg-[#f2f0ef]

            '

            layout
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}


            style={{
                padding:'20px'
            }}
        >

            <h1 className='MenuHeader2'>
                Our Appetizers
            </h1>

            <InfiniteAppetizerCarousel />


        </motion.div>



        

      
    </div>
  )
}

export default Menu
