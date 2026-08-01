import React, { useEffect } from 'react'
import creamwall from '@/assets/img/Backgrounds/sand2.png'
import { Flex } from '@chakra-ui/react'
import waveicon from '@/assets/icons/waveicon.png'
import '../About/AboutComponents/OurMission.css'
import logo from '@/assets/img/logo-overflow.png'
import { motion } from 'motion/react'
import { useState } from 'react'
import StepsBack from '@/assets/img/Backgrounds/f2back.png'
import Crab from '@/assets/img/location-coming-soon.png'

const HomeStory = () => {

  const [mission, setMission] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getStory = async() => {

      try {
          

          const response = await fetch(`${import.meta.env.VITE_API_URL}/homestory`, {
              method:"GET"
          });

          console.log(response);


          const jsonData = await response.json();

          setMission(jsonData);

          
      } catch (error) {
          console.error(error);
      }

  }

  useEffect(() => {

    const load = async() => {

      getStory();
      setIsLoading(false);
    };

    load();

  },[])

  

  return (
    <div

      className='
        w-full
        flex
        md:flex-row
        flex-col
        md:gap-10
        gap-3
        missionwrapper
      '

      style={{
        backgroundImage: `url(${StepsBack})`,
        backgroundSize:'100% 100%',
        padding:'20px'
      }}
    >

      <Flex
        className='flex-col justify-center portrait:order-2 landscape:order-1'
      >

        

        <motion.h1 className='missionhead' style={{color:'#ef571b'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.2}}
          viewport={{once:true}}
        >
          WHO ARE WE?
        </motion.h1>

        <motion.h1 className='missionhead' style={{color:'white'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.2}}
          viewport={{once:true}}
        >
          WHO ARE WE?
        </motion.h1>

        <motion.h1 className='missionhead' style={{color:'#ef571b'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.2}}
          viewport={{once:true}}
        >
          WHO ARE WE?
        </motion.h1>

        

      </Flex>



      <Flex className='justify-center items-center landscape:order-2 portrait:order-1 text-right'>

        {(isLoading) ? (
            <p style={{color:'black'}}>Loading...</p>
          )

          :

          (

            <div className='flex flex-col gap-3'>


                <motion.p className='WhyCCText md:text-left text-center' style={{color:'white'}}
                    initial={{opacity:0, x:-50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.3, ease:'easeOut'}}

                    viewport={{once:true}}
                >
                    {mission.val}

                </motion.p>

              
            </div>

          )
      
        }
        
      </Flex>

    
      
      

      
      


      
    </div>
  )
}

export default HomeStory
