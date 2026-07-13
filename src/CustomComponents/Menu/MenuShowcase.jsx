import React from 'react'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import './MenuShowcase.css'
import { useState } from 'react'
import { motion } from 'motion/react'
import ShowcaseItem from './ShowcaseItem'

const MenuShowcase = () => {

    const options = ['Main Courses', 'Salads', 'Sides', 'Sauces', 'Drinks', 'Build Your Own'];

    const [selectedCat, setSelectedCat] = useState("");
    const [index, setIndex] = useState();

    const changeCat = (option) => {

        setSelectedCat(option);
        setIndex(options.indexOf(option));

    };

  return (
    <div
        className='
            w-[80%]
            flex
            flex-col
            items-center
            gap-5
        '
    > 

        {/* Buttons */}
        <Flex
            className='
                w-full
                justify-center
                items-center

                gap-[5%]
            '
        >

            {options.map((option, i) => (
                <motion.button

                    className='msbutton'

                    key={i}

                    onClick={() => setSelectedCat(option)}

                    animate = {{

                        boxShadow: (selectedCat === option) ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '0 0 #0000',
                        backgroundColor:(selectedCat === option) ? '#ef571b' : 'rgba(239, 87, 27, 0)',
                        color:(selectedCat === option) ? '#ffffff' : '#012447'

                    }}

                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut'
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

        <div className='w-full h-full flex justify-center items-center'>

            <SimpleGrid columns={4} gap={'6'}>

                <ShowcaseItem />
                <ShowcaseItem />
                <ShowcaseItem />
                <ShowcaseItem />
                


            </SimpleGrid>


        </div>
      
    </div>
  )
}

export default MenuShowcase
