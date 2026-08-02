import { Flex, Link } from '@chakra-ui/react'
import InfoSec from './InfoSec'
import { CiClock2 } from "react-icons/ci";
import { CiParking1 } from "react-icons/ci";
 

const OtherCard = ({item}) => {
  return (
    <div 
        className='
            flex 
            w-[70%]
            portrait:w-[90%]
            portrait:grid
            portrait:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]
            rounded-lg
            shadow-lg
            h-[60vh]
            portrait:h-[600px]
        '

        style={{
            background:"#f2eeee",
            borderWidth:"2px",
            borderColor:"white",
            backgroundImage:`url(${item.image})`,
            backgroundSize:'100% 100%',
            backgroundPosition:'center'
        }}
    
    >   
        <Flex className='flex-1'>

        </Flex>

        <Flex className='bg-white/90 landscape:w-[50%] flex-1 flex-col gap-5' 
            style={{
                padding:'20px',
                overflowY: 'auto',
            }}
        >

            <h1 className='ELH2'>
                {item.locationname}
            </h1>

            <h1 className='ELT'>
                {item.description}
            </h1>

            <InfoSec icon={CiClock2} text={item.openingtext}/>

            {item.parking && (
                <InfoSec icon={CiParking1} text={item.parking}/>
            )}

            <Flex className='w-full flex-1 justify-end items-end gap-5'>

                <a href={item.directions} className='ELDir'>

                    Directions

                </a>


                <Link className='ELBook' to={'/Book'}>
                    Book
                </Link>
            </Flex>



        </Flex>
        
    </div>
  )
}

export default OtherCard