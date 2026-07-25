import React from 'react'
import OceanBack from '@/assets/img/Backgrounds/oceanback.jpg'
import { Flex, Button } from '@chakra-ui/react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div
        className='
            flex
            justify-center
            items-center
        '

        style={{
            background:`url(${OceanBack})`,
            backgroundSize:'100% 100%',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            padding:'20px'
        }}
    >

        <Flex className='flex-col w-[50%] gap-4'>

            <motion.h1 className='heroheader'
                initial={{opacity:0, x:-50}}
                    
                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut',delay:.2}}
            >
                Hungry?
            </motion.h1>

            <motion.h1 
                className='heroheader' 
                style={{color:'#ef571b'}}
                initial={{opacity:0, x:-50}}
                    
                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut',delay:.1}}
            >
                Got a party?
            </motion.h1>

            <motion.p 
                className='herotext' 
                style={{color:'white'}}

                initial={{opacity:0, x:-50}}
                    
                whileInView={{opacity:1, x:0}}

                transition={{duration:.5, ease:'easeOut'}}

            >

                From premium seafood boils to handcrafted specialties, every dish is made to be shared and savored. Reserve your seat today.

            </motion.p>

            

        </Flex>

        <motion.div
            initial={{opacity:0, x:50}}
                    
            whileInView={{opacity:1, x:0}}

            transition={{duration:.5, ease:'easeOut'}}
        >
            <Link to={'/Book'}>
                <Button
                    style={{
                        borderWidth:'2px',
                        borderColor:'white',
                        background:'black',
                        color:'white',
                    }}

                    size={'xl'}


                >
                    Book Now
                </Button>
            </Link>
        </motion.div>


        
      
    </div>
  )
}

export default CallToAction
