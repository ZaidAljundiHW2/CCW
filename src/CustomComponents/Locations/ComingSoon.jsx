import React from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import Lighthouse from '@/assets/img/lighthouse.png'
import Wave2 from '@/assets/icons/waveicon2.png'
import "./ComingSoon.css"
import CSCard from './CSCard'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import MississaugaSketch from '@/assets/img/mississaugasketch.jpg'
import OttowaSketch from '@/assets/img/ottowasketch.jpg'
import { HiH1 } from 'react-icons/hi2'

const ComingSoon = () => {
  return (
    <div
        className='
            flex
            min-h-[40vh]
            bg-[#F2F0EF]
            gap-5
            items-center
            justify-center
            
        '

        style={{
            padding:'20px',
        }}

        
    >
        
        {/* Text */}
        <Flex className='flex-1 gap-5 items-center justify-center'>

            <div>
                <img src={Lighthouse}/>
            </div>

            <Flex className='flex-col'>

                <h1 className='CSH'>
                    MORE LOCATIONS COMING SOON.
                </h1>

                <img src={Wave2} style={{
                    height:'20px',
                    width:'auto'
                }}/>

                <p className='CST'>
                    We're setting sail for new shores! Captain's Crab is expanding to bring bold, craveable seafood experiences to communities across Canada.
                </p>    

            </Flex>
            


        </Flex>

        {/* Cards */}
        <Flex className='flex-1 gap-5'>

            {/* <CSCard image={TorontoSketch} location={"Toronto"}/>
            <CSCard image={MississaugaSketch} location={"Mississauga"}/>
            <CSCard image={OttowaSketch} location={"Ottowa"}/> */}

        </Flex>
        


      
    </div>
  )
}

export default ComingSoon
