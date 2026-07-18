import React from 'react'
import { Box } from '@chakra-ui/react'
import CanadaMap from '@/assets/img/Canada_blank_map.png'
import WayPoint from '@/assets/icons/contact-pin-orange.png'
import ActiveWayPoint from '@/assets/icons/contact-pin-orange-active.png'
import WPJson from '@/assets/JSONs/waypoints.json'
import { useState, useRef, useEffect } from 'react'

const FLMap = () => {

    const numWayPoints = WPJson.length;

    const [index, setIndex] = useState(0)


    useEffect(() => {

        const interval = setInterval(() => {

            setIndex(prev => (prev + 1) % numWayPoints);


        }, 10000);

        return () => clearInterval(interval);

    }, []);

    

  return (
    <Box
        className='
            w-135
            shadow-lg
            rounded-lg
            bg-white
            relative
        '

        style={{
            aspectRatio:'557 / 471',
            backgroundImage:`url(${CanadaMap})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat',
            
        }}
    >

        <img 
            src={WayPoint}
            alt='waypoint'

            style={{
                position: 'absolute',
                top: '83.5%',   // these are the exact % coords you'd tune once, then leave alone
                left: '63%',
                width: '40px',
             
            }}
        
        />

        {WPJson.map((waypoint, i) => (
            
            <img 
                src={WayPoint}
                alt='waypoint'
                key={i}

                style={{
                    position: 'absolute',
                    top: `${waypoint.Top}`, 
                    left: `${waypoint.Left}`,
                    width: '40px',
                }}
            
            />
        ))}

        {WPJson.map((waypoint, i) => (
            
            <img 
                src={ActiveWayPoint}
                alt='waypoint'
                key={i}

                className='transition-opacity duration-700'

                style={{
                    position: 'absolute',
                    top: `${waypoint.Top}`,   
                    left: `${waypoint.Left}`,
                    width: '40px',
                    opacity: i === index ? 1 : 0
                }}
            
            />
        ))}





    </Box>
  )
}

export default FLMap
