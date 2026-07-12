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
            w-full
            h-[40vh]
            overflow-hidden
            gap-10
        '

        style={{
            background:`url(${OceanBack})`,
            backgroundSize:'100% 100%',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center'
        }}
    >

        <div 
            className='
                w-[30%]
                relative
            '
        >

            <img 
                src={SeafoodPile}

                style={{
                    position:'absolute',
                    bottom:'-10%',
                    
                    
                }}
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

                <p>
                    Unforgettable flavors. Loyal guests. Powerful Support. 
                </p>

                <p>
                    Let's build something amazing - together.
                </p>

            </Flex>

            

        </Flex>
      
    </div>
  )
}

export default FranchiseHeader
