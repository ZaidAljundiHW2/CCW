import React from 'react'
import { Flex } from '@chakra-ui/react'
import WhyCCBack from '@/assets/img/Backgrounds/anchorcrabback.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import './WhyCC.css'
import WhyCCCard from './WhyCCCard'
import FranchiseItemsJSON from '@/assets/JSONs/franchisecards.json'
import Franchise from '../Franchise'

const WhyCC = () => {
  return (
    <div
        className='
            min-h-[50vh]
            w-full
            flex
            gap-10
        '

        style={{
            backgroundImage:`url(${WhyCCBack})`,
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
                background:'rgb(255 255 255 / 85%)'
            }}

            
        >

            <Flex
                className='items-center gap-5'
            >
                <h1 className='WhyCCHead' style={{color: '#ef571b', fontSize:'2rem'}}>
                    WHY CAPTAIN'S CRAB
                </h1>

                <img src={waveicon} style={{
                                    width:'20%',
                                    height:'auto',
                                    objectFit:'contain'
                                }}/>
            </Flex>

            <h1 className='WhyCCHead' style={{color:'#012447', fontSize:'3.5rem', lineHeight:1.1}}>
                BUILT FOR FLAVOR. DESIGNED FOR SUCCESS.
            </h1>

            <img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}/>

            <p style={{color:'#012447'}}>
                We do more than serve seafood - we create unforgettable experiences and help our franchise partners build thriving businesses.
            </p>


        </Flex>

        {/* Cards */}
        {/* <Flex className='gap-10 flex-1'>

            {FranchiseItemsJSON[0].map((card, i) => (

                <WhyCCCard CardItem={card} key={i}/>
            ))}

        </Flex> */}


      
    </div>
  )
}

export default WhyCC
