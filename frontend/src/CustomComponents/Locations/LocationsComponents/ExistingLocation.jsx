// ExistingLocation.jsx
import { Box, Flex, VStack, Button } from '@chakra-ui/react'
import InfoSec from './InfoSec'
import './ExistingLocation.css'
import WaveIcon from '@/assets/icons/waveicon.png'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { CiClock2 } from "react-icons/ci";
import { CiParking1 } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";

const ExistingLocation = ({ locationitem }) => {

  return (
    <div
        id='locations'
        className='
            flex
            landscape:flex-row
            portrait:flex-col
            
        '   
    >

        <Box
            className='landscape:w-[60%] ELFC w-full flex items-center'
            style={{
                backgroundImage: `url(${locationitem.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}
        >

            <Box
                className='
                    max-w-[60%]
                    flex
                    flex-col
                    justify-center
                    text-black
                    rounded-lg
                    shadow-lg
                    
                '

                style={{padding:'3%', background:'rgb(255 255 255 / 85%) '}}
            >

                <motion.div className='flex w-full'
                
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.2}}
                >
                    <h1 className='ELH'>Our Home Port</h1>

                    <img 
                        src={WaveIcon} 
                        alt='wave icon' 
                        style={{
                            width:'20%',
                            height:'auto',
                            objectFit:'contain'
                        }}
                    />
                </motion.div>

                

                <motion.h1 className='ELH2'
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.1}}
                >
                    {locationitem.locationname}

                </motion.h1>

                <motion.p className='ELT'
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.5, ease:'easeOut'}}
                >
                    Visit our flagship location in the heart of Burlington - where every meal is a celebration of fresh seafood, community, and unforgettable flavor.
                </motion.p>

            </Box>



                



        </Box>

        <Box
            className='
                landscape:w-[40%]
                w-full
                bg-[#f2eeee]
                flex
                justify-center
                items-center
                outerelwrapper
                
            '
            
        >

            <div
                className='SELW flex h-full rounded-lg shadow-lg gap-2 flex-col justify-center relative w-full min-w-0'
                style={{ background:'#f2eeee' }}
            >
                <motion.h1 className='ELH2 min-w-0 break-words'
                    initial={{opacity:0, y:-50}}

                    whileInView={{opacity:1, y:0}}

                    transition={{duration:.5, ease:'easeOut'}}
                >
                    Visit the flagship
                </motion.h1>

                

                <motion.p className='ELT'
                    initial={{opacity:0, y:-50}}

                    whileInView={{opacity:1, y:0}}

                    transition={{duration:.5, ease:'easeOut', delay:.1}}
                >
                    Our home port in the heart of burlington serving up bold flavours and good times
                </motion.p>

                <VStack className='w-full' align='stretch' spacing={2}>

                    <InfoSec icon={CiClock2} text={locationitem.openingtext} index={0}/>

                    <InfoSec icon={IoLocationSharp} text={'Dine in • Takout • Catering • Group Orders'} index={1}/>
                    
                    <InfoSec icon={CiParking1} text={locationitem.parking} index={2}/>

                </VStack>

                <Flex className='w-full items-center justify-center gap-5' padding={'5%'}>

                    <Button className='ELDir'>

                        Directions

                    </Button>


                    <Link className='ELBook' to={'/Book'}>
                        Book
                    </Link>
                </Flex>

                
            </div>

        </Box>

    </div>
  )
}

export default ExistingLocation