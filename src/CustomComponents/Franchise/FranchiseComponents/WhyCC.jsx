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
            w-full
            flex
            md:gap-10
            gap-3
            md:flex-row
            flex-col
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
                md:w-[30%]
                w-full
                flex-col
                
                rounded-lg
                shadow-lg

            '

            style={{
                padding:'20px',
                background:'rgb(255 255 255 / 85%)'
            }}

            
        >

            <Flex
                className='items-center justify-start gap-5'
            >
                <h1 className='WhyCCHead' style={{color: '#ef571b'}}>
                    WHY CAPTAIN'S CRAB
                </h1>

                <img src={waveicon} style={{
                                    width:'20%',
                                    height:'auto',
                                    objectFit:'contain'
                                }}/>
            </Flex>

            <h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}>
                BUILT FOR FLAVOR. DESIGNED FOR SUCCESS.
            </h1>

            <img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}/>

            <p style={{color:'#012447'}} className='WhyCCText'>
                We do more than serve seafood - we create unforgettable experiences and help our franchise partners build thriving businesses.
            </p>


        </Flex>

        {/* Cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-3 items-stretch justify-center flex-1'>

            {FranchiseItemsJSON[0].map((card, i) => (

                <WhyCCCard CardItem={card} key={i}/>
            ))}

        </div>


      
    </div>
  )
}

export default WhyCC
