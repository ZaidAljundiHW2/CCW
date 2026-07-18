import React from 'react'
import { Flex } from '@chakra-ui/react'
import WhyCCBack from '@/assets/img/Backgrounds/anchorcrabback.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import './WhyCC.css'
import WhyCCCard from './WhyCCCard'
import FranchiseItemsJSON from '@/assets/JSONs/franchisecards.json'
import Franchise from '../Franchise'
import { motion } from 'motion/react'

const WhyCC = () => {
  return (
    <div
        className='
            w-full
            flex
            landscape:gap-10
            gap-3
            landscape:flex-row
            flex-col
        '

        style={{
            backgroundImage:`url(${WhyCCBack})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            padding:'20px'
        }}
    >

        {/* Text */}
        <Flex
            className='
                landscape:w-[30%]
                w-full
                flex-col
                
                rounded-lg
                shadow-lg

            '

            style={{
                padding:'20px',
                background:'rgb(255 255 255 / 85%)'
            }}

            
        >

            <Flex
                className='items-center justify-start gap-5'
            >
                <motion.h1 className='WhyCCHead' style={{color: '#ef571b'}}

                    initial={{opacity:0, x:-50}}
                    
                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut',delay:.3}}
                >
                    WHY CAPTAIN'S CRAB
                </motion.h1>

                <motion.img src={waveicon} 
                    style={{
                        width:'20%',
                        height:'auto',
                        objectFit:'contain'
                    }}

                    initial={{opacity:0, x:-50}}
                    
                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut',delay:.3}}
                />
            </Flex>

            <motion.h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}

                initial={{opacity:0, x:-50}}
                    
                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut',delay:.2}}
            >
                BUILT FOR FLAVOR. DESIGNED FOR SUCCESS.
            </motion.h1>

            <motion.img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}
                initial={{opacity:0, x:-50}}
                    
                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut', delay:.1}}
            />

            <motion.p style={{color:'#012447'}} className='WhyCCText'
                initial={{opacity:0, x:-50}}
                    
                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut'}}
            >
                We do more than serve seafood - we create unforgettable experiences and help our franchise partners build thriving businesses.
            </motion.p>


        </Flex>

        {/* Cards */}
        <div className='grid grid-cols-2 landscape:grid-cols-4 landscape:gap-10 gap-3 items-stretch justify-center flex-1'>

            {FranchiseItemsJSON[0].map((card, i) => (

                <WhyCCCard CardItem={card} index={i} key={i}/>
            ))}

        </div>


      
    </div>
  )
}

export default WhyCC
