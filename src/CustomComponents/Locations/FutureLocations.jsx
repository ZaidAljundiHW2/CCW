import React from 'react'
import { Flex, Heading, Box, Button } from '@chakra-ui/react'
import './FutureLocations.css'
import CanadaMap from '@/assets/img/Canada_blank_map.png'
import FLMap from './FLMap'
import WayPointsJSON from '@/assets/JSONs/waypoints.json'
import { useState, useEffect } from 'react'
import Background from '@/assets/img/home-franchise-background.png'
import creamwall from '@/assets/img/creamwall.png'

const FutureLocations = () => {

    const NumWayPoints = WayPointsJSON.length;

    const [index, setIndex] = useState(0);
    const [currLink, setCurrLink] = useState("")

    useEffect(() => {
        
        const interval = setInterval(() => {

            setIndex(prev => {

                const next = (prev + 1) % NumWayPoints;
                setCurrLink(WayPointsJSON[next].Link);

                return next
            });
            


        },10000);

        return () => clearInterval(interval);

    }, []);

  return (
    <div
        className='
            w-full
            min-h-[80vh]
            flex
            items-center
        '

        style={{
            backgroundImage: `url(${Background})`,
            backgroundSize:'contain'
        }}
    >
        <Flex
            className='
                flex-1
                h-full
                flex-col
                gap-6
            '

            style={{
                padding:'3%'
            }}
        >
            
            <h1 className='FLH flex'>

                Our Other Locations

            </h1>

            <Box className='w-[40%] h-[1vh] bg-[#ff6161]'/>
            
            <div className='flex justify-center items-center relative gap-10'>


                <FLMap />

                <Flex 
                    className='
                        flex-1 
                        min-h-[60vh] 
                        rounded-lg 
                        shadow-lg
                        flex
                        flex-col
                        relative
                        
                    '

                    style={{
                        backgroundImage:`url(${creamwall})`,
                        padding:'50px'
                    }}
                >

                    <Box 
                        className='
                            w-full
                            rounded-lg
                            absolute
                            inset-0
                            overflow-hidden
                            
                            
                        '
                    >

                        {WayPointsJSON.map((waypoint, i) => (

                            <img 
                                src={waypoint.Img} 
                                key={i}
                                className='FLimgG absolute transition-opacity duration-700'
                                style={{
                                    opacity: i === index ? 1 : 0
                                }}
                            />
                        ))}

                        

                    </Box>

                    

                    <div className='relative h-[70px] w-[60%] '>

                        {WayPointsJSON.map((waypoint,i) => (

                            <h1
                                className='FLH2 transition-opacity duration-700 absolute'
                                style={{
                                    opacity: i === index ? 1 : 0
                                }}
                                key={i}
                            >
                                {waypoint.Location}
                            </h1>
                        ))}

                    </div>
                    

                    <div className="grid w-[60%]">
                        {WayPointsJSON.map((waypoint, i) => (
                            <p
                                key={i}
                                className="
                                    col-start-1
                                    row-start-1
                                    transition-opacity
                                    duration-700
                                    FLT
                                "
                                style={{
                                    opacity: i === index ? 1 : 0,
                                }}
                            >
                                {waypoint.Description}
                            </p>
                        ))}
                    </div>


                    <Button
                        className='FLBut relative'
                        as="a"
                        href={currLink}
                        
                        
                    >
                        Directions
                    </Button>


                    

                    


                </Flex>

                



            </div>



            
        </Flex>

      
    </div>
  )
}

export default FutureLocations
