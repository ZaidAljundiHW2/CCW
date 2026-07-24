import React, { useState } from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import Lighthouse from '@/assets/img/lighthouse.png'
import Wave2 from '@/assets/icons/waveicon2.png'
import "./ComingSoon.css"
import CSCard from './CSCard'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import MississaugaSketch from '@/assets/img/mississaugasketch.jpg'
import OttowaSketch from '@/assets/img/ottowasketch.jpg'
import { motion, AnimatePresence } from 'motion/react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'


const locations = [
    { image: TorontoSketch, location: 'Toronto' },
    { image: MississaugaSketch, location: 'Mississauga' },
    { image: OttowaSketch, location: 'Ottowa' },
]

const CARDS_PER_PAGE = 3

const ComingSoon = () => {
    const [page, setPage] = useState(0)
    const [direction, setDirection] = useState(1)

    const totalPages = Math.ceil(locations.length / CARDS_PER_PAGE)
    const canCycle = locations.length > CARDS_PER_PAGE

    const start = page * CARDS_PER_PAGE
    const visibleCards = locations.slice(start, start + CARDS_PER_PAGE)

    const handleNext = () => {
        setDirection(1)
        setPage((prev) => (prev + 1) % totalPages)
    }

    const handlePrev = () => {
        setDirection(-1)
        setPage((prev) => (prev - 1 + totalPages) % totalPages)
    }

    const goToPage = (i) => {
        setDirection(i > page ? 1 : -1)
        setPage(i)
    }

    return (
        <div
            className='
                flex
                bg-[#F2F0EF]
                gap-5
                items-center
                justify-center
                landscape:flex-row
                flex-col
            '
            style={{
                padding:'20px',
            }}
        >

            {/* Text */}
            <Flex className='flex-1 gap-5 items-center justify-center'>

                <motion.div
                    initial={{opacity:0, x:-50}}
                    whileInView={{opacity:1, x:0}}
                    transition={{duration:.5, ease:'easeOut'}}
                >
                    <img src={Lighthouse}/>
                </motion.div>

                <Flex className='flex-col'>

                    <motion.h1 className='CSH'
                        initial={{opacity:0, x:-50}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:.5, ease:'easeOut', delay:.2}}
                    >
                        MORE LOCATIONS COMING SOON.
                    </motion.h1>

                    <motion.img src={Wave2} 
                        style={{
                            height:'20px',
                            width:'auto'
                        }}
                        initial={{opacity:0, x:-50}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:.5, ease:'easeOut', delay:.1}}
                    />

                    <motion.p className='CST'
                        initial={{opacity:0, x:-50}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:.5, ease:'easeOut'}}
                    >
                        We're setting sail for new shores! Captain's Crab is expanding to bring bold, craveable seafood experiences to communities across Canada.
                    </motion.p>    

                </Flex>

            </Flex>

            {/* Cards Carousel */}
            <Flex className='flex-1 w-full flex-col gap-4 items-center' style={{padding:'20px'}}>

                <Flex className='w-full items-center justify-center gap-3'>

                    {canCycle && (
                        <button
                            onClick={handlePrev}
                            className='CSCarouselArrow'
                            aria-label='Previous locations'
                        >
                            <IoChevronBack size={22} />
                        </button>
                    )}

                    <Flex className='flex-1' style={{overflow:'hidden'}}>
                        <AnimatePresence mode='wait' custom={direction}>
                            <motion.div
                                key={page}
                                className='flex gap-5 flex-wrap justify-center w-full'
                                custom={direction}
                                initial={(dir) => ({opacity:0, x: dir * 60})}
                                animate={{opacity:1, x:0}}
                                exit={(dir) => ({opacity:0, x: dir * -60})}
                                transition={{duration:.4, ease:'easeOut'}}
                            >
                                {visibleCards.map((card, i) => (
                                    <CSCard
                                        key={start + i}
                                        image={card.image}
                                        index={i}
                                        location={card.location}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </Flex>

                    {canCycle && (
                        <button
                            onClick={handleNext}
                            className='CSCarouselArrow'
                            aria-label='Next locations'
                        >
                            <IoChevronForward size={22} />
                        </button>
                    )}

                </Flex>

                {canCycle && (
                    <Flex className='gap-2 items-center justify-center'>
                        {Array.from({length: totalPages}).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPage(i)}
                                aria-label={`Go to page ${i + 1}`}
                                style={{
                                    width:'8px',
                                    height:'8px',
                                    borderRadius:'50%',
                                    background: i === page ? '#012447' : '#d9d9d9',
                                    border:'none',
                                    cursor:'pointer',
                                    padding:0,
                                    transition:'background .2s ease',
                                }}
                            />
                        ))}
                    </Flex>
                )}

            </Flex>

        </div>
    )
}

export default ComingSoon