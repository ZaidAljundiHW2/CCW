import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import './PP.css'
import { useEffect } from 'react';

const ToS = ({setShowToS, text}) => {

    useEffect(() => {
    
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, []);
    

  return (

    <div
        className='
            bg-black/70
            fixed
            inset-0
            z-40
        '

        onClick={() => setShowToS(false)}
    >

    
        <div
            className='
                
                bg-black
                absolute
                top-[50%]
                left-[50%]
                landscape:w-[50%]
                w-[90%]
                h-[50%]
                rounded-lg
                shadow-lg
                flex
                fixed
                overflow-y-scroll
                items-center
                flex-col
                gap-5

            '

            onClick={(e) => e.stopPropagation()}

            style={{
                transform:'translate(-50%,-50%)',
                borderWidth:'2px',
                borderColor:'white',
                padding:'20px',
                textAlign:'cente'
            }}
        >

            <h1 style={{textAlign:'center'}}>
                Our Terms & Service
            </h1>

            <p style={{textAlign:'center'}} className='WhyCCText'>
                {text}
            </p>

            <div className='absolute top-[10px] right-[10px] hover:cursor-pointer' onClick={() => setShowToS(false)}>
                <IoIosCloseCircle className='PPClose'/>
            </div>
            
        </div>
    </div>
  )
}

export default ToS
