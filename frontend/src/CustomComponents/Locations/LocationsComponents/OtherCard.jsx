import { Flex, Link } from '@chakra-ui/react'
import InfoSec from './InfoSec'
import { CiClock2 } from "react-icons/ci";
import { CiParking1 } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

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

            <p className='ELT'
            >
                {item.address}
            </p>

            <InfoSec icon={CiClock2} text={item.openingtext}/>

            {item.parking && (
                <InfoSec icon={CiParking1} text={item.parking}/>
            )}

            <Flex className='w-full flex-1 justify-end items-end gap-5'>

                <a href={item.directions} className='ELDir gap-2 items-center justify-center'>

                    Directions
                    <FaLocationArrow />

                </a>


                <Link className='ELBook gap-2 items-center justify-center' to={'/Book'}>
                    Book
                    <FaCalendar />
                </Link>

                <a href={`tel:${item.phonenumber}`} className='ELCall gap-2 items-center justify-center'>

                    Call
                    <IoIosCall />

                </a>
            </Flex>



        </Flex>
        
    </div>
  )
}

export default OtherCard