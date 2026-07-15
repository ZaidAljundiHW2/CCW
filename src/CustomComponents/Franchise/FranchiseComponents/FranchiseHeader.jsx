import React from 'react'
import SeafoodPile from '@/assets/img/seafood pile.png'
import { Flex } from '@chakra-ui/react'
import './FranchiseHeader.css'
import OceanBack from '@/assets/img/Backgrounds/oceanback.jpg'

const FranchiseHeader = () => {
  return (
    <div
        className='
            flex
            items-center
            justify-center
            overflow-hidden
            gap-2
            md:gap-10
        '

        style={{
            background:`url(${OceanBack})`,
            backgroundSize:'100% 100%',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            padding:'10px'
        }}
    >

        <div 
            className='relative flex items-center justify-center w-[22%]'
        >
            <img 
                src={SeafoodPile}
                className="w-full h-auto object-contain"
            />
        </div>

        <Flex
            className='
                flex-1
            '
        >
            {/* Header */}
            <Flex
                className='
                    flex-col
                    justify-center
                '
            >

                <h1 className='FHH'>
                    BRING THE <span style={{color:'#ef571b'}}> BOIL </span> TO YOUR CITY
                </h1>

                <p className='FHT'>
                    Unforgettable flavors. Loyal guests. Powerful Support. Let's build something amazing - together.
                </p>

               

            </Flex>

            

        </Flex>
      
    </div>
  )
}

export default FranchiseHeader
