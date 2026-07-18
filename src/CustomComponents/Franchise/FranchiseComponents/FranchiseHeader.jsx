import React from 'react'
import SeafoodPile from '@/assets/img/seafood pile.png'
import { Flex } from '@chakra-ui/react'
import './FranchiseHeader.css'
import OceanBack from '@/assets/img/Backgrounds/oceanback.jpg'
import { motion } from 'motion/react'

const FranchiseHeader = () => {
  return (
    <div
        className='
            flex
            items-center
            justify-center
            overflow-hidden
            gap-2
            landscape:gap-10
            
            
        '

        style={{
            background:`url(${OceanBack})`,
            backgroundSize:'100% 100%',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            padding:'10px'
        }}
    >

        {/* <div 
            className='relative flex items-center justify-center w-[22%] FHImgWr'
        >
            <img 
                src={SeafoodPile}
                className="w-full h-auto object-contain"
                style={{
                    paddingTop:'var(--nav-height)'

                }}
            />
        </div> */}

        <Flex
            className='
                flex-1
            '
        >
            {/* Header */}
            <Flex
                className='
                    flex-col
                    justify-center
                '
            >

                <motion.h1 className='FHH' style={{color:'white', paddingTop:'var(--nav-height)'}}

                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.1}}

                >
                    BRING THE <span style={{color:'#ef571b'}}> BOIL </span> TO YOUR CITY
                </motion.h1>

                <motion.p className='FHT' style={{color:'white'}}
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut'}}
                >
                    Unforgettable flavors. Loyal guests. Powerful Support. Let's build something amazing - together.
                </motion.p>

               

            </Flex>

            

        </Flex>
      
    </div>
  )
}

export default FranchiseHeader
