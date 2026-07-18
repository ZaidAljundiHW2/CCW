import React from 'react'
import { Flex } from '@chakra-ui/react'
import YNABack from '@/assets/img/Backgrounds/f2back.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './WhyCC.css'
import WhyCCCard from './WhyCCCard'
import FranchiseItemsJSON from '@/assets/JSONs/franchisecards.json'

const YNA = () => {
  return (
    <div
        className='
            min-h-[50vh]
            w-full
            flex
            gap-10
        '

        style={{
            backgroundImage:`url(${YNABack})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            padding:'20px'
        }}
    >

        {/* Text */}
        <Flex
            className='
                w-[30%]
                flex-col
                justify-center
                align-center
                rounded-lg
                shadow-lg

            '

            style={{
                padding:'20px',
                background:'rgb(0 35 66 / 85%)'
            }}

            
        >

            <Flex
                className='items-center gap-5'
            >
                <h1 className='WhyCCHead' style={{color: '#ef571b', fontSize:'2rem'}}>
                    YOU'RE NOT ALONE
                </h1>

                <img src={waveicon3} style={{
                                    width:'20%',
                                    height:'auto',
                                    objectFit:'contain'
                                }}/>
            </Flex>

            <h1 className='WhyCCHead' style={{color:'white', fontSize:'3.5rem', lineHeight:1.1}}>
                WE'RE WITH YOU EVERY STEP OF THE WAY
            </h1>


            <p style={{color:'white'}}>
                Comprehensive Support. Proven Systems. Your success is our mission.
            </p>


        </Flex>

        {/* Cards */}
        {/* <Flex className='gap-10 flex-1'>

            {FranchiseItemsJSON[1].map((card, i) => (

                <WhyCCCard CardItem={card} YNA={true} wave={false} key={i}/>
            ))}

        </Flex> */}


      
    </div>
  )
}

export default YNA
