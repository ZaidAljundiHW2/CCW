import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { resolveImg } from '@/customLib/utils/resolveImage'
import './ShowcaseItem.css'
import { AnimatePresence, motion } from 'motion/react'

const ShowcaseItem = ({
    item,
    setSelectedMenuItem = () => {},
    edit=false,
    setShowMenuItemEdit = () => {}
}) => {

    const handleMenuEditToggle = (item) => {

        if (edit == false) {
            return;
        }

        setShowMenuItemEdit(true);
        setSelectedMenuItem(item);
    }

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
            cursor: edit ? 'pointer' : 'auto'
        }}

        onClick={() => handleMenuEditToggle(item)}

        
    >

        {/* Image and price */}
        <div className="w-full flex flex-col lg:flex-row landscape:items-center justify-center gap-2">

            <div className="relative w-full portrait:w-[50%] lg:w-1/2 aspect-square bg-green-500 overflow-hidden rounded-full">
                <div
                    className="absolute inset-0 w-full h-full rounded-full"
                    style={{
                        backgroundImage: `url(${item.foodimage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>

            <div 
                className="flex justify-center items-center w-full lg:w-1/2"
                style={{ containerType: 'inline-size' }}
            >
                <h1 style={{
                    color: "#012447",
                    fontWeight: 'bold',
                    fontSize: 'clamp(1rem, 12cqi, 2.5rem)'
                }}>
                    {item.price + "$"}
                </h1>
            </div>
        </div>

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
