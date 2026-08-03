import { useState } from 'react'
import { Box, Grid, Button } from '@chakra-ui/react'
import '../Menu.css'
import { IoArrowBackCircle } from "react-icons/io5"
import ItemCard from './ItemCard'
import MenuItemsJSON from '@/assets/JSONs/buildyourownitems.json'
import { motion, AnimatePresence } from 'motion/react'

import RestBack from '@/assets/img/Backgrounds/restback.webp'
import BucketImg from '@/assets/img/FoodShowcase/bucket.webp'
import BucketImagesJSON from '@/assets/JSONs/BucketImages.json'

import { resolveImg } from '@/customLib/utils/resolveImage'

import './CreateYourOwn.css'


const CreateYourOwn = () => {

    const [stepNum, setStepNum] = useState(0)
    const [order, setOrder] = useState("Item: ")
    const [orderItems, setOrderItems] = useState([])
    const [atEnd, setAtEnd] = useState(false)


    const incrementStep = () => {

        const next = stepNum + 1

        if (next === MenuItemsJSON.length) {
            setAtEnd(true)
            return
        }

        setStepNum(next)
    }


    const decrementStep = () => {

        const prev = stepNum - 1

        if (prev < 0) return

        setStepNum(prev)

    }


    const incrementOrder = (itemName) => {

        const updatedItems = [...orderItems, itemName]

        const lastOrderIndex = order.lastIndexOf(",")
        const lastItem = order.slice(lastOrderIndex)

        if (
            lastItem === ", Mild" ||
            lastItem === ", Spicy" ||
            lastItem === ", Extra Spicy"
        ) {
            return
        }


        setOrder(
            `${order}, ${itemName}`
        )

        setOrderItems(updatedItems)

    }


    const decrementOrder = () => {

        const updatedItems = orderItems.slice(
            0,
            orderItems.length - 1
        )


        const lastOrderIndex = order.lastIndexOf(",")

        if (lastOrderIndex === -1) return


        setOrder(
            order.slice(0, lastOrderIndex)
        )

        setOrderItems(updatedItems)

    }


    const restartMenu = () => {

        setOrder("Item: ")
        setOrderItems([])
        setStepNum(0)
        setAtEnd(false)

    }



    return (

        <div

            className="
                w-full
                rounded-lg
                shadow-lg
                items-center
                justify-center
                flex
                CYOContainer
            "

            style={{
                padding:'20px',
                background:'#012447',
                position:'relative'
            }}

        >


            <AnimatePresence mode="wait">


                {!atEnd ? (

                    <motion.div

                        key="selector"

                        initial={{
                            opacity:0
                        }}

                        animate={{
                            opacity:1
                        }}

                        exit={{
                            opacity:0
                        }}

                        transition={{
                            duration:0.4
                        }}


                        className="
                            MenuCard
                            flex
                            flex-col
                            w-full
                            CYOoptionsContainer
                        "

                    >


                        <IoArrowBackCircle

                            className="backbutton"

                            onClick={() => {

                                decrementStep()
                                decrementOrder()

                            }}

                        />



                        <AnimatePresence mode="wait">

                            <motion.h1

                                key={stepNum}

                                initial={{
                                    opacity:0
                                }}

                                animate={{
                                    opacity:1
                                }}

                                exit={{
                                    opacity:0
                                }}

                                transition={{
                                    duration:0.25
                                }}

                                className="MenuHeader"

                                style={{
                                    color:'white'
                                }}

                            >

                                {MenuItemsJSON[stepNum].Header}

                            </motion.h1>


                        </AnimatePresence>




                        <Grid

                            className="
                                w-full
                                place-items-center
                                justify-center
                                itemgrid
                            "

                            gap={{
                                base:2,
                                landscape:5
                            }}

                            templateColumns="repeat(3, minmax(0, 220px))"

                        >


                            {MenuItemsJSON[stepNum].Items.map(
                                (item,i)=>(

                                    <ItemCard

                                        key={i}

                                        ItemObj={item}

                                        incStep={incrementStep}

                                        incOrder={incrementOrder}

                                    />

                                )
                            )}


                        </Grid>




                        <h1

                            className="MenuText"

                            style={{
                                color:'white'
                            }}

                        >

                            {order}

                        </h1>


                    </motion.div>


                ) : (



                    <motion.div

                        key="bucket"

                        initial={{
                            opacity:0
                        }}

                        animate={{
                            opacity:1
                        }}

                        exit={{
                            opacity:0
                        }}

                        transition={{
                            duration:0.5
                        }}


                        className="
                            MenuCard
                            items-center
                            justify-center
                            relative
                            flex
                            w-full
                            overflow-hidden
                            CYOvisualContainer
                            landscape:flex-row
                            flex-col
                        "


                        style={{

                            backgroundImage:
                            `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url(${RestBack})`,

                            backgroundSize:'cover',

                            backgroundPosition:'center',

                            backgroundRepeat:'no-repeat'

                        }}

                    >



                        <div

                            className="
                                landscape:w-[75%]
                                w-full
                                aspect-square
                                flex
                                relative
                            "

                            style={{
                                maxWidth:'500px'
                            }}

                        >



                            <img

                                src={BucketImg}

                                className="
                                    w-full
                                    h-full
                                    object-contain
                                    absolute
                                "

                            />



                            {BucketImagesJSON.map(
                                (image,i)=>(


                                    <img

                                        key={i}

                                        src={resolveImg(image.Img)}

                                        className="
                                            absolute
                                            transition-opacity
                                            duration-700
                                            z-10
                                        "

                                        style={{

                                            opacity:
                                            orderItems.includes(image.Name)
                                            ? 1
                                            : 0

                                        }}

                                    />


                                )
                            )}



                        </div>




                        <Box

                            className="
                                w-[70%]
                                flex
                                justify-center
                                items-center
                                flex-col
                                gap-5
                                resultshowcase
                            "

                        >


                            <h1

                                className="MenuHeader"

                                style={{
                                    color:'white'
                                }}

                            >

                                {order}

                            </h1>




                            <Button

                                className="
                                    landscape:w-[30%]
                                    w-[70%]
                                "

                                onClick={restartMenu}

                            >

                                Restart

                            </Button>



                        </Box>



                    </motion.div>


                )}


            </AnimatePresence>



        </div>

    )

}


export default CreateYourOwn