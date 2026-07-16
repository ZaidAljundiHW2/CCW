import React from 'react'
import creamwall from '@/assets/img/Backgrounds/sand2.png'
import { Flex } from '@chakra-ui/react'
import waveicon from '@/assets/icons/waveicon.png'
import './OurMission.css'
import logo from '@/assets/img/logo-overflow.png'

const OurMission = () => {
  return (
    <div

      className='
        min-h-[50vh]
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
            <h1 className='WhyCCHead' style={{color: '#ef571b'}}>
                OUR STORY
            </h1>

            <img src={waveicon} 

              className='waveicon'
            />
        </Flex>

        <h1 className='missionhead' style={{color:'#012447'}}>
          FRESH CATCHES.
        </h1>

        <h1 className='missionhead' style={{color: '#ef571b' }}>
          BIG FLAVOR.
        </h1>

        <h1 className='missionhead' style={{color:'#012447'}}>
          GOOD TIMES AHEAD.
        </h1>

      </Flex>




      <Flex className='flex-1 justify-center items-center'>
        <p className='WhyCCText md:text-left text-center' style={{color:'#012447'}}>
          We're on a mission to serve the freshest seafood with bold flavors and warm hospitality - creating experiences that bring people together and keep them coming back.

        </p>
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
