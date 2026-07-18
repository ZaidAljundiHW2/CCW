import React from 'react'
import compassback from '@/assets/img/Backgrounds/compassback.png'
import { Flex } from '@chakra-ui/react'
import './RequestFranchise.css'
import reqfrImg from '@/assets/img/delivery-door.png'
import ReqFrForm from './ReqFrForm'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import waveicon from '@/assets/icons/waveicon.png'
import { motion } from 'motion/react'

const RequestFranchise = () => {
  return (
    <div
        className='
            flex
            landscape:flex-row
            flex-col
        '

        
    >

        <Flex
            style={{
                backgroundImage: `url(${compassback})`,
                
                backgroundSize:'cover',
                backgroundPosition:'center',
                padding:'20px'
                
            }}

            className='landscape:w-[35%] w-full flex-col items-center justify-center'

            
        >   

            <Flex
                style={{
                    background:'rgba(255 255 255 / 60%)',
                    padding:'20px'
                }}

                className='flex-col rounded-lg shadow-lg gap-3'
            >
                
            

                <Flex
                    className='items-center gap-5'
                    
                >
                    <motion.h1 className='WhyCCHead' style={{color: '#ef571b'}}
                        initial={{opacity:0, x:-50}}

                        whileInView={{opacity:1, x:0}}

                        transition={{duration:.5, ease:'easeOut', delay:.3}}
                    >
                        WHO WE'RE LOOKING FOR
                    </motion.h1>

                    <motion.img src={waveicon3} style={{
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
                    PASSIONATE PARTNERS. DRIVEN TO SUCCEED.
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
                    We're looking for partners who love hospitality, have an entrepreneurial spirit, are community focused, and are team oriented.
                </motion.p>

            </Flex>

        </Flex>

        <Flex
           

            className='flex-1'

            style={{
                background:'#0d2843'
            }}
        >

            {/* Franchise form */}
            <Flex className='landscape:w-[65%] w-full flex-col gap-3' style={{padding:'20px'}}>

                <motion.h1 
                    className='WhyCCHead2' 
                    style={{color:'#ef571b'}}
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.1}}
                >
                    LET'S START THE CONVERSATION
                </motion.h1>

                <ReqFrForm />

                



            </Flex>
            
            {/* Background fade */}
            <Flex className='flex-1 relative rqffadeimg'>

                <img class='mask1' src={reqfrImg}/>

            </Flex>

        </Flex>
      
    </div>
  )
}

export default RequestFranchise
