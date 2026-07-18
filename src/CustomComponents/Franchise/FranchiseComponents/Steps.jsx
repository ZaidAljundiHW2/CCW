import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import StepsBack from '@/assets/img/Backgrounds/f2back.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './WhyCC.css'
import WhyCCCard from './WhyCCCard'
import FranchiseItemsJSON from '@/assets/JSONs/franchisecards.json'
import Step from './Step'
import { motion } from 'motion/react'

const Steps = () => {
  return (

    <div
        className='
            
            w-full
            flex
            landscape:gap-10
            gap-3
            landscape:flex-row
            flex-col
            items-center
            justify-center
            
        '

        style={{
            backgroundImage:`url(${StepsBack})`,
            backgroundPosition:'100% 100%',
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
                className='items-center gap-5'
            >
                <motion.h1 className='WhyCCHead' style={{color: '#ef571b'}}
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.3}}
                >
                    HOW IT WORKS
                </motion.h1>

                <motion.img src={waveicon} 
                    style={{
                        width:'20%',
                        height:'auto',
                        objectFit:'contain'
                    }}

                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.3}}

                />
            </Flex>

            <motion.h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}
                initial={{opacity:0, x:-50}}

                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut', delay:.2}}
            >
                YOUR JOURNEY TO OWNERSHIP
            </motion.h1>

            <motion.img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}
                initial={{opacity:0, x:-50}}

                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut', delay:.1}}
            />
            


            <motion.p className='WhyCCText' style={{color:'#012477'}}
                initial={{opacity:0, x:-50}}

                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut'}}
            >
                Simple steps. Powerful partnership.
            </motion.p>


        </Flex>

        {/* Cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 landscape:gap-10 gap-3 items-stretch justify-center flex-1'
        
            
        >

            {FranchiseItemsJSON[2].map((card, i) => (
                
                
                <Step CardItem={card} index={i} key={i}/>

                    
                
                

                
            ))}

        </div>


        
    </div>
      
  )
}

export default Steps
