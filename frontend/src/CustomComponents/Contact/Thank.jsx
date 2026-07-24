import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

const Thank = () => {
  return (
    <div
        className='
            bg-white
            rounded-lg
            shadow-lg
            flex
            flex-col
            justify-center
            items-center
            text-center
            portrait:w-[80%]
            w-[50%]
            h-[50%]
        '

        
    >

        <FaCheckCircle color='#4BB543' size={'5rem'}/>

        <h1
            style={{
                color:"#012447",
                fontSize:'1.5rem',
                fontWeight:'bold'
            }}
        >

            Received!

        </h1>

        <h1
            style={{
                color:"#012447",
                fontSize:'3rem',
                fontWeight:'bold'
            }}
        >

            Thank you!

        </h1>
      
    </div>
  )
}

export default Thank
