import React from 'react'
import './WhyCC.css'
import { resolveImg } from '@/customLib/utils/resolveImage'
import wave2 from '@/assets/icons/waveicon2.png'

const WhyCCCard = ({CardItem, wave=true, YNA=false}) => {
  return (
    <div
        className='
            rounded-lg
            shadow-lg
            flex
            items-center
            justify-start
            flex-col
            WhyCCContainer
        '

        style={{
            borderWidth:'2px',
            borderColor:'white',
            background: YNA ? '#002342' : '#f2eeee'
        }}
    >
        <div className='w-full flex items-center justify-center h-[25%]'>

            <h1 className='WhyCCHead' style={{color: YNA ? 'white' : '#012447', textAlign:'center', lineHeight:1.1}}>
                {CardItem.Header}
            </h1>
        </div>


        <div className='w-full flex items-center justify-center'>

            <img 
                src={resolveImg(CardItem.Img)} 
                

                className='WhyCCIcon'

            />

        </div>
        
        {wave && (
            <div className='w-full flex items-center justify-center' style={{marginTop:'-10px'}}>
                <img src={wave2} className='flex-1'/>
            </div>
        )}
        
        
        <div className='w-full flex items-center justify-center'>

        
            <p className='flex-1 WhyCCText2' style={{color: YNA ? 'white' : '#012447', textAlign:'center'}}>
                {CardItem.Text}
            </p>
        </div>


      
    </div>
  )
}

export default WhyCCCard
