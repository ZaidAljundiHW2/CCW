import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import StepsBack from '@/assets/img/Backgrounds/f2eeee.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './WhyCC.css'
import WhyCCCard from './WhyCCCard'
import FranchiseItemsJSON from '@/assets/JSONs/franchisecards.json'
import Step from './Step'

const Steps = () => {
  return (
    <div>

        <div
            className='
                min-h-[50vh]
                w-full
                flex
                gap-10
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
                        HOW IT WORKS
                    </h1>
    
                    <img src={waveicon} style={{
                                        width:'20%',
                                        height:'auto',
                                        objectFit:'contain'
                                    }}/>
                </Flex>
    
                <h1 className='WhyCCHead' style={{color:'#012447', fontSize:'3.5rem', lineHeight:1.1}}>
                    YOUR JOURNEY TO OWNERSHIP
                </h1>

                <img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}/>
                
    
    
                <p style={{color:'#012477'}}>
                    Simple steps. Powerful partnership.
                </p>
    
    
            </Flex>
    
            {/* Cards */}
            <Flex className='gap-10 flex-1 items-center relative justify-center'
            
                
            >
    
                {FranchiseItemsJSON[2].map((card, i) => (
                    
                    <>
                        <Step CardItem={card} key={i}/>
                        <Box 
                            style={{
                                height:'2px',
                                width:'30%',
                                background:'black',
                                display:(card.StepNum == 4 ? 'none' : 'block')
                            }}
                        />
                    </>
                    

                    
                ))}
    
            </Flex>
    
    
            
        </div>
      
    </div>
  )
}

export default Steps
