import React from 'react'
import './Step.css'
import { resolveImg } from '@/customLib/utils/resolveImage'
import { CiMail } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { motion } from 'motion/react';

const Step = ({CardItem, index}) => {
  return (

    <motion.div
        className='
            h-full
            flex
            flex-col
            items-center
            justify-start
            gap-1
        '

        style={{
            textAlign:'center',

        }}

        initial={{opacity:0, x:-50}}

        whileInView={{opacity:1, x:0}}

        transition={{duration:.5, ease:'easeOut', delay:.2 * index}}
    >

    
        <div

            className='step'
                
        >


            {(CardItem.Icon === "mail" && (
                <CiMail 
                    className='stepicon'
                    color={(CardItem.Icon === "mail" || CardItem.Icon === "file") ? '#e84f14' : '#135695'}
                
                />
            ))}

            {(CardItem.Icon === "magnifying" && (
                <FaMagnifyingGlass 
                    className='stepicon'
                    color={(CardItem.Icon === "mail" || CardItem.Icon === "file") ? '#e84f14' : '#135695'}
                />
            ))}

            {(CardItem.Icon === "file" && (
                <FaFileAlt 
                    className='stepicon'
                    color={(CardItem.Icon === "mail" || CardItem.Icon === "file") ? '#e84f14' : '#135695'}
                />
            ))}

            {(CardItem.Icon === "store" && (
                <FaStore 
                    className='stepicon'
                    color={(CardItem.Icon === "mail" || CardItem.Icon === "file") ? '#e84f14' : '#135695'}
                />
            ))}

            <div
                className='stepnum'

                style={{
                    background: (CardItem.Icon === "mail" || CardItem.Icon === "file") ? '#e84f14' : '#135695'  
                }}
            >
                {CardItem.StepNum}

            </div>

            
        
        </div>

        <h1 
            style={{
                color:'#e4b055'
            }}

            className='stepcontainerheader'
        
        >
            {CardItem.Header}
        </h1>

        <p style={{
            color:'#e4b055'
        }} className='WhyCCText2'>
            {CardItem.Text}
        </p>

    </motion.div>
  )
}

export default Step
