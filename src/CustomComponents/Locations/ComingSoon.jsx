import React from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import Lighthouse from '@/assets/img/lighthouse.png'
import Wave2 from '@/assets/icons/waveicon2.png'
import "./ComingSoon.css"
import CSCard from './CSCard'
import TorontoSketch from '@/assets/img/torontosketch.jpg'
import MississaugaSketch from '@/assets/img/mississaugasketch.jpg'
import OttowaSketch from '@/assets/img/ottowasketch.jpg'

const ComingSoon = () => {
  return (
    <div
        className='
            flex
            w-full
            min-h-[40vh]
            bg-[#F2F0EF]
            gap-5
        '
    >
        <Flex className='w-[30%] items-center'>

            <img src={Lighthouse} style={{
                width:'200px',
                height:'auto'
            }}/>

            <Flex
                className='
                    flex-col
                    w-[100%]
                    justify-start
                '
            >

                <Flex
                    className='
                        flex-col
                        gap-0
                        justify-start   
                    '
                >
                    <Heading lineHeight={1.2} className='CSH'>
                        MORE LOCATIONS COMING SOON
                    </Heading>

                    <img 
                        src={Wave2}
                        style={{
                            width:'200px',
                            height:'auto'
                        }}
                    />

                </Flex>

                <p className='CST'>
                    We're setting sail for new shores! Captain's Crab is expanding to bring bold, craveable seafood experiences to communities across Canada.
                </p>

            </Flex>




            

        </Flex>

        <CSCard image={TorontoSketch} location={"Toronto"}/>
        <CSCard image={OttowaSketch} location={"Ottowa"}/>
        <CSCard image={MississaugaSketch} location={"Mississauga"}/>


      
    </div>
  )
}

export default ComingSoon
