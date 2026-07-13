import React from 'react'
import { Flex } from '@chakra-ui/react'
import AboutUsBack from '@/assets/img/aboutusback.png'
import './About.css'
import OurStory from './AboutComponents/OurStory'
import OurValues from './AboutComponents/OurValues'
import OurMission from './AboutComponents/OurMission'

const About = () => {
  return (
    <div
        id='about'
    >

        <OurStory />

        <OurValues />

        <OurMission />

        
      
    </div>
  )
}

export default About
