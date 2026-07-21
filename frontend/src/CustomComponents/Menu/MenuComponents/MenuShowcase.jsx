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
import { useLayoutEffect, useEffect, useRef } from 'react'

const MenuShowcase = ({edit = false}) => {

    const API = 'http://localhost:5000'

    const [selectedCat, setSelectedCat] = useState("");
    
    const [index, setIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [catitems, setCatItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const catJsons = useRef([]);

    const getMenuItems = async () => {

        try {

            const response = await fetch(API + '/menu/menu-items');
            const menuitems = await response.json();
            console.log("CCC");
            console.log(menuitems);
            const collections = []
            console.log(catJsons);

            for (const cat of catJsons.current) {
                
                collections.push(menuitems.filter(item => item.categoryid === cat.categoryid));

            }

            console.log("AAA")
            console.log(collections);
            setCatItems(collections);
            
        } catch (error) {
            console.error(error)
        }
    }

    const getCategories = async () => {

        try {
            
            const response = await fetch(API + '/menu/menu-categories', {

                method:"GET",
                headers: {
                    Host: "captainscrab",
                    Accept: "applications/json"
                    
                }
            })

            const jsonData = await response.json();
            const categories = jsonData.map(item => item.category);

            console.log(categories);
            console.log(jsonData);
            catJsons.current = jsonData;
            setOptions(categories);
            setSelectedCat(categories[0]);

        } catch (error) {

            console.error(error);
            
        }
    }

    const changeCat = (option) => {

        console.log(option)
        setSelectedCat(option);
        setIndex(options.indexOf(option));

    };


    useEffect(() => {

        const load = async () => {
            await getCategories();
            await getMenuItems();

            setIsLoading(false);
            console.log("Website Loaded!")
            
        };

        load();

    },[]);

  return (
    <motion.div
        className={`
            w-full
            ${edit ? 'landscape:w-full' : 'landscape:w-[80%]'}
            ${edit ? 'overflow-y-scroll' : 'overflow-y-auto'}
            flex
            flex-col
            items-center
            gap-5
        `}

        layout

        initial={{opacity:0, y:-50}}

        whileInView={{opacity:1, y:0}}

        transition={{duration:.7, ease:'easeOut'}}
        
    > 

        {/* Buttons */}
        <Flex
            className='
                w-full
                landscape:justify-center
                justify-start
                items-center
                overflow-x-scroll
                landscape:overflow-x-auto
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

                            isLoading ? (

                                <p style={{color:'black'}}>Loading...</p> 

                            )
                            
                            : 

                            (

                                <SimpleGrid columns={{_portrait:2, _landscape:4}} gap={'6'}>


                                    {catitems[index]?.map((item) => (
                                        <ShowcaseItem item={item} key={item.fooditemid} />
                                        
                                    ))}


                                </SimpleGrid>

                            )

                            

                            
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
