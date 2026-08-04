import { useState } from 'react'
import { Box, Grid, Button } from '@chakra-ui/react'
import '../Menu.css'
import { IoArrowBackCircle } from "react-icons/io5"
import ItemCard from './ItemCard'
import MenuItemsJSON from '@/assets/JSONs/buildyourownitems.json'
import { motion, AnimatePresence } from 'motion/react'

import RestBack from '@/assets/img/Backgrounds/restback.webp'
import BucketBack from '@/assets/img/FoodShowcase/bucket_withoutlip.webp'
import BucketFrontFold from '@/assets/img/FoodShowcase/bucket_lip.webp'
import BucketImagesJSON from '@/assets/JSONs/BucketImages.json'

import { resolveImg } from '@/customLib/utils/resolveImage'

import BucketMask from '@/assets/img/FoodShowcase/bucket_mask.webp'

import './CreateYourOwn.css'


const CATCH_SLOTS = {
    1: [
        {
            top: '10%',
            left: '18%',
            width: '64%',
            height: '40%'
        }
    ],

    2: [
        {
            top: '10%',
            left: '8%',
            width: '55%',
            height: '38%'
        },
        {
            top: '10%',
            left: '38%',
            width: '55%',
            height: '38%'
        }
    ],

    3: [
        {
            top: '13%',
            left: '5%',
            width: '45%',
            height: '35%'
        },
        {
            top: '7%',
            left: '28%',
            width: '45%',
            height: '40%'
        },
        {
            top: '13%',
            left: '50%',
            width: '45%',
            height: '35%'
        }
    ]
}

const SPICE_SLOT = {
    top: '60%',
    left: '-6%',
    width: '46%',
    height: '34%'
}

const SAUCE_SLOT = {
    top: '60%',
    left: '27%',
    width: '46%',
    height: '34%'
}

const SIDE_SLOT = {
    top: '60%',
    left: '60%',
    width: '46%',
    height: '34%'
}


const STEP_SLOTS = [
    null,
    SIDE_SLOT,
    SAUCE_SLOT,
    SPICE_SLOT
]


const FOOD_FILTER =
    'saturate(1.08) contrast(1.05) drop-shadow(0 3px 3px rgba(0,0,0,0.35))'


const CreateYourOwn = () => {

    const [stepNum, setStepNum] = useState(0)
    const [selections, setSelections] = useState(
        MenuItemsJSON.map(() => [])
    )
    const [atEnd, setAtEnd] = useState(false)


    const currentStepConfig = MenuItemsJSON[stepNum]
    const isMultiSelect = !!currentStepConfig?.MultiSelect
    const maxSelect = currentStepConfig?.Max || 1


    const getItemData = (name) => {
        for (const step of MenuItemsJSON) {
            const found = step.Items.find(item => item.Name === name)
            if (found) return found
        }

        return null
    }


    const getTotalPrice = () => {
        return selections
            .flat()
            .reduce((total, name) => {
                const item = getItemData(name)
                return total + (item?.Price || 0)
            }, 0)
    }


    const getSelectionText = () => {

        const items = selections.flat()

        if (!items.length)
        return null

        return (
            <>
                Item:{' '}
                {items.map((name, index) => {

                    const item = getItemData(name)

                    return (
                        <span key={name}>
                            {name} (${item?.Price || 0})
                            {index !== items.length - 1 && ', '}
                        </span>
                    )

                })}
            </>
        )
    }



    const goToStep = (index) => {

        if (index < 0)
            return

        if (index >= MenuItemsJSON.length) {
            setAtEnd(true)
            return
        }

        setStepNum(index)
    }



    const toggleSelection = (itemName) => {

        setSelections(prev => {

            const updated = [...prev]
            const current = updated[stepNum]


            if (current.includes(itemName)) {

                updated[stepNum] =
                    current.filter(n => n !== itemName)

            } else {

                if (current.length >= maxSelect)
                    return prev

                updated[stepNum] =
                    [...current, itemName]
            }


            return updated
        })
    }



    const handleItemClick = (itemName) => {

        if (isMultiSelect) {

            toggleSelection(itemName)
            return

        }


        setSelections(prev => {

            const updated = [...prev]

            updated[stepNum] = [itemName]

            return updated
        })


        goToStep(stepNum + 1)

    }



    const restartMenu = () => {

        setSelections(MenuItemsJSON.map(() => []))
        setStepNum(0)
        setAtEnd(false)

    }



    const renderCatchLayer = () => {

        const names = selections[0]

        if (!names.length)
            return null


        const slots = CATCH_SLOTS[names.length] || []


        return names.map((name, i) => {

            const imgData =
                BucketImagesJSON.find(b => b.Name === name)


            const slot = slots[i]


            if (!imgData || !slot)
                return null



            return (

                <img
                    key={name}
                    src={resolveImg(imgData.Img)}
                    className="absolute transition-opacity duration-700"
                    style={{
                        ...slot,
                        objectFit: 'contain',
                        filter: FOOD_FILTER,
                        zIndex: 10
                    }}
                />

            )

        })

    }



    const renderSingleLayer = (stepIndex) => {

        const names = selections[stepIndex]

        if (!names.length)
            return null


        const slot = STEP_SLOTS[stepIndex]


        const imgData =
            BucketImagesJSON.find(
                b => b.Name === names[0]
            )


        if (!imgData || !slot)
            return null



        return (

            <img
                src={resolveImg(imgData.Img)}
                className="absolute transition-opacity duration-700"
                style={{
                    ...slot,
                    objectFit: 'contain',
                    filter: FOOD_FILTER,
                    zIndex: 10 + stepIndex
                }}
            />

        )

    }



    return (

        <div
            className="rounded-lg shadow-lg items-center justify-center flex CYOContainer"
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
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            className="MenuCard flex flex-col w-full CYOoptionsContainer"
        >


            <IoArrowBackCircle
                className="backbutton"
                onClick={() => goToStep(stepNum - 1)}
            />



            <h1
                className="MenuHeader"
                style={{color:'white'}}
            >

                {currentStepConfig.Header}

                {isMultiSelect && (

                    <span
                        style={{
                            fontSize:'0.55em',
                            opacity:0.8,
                            display:'block'
                        }}
                    >
                        Pick up to {maxSelect}
                        {' '}
                        —
                        {' '}
                        {selections[stepNum].length}/{maxSelect}
                    </span>

                )}

            </h1>



            <div
                className="flex items-center justify-center gap-8 w-full"
            >

                <Grid
                    className="itemgrid"
                    gap={{base:2, landscape:5}}
                    templateColumns="repeat(3,minmax(0,160px))"
                >

                {
                    currentStepConfig.Items.map((item,i)=>(

                        <ItemCard
                            key={i}
                            ItemObj={item}
                            isSelected={
                                selections[stepNum]
                                .includes(item.Name)
                            }
                            onSelect={handleItemClick}
                        />

                    ))
                }

                </Grid>


                <h1
                    className="MenuText"
                    style={{
                        color:'white',
                        maxWidth:'250px'
                    }}
                >
                    {getSelectionText()}
                </h1>

            </div>

            {isMultiSelect && (

                <Button
                    className="w-[50%]"
                    isDisabled={
                        selections[stepNum].length===0
                    }
                    onClick={() =>
                        goToStep(stepNum+1)
                    }
                >

                    Next

                </Button>

            )}



        </motion.div>



        ) : (


        <motion.div
            key="bucket"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.5}}
            className="
                MenuCard items-center justify-center relative flex w-full
                overflow-hidden CYOvisualContainer landscape:flex-row flex-col
            "
            style={{
                backgroundImage:
                `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${RestBack})`,
                backgroundSize:'cover'
            }}
        >



        <div
            className="landscape:h-[65%] flex relative"
            style={{
                aspectRatio:'1024 / 1536',
                maxHeight:'440px',
                maxWidth:'293px',
                width:'100%'
            }}
        >



        <img
            src={BucketBack}
            className="w-full h-full object-contain absolute"
        />



        <div
            className="absolute inset-0"
            style={{

                zIndex:10,

                WebkitMaskImage:`url(${BucketMask})`,
                WebkitMaskRepeat:'no-repeat',
                WebkitMaskSize:'100% 100%',

                maskImage:`url(${BucketMask})`,
                maskRepeat:'no-repeat',
                maskSize:'100% 100%'

            }}
        >

            {renderCatchLayer()}

        </div>




        <div
            className="absolute inset-0"
            style={{zIndex:20}}
        >

            {renderSingleLayer(1)}
            {renderSingleLayer(2)}
            {renderSingleLayer(3)}

        </div>




        <img
            src={BucketFrontFold}
            className="w-full h-full object-contain absolute"
            style={{
                zIndex:100,
                pointerEvents:'none'
            }}
        />



        </div>



        <Box
            className="w-[70%] flex justify-center items-center flex-col gap-5 resultshowcase"
        >

            <h1
                className="MenuHeader"
                style={{color:'white'}}
            >
                {getSelectionText()}
            </h1>


            <h2
                style={{
                    color:'white',
                    fontSize:'1.5rem'
                }}
            >
                Total: ${getTotalPrice()}
            </h2>



            <Button
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