import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'
import { motion } from 'motion/react';

import InfiniteAppetizerCarousel from './InfiniteAppetizerCarousel';
import CreateYourOwn from './CreateYourOwn';
import MenuShowcase from './MenuShowcase';

const Menu = () => {

  return (
    <motion.div 
        style={{
            background:'#f4f4f4',
            padding:'5%'
        }}

        layout

        transition={{ layout: { duration: 0.4, ease: 'easeInOut' }}}

    
        id='menu'
        className='flex items-center flex-col gap-5'
    >

        <h1 className='MenuHeader2' style={{color:'#012447'}}>
            EXPLORE OUR MENU
        </h1>

        <MenuShowcase />

    
      
    </motion.div>
  )
}

export default Menu
