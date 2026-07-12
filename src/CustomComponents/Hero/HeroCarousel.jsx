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
          height:'100%'

        }}
      >

        <Box
          style={{
            right:'0',
            bottom:'0',
            position:'absolute',
            width:'90%',
            height:'90%',
          }}
        >

          {/* Food */}
          <img 
            src={FoodBucket}
            style={{
              position:'absolute',
              right:0,
              bottom:0,
              height:'100%',
              width:'auto'
            }}
          />


          {/* Smoke layer */}
          <AnimatePresence>
            {!videoEnded && (
              <motion.video
                src={steaminit}
                autoPlay
                muted
                playsInline
                onEnded={() => setVideoEnded(true)}
                className="smoke"
                style={{
                  position:'absolute',
                  right:0,
                  bottom:0,
                  height:'100%',
                  width:'auto',
                  mixBlendMode:'screen'
                }}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:1}}
                
              />
            )}
          </AnimatePresence>


          <AnimatePresence mode="sync">

            {videoEnded && loopIndex === 0 && (
              <motion.video
                key="loop0"
                src={steamloop}
                autoPlay
                muted
                playsInline
                className="smoke"
                style={{
                  position:'absolute',
                  right:0,
                  bottom:0,
                  height:'100%',
                  width:'auto',
                  mixBlendMode:'screen'
                }}
                onEnded={updateLoopIndex}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:1}}
              />
            )}

            {videoEnded && loopIndex === 1 && (
              <motion.video
                key="loop1"
                src={steamloop}
                autoPlay
                muted
                playsInline
                className="smoke"
                style={{
                  position:'absolute',
                  right:0,
                  bottom:0,
                  height:'100%',
                  width:'auto',
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