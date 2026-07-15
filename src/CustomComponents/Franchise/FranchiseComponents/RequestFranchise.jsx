import React from 'react'
import compassback from '@/assets/img/Backgrounds/compassback.png'
import { Flex } from '@chakra-ui/react'
import './RequestFranchise.css'
import reqfrImg from '@/assets/img/delivery-door.png'
import ReqFrForm from './ReqFrForm'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import waveicon from '@/assets/icons/waveicon.png'

const RequestFranchise = () => {
  return (
    <div
        className='
            flex
            md:flex-row
            flex-col
        '

        
    >

        <Flex
            style={{
                backgroundImage: `url(${compassback})`,
                
                backgroundSize:'cover',
                backgroundPosition:'center',
                padding:'20px'
                
            }}

            className='md:w-[35%] w-full flex-col items-center justify-center'

            
        >   

            <Flex
                style={{
                    background:'rgba(255 255 255 / 60%)',
                    padding:'20px'
                }}

                className='flex-col rounded-lg shadow-lg gap-3'
            >
                
            

                <Flex
                    className='items-center gap-5'
                    
                >
                    <h1 className='WhyCCHead' style={{color: '#ef571b'}}>
                        WHO WE'RE LOOKING FOR
                    </h1>

                    <img src={waveicon3} style={{
                                        width:'20%',
                                        height:'auto',
                                        objectFit:'contain'
                                    }}/>
                </Flex>

                <h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}>
                    PASSIONATE PARTNERS. DRIVEN TO SUCCEED.
                </h1>

                <img src={waveicon4} style={{width:'100px', height:'auto', paddingTop:'10px'}}/>
                


                <p className='WhyCCText' style={{color:'#012477'}}>
                    We're looking for partners who love hospitality, have an entrepreneurial spirit, are community focused, and are team oriented.
                </p>

            </Flex>

        </Flex>

        <Flex
           

            className='flex-1'

            style={{
                background:'#0d2843'
            }}
        >

            {/* Franchise form */}
            <Flex className='md:w-[65%] w-full flex-col gap-3' style={{padding:'20px'}}>

                <h1 
                    className='WhyCCHead2' 
                    style={{color:'#ef571b'}}
                >
                    LET'S START THE CONVERSATION
                </h1>

                <ReqFrForm />

                



            </Flex>
            
            {/* Background fade */}
            <Flex className='flex-1 relative rqffadeimg'>

                <img class='mask1' src={reqfrImg}/>

            </Flex>

        </Flex>
      
    </div>
  )
}

export default RequestFranchise
