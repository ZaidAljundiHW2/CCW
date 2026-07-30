import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutUsBack from '@/assets/img/aboutusback.png'
import './About.css'
import OurStory from './AboutComponents/OurStory'
import OurValues from './AboutComponents/OurValues'
import OurMission from './AboutComponents/OurMission'
import GalleryComponent from './AboutComponents/GalleryComponent'
const About = () => {
  return (
    <div
        id='about'
        
        style={{
          overflowX:'hidden'
        }}
    >

        <OurStory />

        <OurValues />

        <OurMission />

        {/* <GalleryComponent /> */}

        
      
    </div>
  )
}

export default About
