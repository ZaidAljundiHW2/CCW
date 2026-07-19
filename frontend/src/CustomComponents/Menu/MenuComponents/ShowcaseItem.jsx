import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { resolveImg } from '@/customLib/utils/resolveImage'
import './ShowcaseItem.css'
import { AnimatePresence, motion } from 'motion/react'

const ShowcaseItem = ({item}) => {
  return (



   
    <motion.div
        className='
            flex
            flex-col
            rounded-lg
            shadow-lg
            justify-start
            overflow-hidden
            relative
            gap-5
            showcaseitemcard
        '

        style={{
            padding:'20px',
        }}

        
    >

        {/* Image and price */}
        <Flex
            className='
                w-full
                lg:h-[50%]
                gap-2

                lg:flex-row
                flex-col

                              
            '

            
        >

            <Flex
                className='
                    landscape:aspect-square 
                    w-[80px]
                    h-[80px]
                    landscape:w-[120px]
                    landscape:h-[120px]
                    flex-shrink-0
                '

                

                
            >

                <img 
                    
                    src={item.foodimage}

                   

                    className="
                        rounded-full
                        w-full
                        h-full
                        object-cover
                    "
                />

            </Flex>


            <Flex
                className='
                    justify-end
                    items-center
                    flex-1
                '

               
            >

                <h1 style={{color:"#012447", fontWeight:'bold', fontSize:'clamp(.5rem, 1vw, 1.5rem)'}}>
                    {item.price}
                </h1>

            </Flex>

            

            

            

        </Flex>

        <Flex
            className='
                items-center
                flex-col
                flex-1
                gap-2
            '

            style={{
                justifyContent: item.hasdesc ? 'start' : 'center'
            }}
        >

            <h1 
                className='
                    SIHeader
                ' 
                style={{
                    color:'#012447',
                }}
            >
                {item.itemname}
            </h1>

            {item.hasdesc && (

                <p style={{color:'#012447'}} className='itemdesc'>
                    {item.itemdescription}

                </p>

            )}

            

            


        </Flex>

    
    </motion.div>
  )
}

export default ShowcaseItem
