import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutBack from '@/assets/img/Backgrounds/aboutus.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './OurStory.css'
import { motion } from 'motion/react'

const OurStory = () => {
  return (
    <div
      className='
        flex
        md:flex-row
        md:min-h-[0vh]
        flex-col
        
        min-h-[50vh]
      '
    >

      <Flex className='ourstorycontainer flex-1 bg-red-500'>

      </Flex>

      {/* Content */}
      <Flex className='flex-col md:w-[40%] md:h-full h-[40%] oscw' style={{background:'#e3f6fc'}}>

        <Flex
          className='items-center gap-5'
        >
            <motion.h1 className='WhyCCHead' style={{color: '#ef571b'}}
              initial={{opacity:0, x:50}}

              whileInView={{opacity:1, x:0}}

              transition={{duration:.5, ease:'easeOut', delay:.4}}
            >
                OUR STORY
            </motion.h1>

            {/* <img src={waveicon} 
              style={{
                  width:'10%',
                  height:'auto',
                  objectFit:'contain'
              }}/> */}
        </Flex>

        <motion.h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}
          initial={{opacity:0, x:50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.3}}
        >
            BORN BY THE COAST. MADE FOR YOU.
        </motion.h1> 

        <Flex className='flex flex-col gap-5'>
          <motion.p className='WhyCCText' style={{color:'#012477'}}
            initial={{opacity:0, x:50}}

            whileInView={{opacity:1, x:0}}

            transition={{duration:.5, ease:'easeOut', delay:.2}}
          >
            Captain's Crab began with a simple belief: everyone deserves premium seafood, big flavors, and good times around the table.

          </motion.p>

          <motion.p className='WhyCCText' style={{color:'#012477'}}
            initial={{opacity:0, x:50}}

            whileInView={{opacity:1, x:0}}

            transition={{duration:.5, ease:'easeOut', delay:.1}}
          >
              Inspired by coastal traditions and crafted with a modern twist, we created a place where friends and families can dig in, connect, and make memories that last.

          </motion.p>

          <motion.p className='WhyCCText' style={{color:'#012477'}}
            initial={{opacity:0, x:50}}

            whileInView={{opacity:1, x:0}}

            transition={{duration:.5, ease:'easeOut'}}
          >
            From our signature boils to our crave-worthy sauces, every detail is made with fresh ingredients, real passion, and a promise to always deliver more.
          </motion.p>

        </Flex>
        

      </Flex>
      
    </div>
  )
}

export default OurStory
