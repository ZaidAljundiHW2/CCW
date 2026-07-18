import React from 'react'
import { Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { IoIosCloseCircle } from "react-icons/io";

const OrderPopup = ({setShowOrderPopup}) => {

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [])
  return (
    <div
        className='
            bg-black/70
            fixed
            inset-0
            z-40
        '

        onClick={() => setShowOrderPopup(false)}
    >

        <Flex
            className='
                top-[50%]
                left-[50%]
                absolute
                bg-[#f2eeee]
                w-[50%]
                flex
               
                flex-col
                orderwrapper
                rounded-lg
                shadow-lg
                gap-5
                z-50
            '

            onClick={(e) => e.stopPropagation()}

            style={{
                transform:'translate(-50%,-50%)'
            }}
        >
            <Flex className='flex-col'>
                <h1 className='heroheader' style={{color:'#012447'}}>
                    Order Now!
                </h1>

                <p className='WhyCCText' style={{color:'#012447'}}>
                    Choose a delivery partner or start a pickup request.
                </p>
            </Flex>
            <Flex className='flex-col w-full justify-center items-center landscape:flex-row landscape:gap-20 gap-5'>

            
                <button className='restbutton rounded-lg' style={{background:'#00C1B2', borderColor:'white'}}>
                    Deliveroo
                </button>

                <button className='restbutton rounded-lg' style={{color:'white', background:'black'}}>
                    Uber Eats
                </button>

                <button className='restbutton rounded-lg' style={{color:'black', background:'f2eeee', borderColor:'black'}}>
                    Call Pickup
                </button>

            </Flex>

            <div className='absolute top-[10px] right-[10px] hover:cursor-pointer' onClick={() => setShowOrderPopup(false)}>
                <IoIosCloseCircle className='PPClose' color='#012447'/>
            </div>

        </Flex>

        
      
    </div>
  )
}

export default OrderPopup
