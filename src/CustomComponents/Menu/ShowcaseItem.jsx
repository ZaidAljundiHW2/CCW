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
                md:h-[50%]
                gap-2
                              
            '

            
        >

            <Flex
                className='
                    md:aspect-square 
                '

                

                
            >

                <img 
                    
                    src={resolveImg(item.Img)}

                    className='
                        rounded-full
                    '

                    style={{
                        aspectRatio: '1 / 1',
                        width:'100%',
                        height:'100%',
                    }}
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
                    {item.Price}
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
                justifyContent: item.HasDescription ? 'start' : 'center'
            }}
        >

            <h1 
                className='
                    SIHeader
                ' 
                style={{
                    color:'#012447',
                    fontSize: item.HasDescription ? 'clamp(.8rem, 1.5vw, 3rem)' : 'clamp(1rem, 2vw, 3.2rem)'
                }}
            >
                {item.Name}
            </h1>

            {item.HasDescription && (

                <p style={{fontSize:'clamp(.5rem, .75vw, 1.5rem)', color:'#012447'}}>
                    {item.Description}

                </p>

            )}

            

            


        </Flex>

    
    </motion.div>
  )
}

export default ShowcaseItem
