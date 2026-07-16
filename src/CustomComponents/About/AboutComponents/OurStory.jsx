import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutBack from '@/assets/img/Backgrounds/aboutus.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './OurStory.css'

const OurStory = () => {
  return (
    <div
      className='
        flex
        md:flex-row
        flex-col
        
        md:min-h-[50vh]
        min-h-[80vh]
      '
    >

      <Flex className='ourstorycontainer flex-1 bg-red-500'>

      </Flex>

      {/* Content */}
      <Flex className='flex-col md:w-[40%] md:h-full h-[40%] oscw' style={{background:'#e3f6fc'}}>

        <Flex
          className='items-center gap-5'
        >
            <h1 className='WhyCCHead' style={{color: '#ef571b'}}>
                OUR STORY
            </h1>

            {/* <img src={waveicon} 
              style={{
                  width:'10%',
                  height:'auto',
                  objectFit:'contain'
              }}/> */}
        </Flex>

        <h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}>
            BORN BY THE COAST. MADE FOR YOU.
        </h1> 

        <Flex className='flex flex-col gap-5'>
          <p className='WhyCCText' style={{color:'#012477'}}>
            Captain's Crab began with a simple belief: everyone deserves premium seafood, big flavors, and good times around the table.

          </p>

          <p className='WhyCCText' style={{color:'#012477'}}>
              Inspired by coastal traditions and crafted with a modern twist, we created a place where friends and families can dig in, connect, and make memories that last.

          </p>

          <p className='WhyCCText' style={{color:'#012477'}}>
            From our signature boils to our crave-worthy sauces, every detail is made with fresh ingredients, real passion, and a promise to always deliver more.
          </p>

        </Flex>
        

      </Flex>
      
    </div>
  )
}

export default OurStory
