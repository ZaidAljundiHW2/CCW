import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import '../About/AboutComponents/OurMission.css'
import { motion } from 'motion/react'
import { useState } from 'react'
import StepsBack from '@/assets/img/Backgrounds/f2back.png'

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
        className='flex-col portrait:flex-row portrait:gap-2 landscape:order-2 justify-center items-end'
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

          transition={{duration:.5, ease:'easeOut', delay:.1}}
          viewport={{once:true}}
        >
          WHO ARE WE?
        </motion.h1>

        <motion.h1 className='missionhead' style={{color:'#ef571b'}}
          initial={{opacity:0, x:-50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut'}}
          viewport={{once:true}}
        >
          WHO ARE WE?
        </motion.h1>

        

      </Flex>



      <Flex className='justify-center flex-1 items-center landscape:order-1 text-right portrait:text-center'>

        {(isLoading) ? (
            <p style={{color:'black'}}>Loading...</p>
          )

          :

          (

            <div className='flex flex-col gap-3'>


                <motion.p style={{color:'white'}}
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
