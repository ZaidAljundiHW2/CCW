import React from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import Lighthouse from '@/assets/img/lighthouse.png'
import Wave2 from '@/assets/icons/waveicon2.png'
import "./ComingSoon.css"
import CSCard from './CSCard'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import MississaugaSketch from '@/assets/img/mississaugasketch.jpg'
import OttowaSketch from '@/assets/img/ottowasketch.jpg'
import { HiH1 } from 'react-icons/hi2'
import { motion } from 'motion/react'

const ComingSoon = () => {
  return (
    <div
        className='
            flex
            bg-[#F2F0EF]
            gap-5
            items-center
            justify-center
            md:flex-row
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

        {/* Cards */}
        <Flex className='flex-1 w-full gap-5 flex-wrap' style={{padding:'20px'}}>

            <CSCard image={TorontoSketch} index={0} location={"Toronto"}/>
            <CSCard image={MississaugaSketch} index={1} location={"Mississauga"}/>
            <CSCard image={OttowaSketch} index={2} location={"Ottowa"}/>

        </Flex>
        


      
    </div>
  )
}

export default ComingSoon
