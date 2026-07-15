import './HeroCarousel.css'
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { useStackState } from 'rooks';
import Queue from '@/customLib/Queue'
import FoodBucket from '@/assets/img/food collection.png'
import { Box } from '@chakra-ui/react';
import steaminit from '@/assets/videos/steam.mp4'
import steamloop from '@/assets/videos/steamloop.mp4'

const HeroCarousel = () => {

  const [videoEnded, setVideoEnded] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [smokeReady, setSmokeReady] = useState(false);
  
  const updateLoopIndex = () => {

    const currIndex = loopIndex;

    const updatedIndex = (currIndex + 1) % 2;

    setLoopIndex(updatedIndex);
  }

  return (
    <div 
      className="
        relative 
        w-full 
        h-full 
      "

      style={{
        background:'transparent'
      }}

      


    >

      <Box
        style={{
          right:'0',
          bottom:'0',
          position:'relative',
          display:'flex',
          alignItems:'end',
          justifyContent:'end',
          flexDirection:'column',
          width:'100%',
          height:'100%',
          

        }}
      >

        <Box
          style={{
            position:'absolute',
            width:'auto',
            aspectRatio:'auto'
          }}

          className='visualbox'

          
        >

          {/* Food */}
          <img 
            src={FoodBucket}
            style={{
              width:'100%',
              height:'100%',
              objectFit:'contain',
            }}

            className='foodbucket'
          />

          
          <AnimatePresence>

          
            {/* Smoke layer */}
            {!videoEnded && (
              <motion.video
                src={steaminit}
                autoPlay
                muted
                playsInline
                onEnded={() => setVideoEnded(true)}
                style={{
                  position:'absolute',
                  right:'7%',
                  bottom:'35%',
                  width:'200%',
                  height:'200%',
                  objectFit:'contain',
                  mixBlendMode:'screen'
                }}

                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:1}}
                
                
              />
            )}
          </AnimatePresence>


          <AnimatePresence>

          
            {videoEnded && loopIndex === 0 && (
              <motion.video
                key="loop0"
                src={steamloop}
                autoPlay
                muted
                playsInline
                style={{
                  position:'absolute',
                  right:'7%',
                  bottom:'35%',
                  width:'200%',
                  height:'200%',
                  objectFit:'contain',
                  mixBlendMode:'screen'
                }}

                onEnded={updateLoopIndex}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:1}}
              />
            )}

          </AnimatePresence>
          
          <AnimatePresence>

         
            {videoEnded && loopIndex === 1 && (
              <motion.video
                key="loop1"
                src={steamloop}
                autoPlay
                muted
                playsInline
                style={{
                  position:'absolute',
                  right:'7%',
                  bottom:'35%',
                  width:'200%',
                  height:'200%',
                  objectFit:'contain',
                  mixBlendMode:'screen'
                }}

                onEnded={updateLoopIndex}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:1}}
              />
            )}
          </AnimatePresence>

        </Box>

        

        

        

      </Box>


        
        
        

      

      

    </div>
  );
};

export default HeroCarousel;