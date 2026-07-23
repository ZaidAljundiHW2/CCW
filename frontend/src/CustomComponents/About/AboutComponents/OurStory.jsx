import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutBack from '@/assets/img/Backgrounds/aboutus.png'
import waveicon from '@/assets/icons/waveicon.png'
import waveicon4 from '@/assets/icons/waveicon4.png'
import waveicon3 from '@/assets/icons/waveicon3.png'
import './OurStory.css'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

const OurStory = () => {

  const [story, setStory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API = 'http://localhost:5000';

  const getStory = async() => {

      try {
          

          const response = await fetch(API + '/admin/CMS/about/story', {
              method:"GET"
          });

          console.log(response);


          const jsonData = await response.json();

          
          const storyPieces = jsonData.aboutcontent.split('\n');

          setStory(storyPieces);

          
      } catch (error) {
          console.error(error);
      }

  }

  useEffect(() => {

    const load = async() => {

      await getStory();
      setIsLoading(false);
    }

    load();
  },[]);

  return (
    <div
      className='
        flex
        flex-col
        md:flex-row
        ourstorywrapper
        md:min-h-[100vh]
        min-h-[60vh]
      '
    >

      <Flex className='ourstorycontainer flex-1 bg-red-500'>

      </Flex>

      {/* Content */}
      <Flex className='w-[40%] flex-col justify-center oscw' style={{background:'#e3f6fc'}}>

        <Flex
          className='items-center gap-5'
        >
            <motion.h1 className='WhyCCHead' style={{color: '#ef571b'}}
              initial={{opacity:0, x:50}}

              whileInView={{opacity:1, x:0}}

              transition={{duration:.5, ease:'easeOut', delay:.4}}
            >
                OUR STORY
            </motion.h1>

            {/* <img src={waveicon} 
              style={{
                  width:'10%',
                  height:'auto',
                  objectFit:'contain'
              }}/> */}
        </Flex>

        <motion.h1 className='WhyCCHead2' style={{color:'#012447', lineHeight:1.1}}
          initial={{opacity:0, x:50}}

          whileInView={{opacity:1, x:0}}

          transition={{duration:.5, ease:'easeOut', delay:.3}}
        >
            BORN BY THE COAST. MADE FOR YOU.
        </motion.h1> 

        <Flex className='flex flex-col'>
          
          {(isLoading) ? (
              <p style={{color:'black'}}>Loading...</p>
            )

            :

            (

              <div className='flex flex-col gap-3'>

          
                {story.map((storypiece, i) => (

                  
                  <motion.p className='WhyCCText' style={{color:'#012477'}}
                    initial={{opacity:0, x:50}}

                    whileInView={{opacity:1, x:0}}

                    transition={{duration:.3*(i+1), ease:'easeOut'}}
                  >
                    {storypiece}
                  </motion.p>

                ))}
              </div>

            )
          
          }
          

        </Flex>
        

      </Flex>
      
    </div>
  )
}

export default OurStory
