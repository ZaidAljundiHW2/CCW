import React from 'react'
import creamwall from '@/assets/img/Backgrounds/sand.jpg'
import { Flex } from '@chakra-ui/react'
import waveicon from '@/assets/icons/waveicon.png'
import './OurMission.css'
import logo from '@/assets/img/logo-overflow.png'

const OurMission = () => {
  return (
    <div

      className='
        min-h-[45vh]
        w-full
        flex
        gap-10
      '

      style={{
        backgroundImage: `url(${creamwall})`,
        backgroundSize:'100% 100%'
      }}
    >

      <Flex
        className='flex-col justiy-center'
        style={{
          padding:'20px'
        }}
      >

        <Flex
          className='gap-5'
        >
            <h1 className='WhyCCHead' style={{color: '#ef571b', fontSize:'2rem'}}>
                OUR STORY
            </h1>

            <img src={waveicon} 
              style={{
                  width:'100px',
                  height:'auto',
                  objectFit:'contain'
              }}/>
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

      <Flex className='w-[20%] flex-col justify-center' style={{fontSize:'1.2rem'}}>
        <p style={{color:'#012447'}}>
          We're on a mission to serve the freshest seafood with bold flavors and warm hospitality - creating experiences that bring people together and keep them coming back.

        </p>
      </Flex>

      <Flex className='flex-1 relative items-center justify-center'>

        <img src={logo}
          style={{
            position:'absolute',
            height:'120%',
            width:'auto',
            bottom:0
          }}
        />

      </Flex>
      
    </div>
  )
}

export default OurMission
