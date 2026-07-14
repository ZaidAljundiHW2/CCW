import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { resolveImg } from '@/customLib/utils/resolveImage'
import './ShowcaseItem.css'
import { AnimatePresence, motion } from 'motion/react'

const ShowcaseItem = ({item}) => {
  return (



   
    <div
        className='
            flex
            flex-col
            rounded-lg
            shadow-lg
            
            justify-start
            overflow-hidden
            relative
            gap-5
        '

        style={{
            padding:'20px',
        }}

        
    >

        {/* Image and price */}
        <Flex
            className='
                w-full
                h-[50%]
            '

            
        >

            <Flex
                className='
                    flex-1

                '

                
            >

                <img 
                    
                    src={resolveImg(item.Img)}

                    className='
                        rounded-full
                    '

                    style={{
                        aspectRatio: '1 / 1',
                    }}
                />

            </Flex>


            <Flex
                className='
                    justify-end
                    items-center
                    flex-1
                '

                style={{
                    paddingRight:'20px'
                }}
            >

                <h1 style={{color:"#012447", fontWeight:'bold'}}>
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

            <h1 className='SIHeader' 
                style={{
                    color:'#012447',
                    fontSize: item.HasDescription ? '1.5rem' : '2rem'
                }}
            >
                {item.Name}
            </h1>

            {item.HasDescription && (

                <p style={{fontSize:'.75rem', color:'#012447'}}>
                    {item.Description}

                </p>

            )}

            

            


        </Flex>

    
    </div>
  )
}

export default ShowcaseItem
