import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import HeroImg1 from '@/assets/img/home-hero-final.png'
import HeroImg2 from '@/assets/img/group-dining.png'
import HeroImg3 from '@/assets/img/restaurant-exterior.png'
import HeroImg4 from '@/assets/img/restaurant-front.png'
import HeroImg5 from '@/assets/img/hero-harbor.png'
import './HeroCarousel.css'
import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { useStackState } from 'rooks';
import Queue from '@/customLib/Queue'

const HeroCarousel = () => {
  const imgs = [
    HeroImg1,
    HeroImg2,
    HeroImg3,
    HeroImg4,
    HeroImg5
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % imgs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">

      {imgs.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="hero"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: i === index ? 1 : 0
          }}
        />
      ))}

    </div>
  );
};

export default HeroCarousel;