import React from 'react'
import AppetizerJSON from '@/assets/JSONs/Appetizers.json'
import './InfiniteAppetizerCarousel.css'
import { Box } from '@chakra-ui/react'
import { resolveImg } from '@/customLib/utils/resolveImage'

const InfiniteAppetizerCarousel = () => {
  return (
    
    <div className='appetizercar'>

        

        <div className='groupcar'>

            {AppetizerJSON.map((app, i) => (
                <div 
                    className='
                        IAC_Card
                        justify-end
                        items-end
                        
                        
                    ' 
                    key={i}
                    style={{
                        backgroundImage:`url(${resolveImg(app.Img)})`,
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        backgroundRepeat:'no-repeat',
                        overflow:'hidden'
                    }}
                    
                >
                                        
                    <div
                        style={{
                            width:'100%',
                            height:'30%',
                            background:'#012447',
                            display:'flex',

                        }}

                        className='items-center justify-center'
                    >
                        <h1 className='IAE_text'>
                            {app.Name}
                        </h1>
                    </div>

                </div>

                
            ))}



        </div>

        <div aria-hidden className='groupcar'>

            {AppetizerJSON.map((app, i) => (
                <div 
                    className='
                        IAC_Card
                        justify-end
                        items-end
                        
                        
                    ' 
                    key={i}
                    style={{
                        backgroundImage:`url(${app.Img})`,
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        backgroundRepeat:'no-repeat',
                        overflow:'hidden'
                    }}
                    
                >
                                        
                    <div
                        style={{
                            width:'100%',
                            height:'30%',
                            background:'#012447',
                            display:'flex',

                        }}

                        className='items-center justify-center'
                    >
                        <h1 className='IAE_text'>
                            {app.Name}
                        </h1>
                    </div>

                </div>

                
            ))}



        </div>
      
    </div>
  )
}

export default InfiniteAppetizerCarousel
