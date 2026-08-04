import { Box } from '@chakra-ui/react'
import './ItemCard.css'
import { motion } from 'motion/react'
import { resolveImg } from '@/customLib/utils/resolveImage'

const ItemCard = ({ ItemObj, isSelected, onSelect }) => {

    return (

        <motion.div

            className="ItemCard rounded-lg shadow-lg relative overflow-hidden"

            layout

            transition={{
                duration: 0.25,
                layout: {
                    duration: 0.4,
                    ease: 'easeOut'
                }
            }}

            onClick={() => onSelect(ItemObj.Name)}

            style={{

                outline: isSelected
                    ? '3px solid #48bb78'
                    : '3px solid transparent',

                outlineOffset: '-3px',

                cursor: 'pointer',

                transform: isSelected
                    ? 'scale(1.03)'
                    : 'scale(1)'

            }}

        >


            <img

                src={resolveImg(ItemObj.Img)}

                alt={ItemObj.Name}

                className="absolute inset-0 w-full h-full"

                style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}

            />



            <Box

                className="flex bg-white h-[30%] justify-center items-center relative flex-col"

                style={{
                    padding:'5px'
                }}

            >

                <h1 className="text-black">
                    {ItemObj.Name}
                </h1>


                <p
                    className="text-black"
                    style={{
                        fontSize:'0.85rem',
                        fontWeight:'600'
                    }}
                >
                    ${ItemObj.Price}
                </p>


            </Box>



            {isSelected && (

                <Box

                    className="absolute inset-0 pointer-events-none"

                    style={{
                        background:
                        'rgba(72,187,120,0.25)'
                    }}

                />

            )}



        </motion.div>

    )

}


export default ItemCard