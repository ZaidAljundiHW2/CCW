import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import StepsBack from '@/assets/img/Backgrounds/f2back.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './WhyCC.css'
import WhyCCCard from './WhyCCCard'
import FranchiseItemsJSON from '@/assets/JSONs/franchisecards.json'
import Step from './Step'

const Steps = () => {
  return (

    <div
        className='
            
            w-full
            flex
            md:gap-10
            gap-3
            md:flex-row
            flex-col
            items-center
            justify-center
            
        '

        style={{
            backgroundImage:`url(${StepsBack})`,
            backgroundPosition:'100% 100%',
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
                className='items-center gap-5'
            >
                <h1 className='WhyCCHead' style={{color: '#ef571b'}}>
                    HOW IT WORKS
                </h1>

                <img src={waveicon} style={{
                                    width:'20%',
                                    height:'auto',
                                    objectFit:'contain'
                                }}/>
            </Flex>

            <h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}>
                YOUR JOURNEY TO OWNERSHIP
            </h1>

            <img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}/>
            


            <p className='WhyCCText' style={{color:'#012477'}}>
                Simple steps. Powerful partnership.
            </p>


        </Flex>

        {/* Cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-3 items-stretch justify-center flex-1'
        
            
        >

            {FranchiseItemsJSON[2].map((card, i) => (
                
                
                <Step CardItem={card} key={i}/>

                    
                
                

                
            ))}

        </div>


        
    </div>
      
  )
}

export default Steps
