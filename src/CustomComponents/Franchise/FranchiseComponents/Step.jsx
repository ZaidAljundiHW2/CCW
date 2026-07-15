import React from 'react'
import './Step.css'
import { resolveImg } from '@/customLib/utils/resolveImage'
import { CiMail } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";

const Step = ({CardItem}) => {
  return (

    <div
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

    </div>
  )
}

export default Step
