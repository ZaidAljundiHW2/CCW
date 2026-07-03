import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import HeroImg1 from '../assets/img/home-hero-final.png'
import HeroImg2 from '../assets/img/group-dining.png'
import HeroImg3 from '../assets/img/restaurant-exterior.png'
import HeroImg4 from '../assets/img/group-dining-new.png'
import './HeroCarousel.css'
import { motion } from 'motion/react';

const HeroCarousel = () => {
  return (
    <div className='h-full w-full bg-red-500'>
        <img 
          src={HeroImg1} 
          alt='Hero Image'
          style={{
            position:'absolute', 
            height:'100%', 
            width:'100%', 
            objectFit:'cover'
          }}
        />

        <img 
          src={HeroImg2} 
          alt='Hero Image'
          style={{
            position:'absolute', 
            height:'100%', 
            width:'100%', 
            objectFit:'cover'
          }}
        />        
        
        <img 
          src={HeroImg3} 
          alt='Hero Image'
          style={{
            position:'absolute', 
            height:'100%', 
            width:'100%', 
            objectFit:'cover'
          }}
        />

        <img 
          src={HeroImg4} 
          alt='Hero Image'
          style={{
            position:'absolute', 
            height:'100%', 
            width:'100%', 
            objectFit:'cover'
          }}
        />
      
    </div>
  )
}

export default HeroCarousel
