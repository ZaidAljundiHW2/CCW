import React from 'react'
import creamwall from '@/assets/img/Backgrounds/sand2.png'
import { Flex } from '@chakra-ui/react'
import waveicon from '@/assets/icons/waveicon.png'
import './OurMission.css'
import logo from '@/assets/img/logo-overflow.png'
import { motion } from 'motion/react'

const OurMission = () => {
  return (
    <div

      className='
        w-full
        flex
        md:flex-row
        flex-col
        md:gap-10
        gap-3
        missionwrapper
      '

      style={{
        backgroundImage: `url(${creamwall})`,
        backgroundSize:'100% 100%'
      }}
    >

      <Flex
        className='flex-col justify-center'

        
      >

        <Flex
          className='gap-5 md:justify-start justify-center items-center'

        >
            <motion.h1 className='WhyCCHead' style={{color: '#ef571b'}}
              initial={{opacity:0, x:-50}}

              whileInView={{opacity:1, x:0}}

              transition={{duration:.5, ease:'easeOut', delay:.3}}
              viewport={{once:true}}
            >
                OUR STORY
            </motion.h1>

            <motion.img src={waveicon} 

              initial={{opacity:0, x:-50}}

              whileInView={{opacity:1, x:0}}

              transition={{duration:.5, ease:'easeOut', delay:.3}}

              className='waveicon'
              viewport={{once:true}}
           />
        </Flex>

        <motion.h1 className='missionhead' style={{color:'#012447'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.2}}
          viewport={{once:true}}
        >
          FRESH CATCHES.
        </motion.h1>

        <motion.h1 className='missionhead' style={{color: '#ef571b' }}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.1}}
          viewport={{once:true}}

        >
          BIG FLAVOR.
        </motion.h1>

        <motion.h1 className='missionhead' style={{color:'#012447'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut'}}
          viewport={{once:true}}

        >
          GOOD TIMES AHEAD.
        </motion.h1>

      </Flex>




      <Flex className='flex-1 justify-center items-center'>
        <motion.p className='WhyCCText md:text-left text-center' style={{color:'#012447'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut'}}

          viewport={{once:true}}
        >
          We're on a mission to serve the freshest seafood with bold flavors and warm hospitality - creating experiences that bring people together and keep them coming back.

        </motion.p>
      </Flex>
      
      

      <Flex className='md:flex-1 logowrapper items-center relative justify-center'>
        <img src={logo}

          className='complogo'
        />

      </Flex>
      


      
    </div>
  )
}

export default OurMission
