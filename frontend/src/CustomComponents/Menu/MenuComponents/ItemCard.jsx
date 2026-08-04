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

            <div className="ItemImageContainer">

                <img
                    src={resolveImg(ItemObj.Img)}
                    alt={ItemObj.Name}
                    className="w-full h-full"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />

            </div>


            <Box

                className="ItemTextBox flex bg-white justify-center items-center flex-col"

                style={{
                    padding:'5px',
                    minHeight:'45px'
                }}

            >

                <h1
                    className="text-black"
                    style={{
                        fontSize:"clamp(.6rem, 1vw, 1.5rem)",
                        lineHeight:"1.1"
                    }}
                >
                    {ItemObj.Name}
                </h1>


                

            </Box>



            {isSelected && (

                <Box
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:'rgba(72,187,120,0.25)'
                    }}
                />

            )}

        </motion.div>

    )

}

export default ItemCard