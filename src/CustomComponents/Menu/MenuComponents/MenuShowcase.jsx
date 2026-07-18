import React from 'react'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import './MenuShowcase.css'
import { useState } from 'react'
import { motion } from 'motion/react'
import ShowcaseItem from './ShowcaseItem'
import MenuItemsJSON from '@/assets/JSONs/menuitems.json'
import { select } from 'motion/react-client'
import CreateYourOwn from './CreateYourOwn'
import { AnimatePresence } from 'motion/react'
import { resolveImg } from '@/customLib/utils/resolveImage'
import './ShowcaseItem.css'
const MenuShowcase = () => {

    const options = ['Main Courses', 'Salads', 'Sides', 'Sauces', 'Drinks', 'Build Your Own'];

    const [selectedCat, setSelectedCat] = useState("Main Courses");
    const [index, setIndex] = useState(0);

    const changeCat = (option) => {

        console.log(option)
        setSelectedCat(option);
        setIndex(options.indexOf(option));

    };

  return (
    <motion.div
        className='
            w-full
            md:w-[80%]
            flex
            flex-col
            items-center
            gap-5
        '

        layout

        initial={{opacity:0, y:-50}}

        whileInView={{opacity:1, y:0}}

        transition={{duration:.7, ease:'easeOut'}}
        
    > 

        {/* Buttons */}
        <Flex
            className='
                w-full
                md:justify-center
                justify-start
                items-center
                overflow-x-scroll
                md:overflow-x-auto
                gap-[5%]
            '
        >

            {options.map((option, i) => (
                <motion.button

                    className='msbutton'

                    key={i}

                    onClick={() => changeCat(option)}

                    animate = {{

                        boxShadow: (selectedCat === option) ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '0 0 #0000',
                        backgroundColor:(selectedCat === option) ? '#ef571b' : 'rgba(239, 87, 27, 0)',
                        color:(selectedCat === option) ? '#ffffff' : '#012447'

                    }}

                    transition={{
                        duration: 0.3,
                        ease: 'easeOut'
                    }}

                    style={{
                        borderRadius:'8px'
                    }}
                >
                    {option}
                </motion.button>
            ))}

        </Flex>


        {/* Grid */}

        <motion.div layout className='w-full h-full flex relative justify-center items-center'>

                <AnimatePresence mode='wait'>

                
                    <motion.div layout className='w-full h-full'
                    
                        initial={{
                            opacity:0
                        }}

                        animate={{
                            opacity:1
                        }}

                        exit={{
                            opacity:0
                        }}

                        transition={{ duration: 0.25, ease: 'easeOut' }}

                        key={index}
                    >

                    
                
                        {(!(selectedCat === "Build Your Own")) && (

                            <SimpleGrid columns={{base:2, md:4}} gap={'6'}>


                                {MenuItemsJSON[index].Items.map((item) => (
                                    <ShowcaseItem item={item} key={item.Name} />
                                ))}


                            </SimpleGrid>
                        )}

                        {(selectedCat === "Build Your Own") && (

                    
                            <CreateYourOwn />
                        )}

                    </motion.div>

                </AnimatePresence>
           
            
        
            


        </motion.div>
      
    </motion.div>
  )
}

export default MenuShowcase
