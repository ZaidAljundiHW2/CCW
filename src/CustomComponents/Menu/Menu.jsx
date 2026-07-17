import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'
import { motion, AnimatePresence } from 'motion/react';

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

        

        transition={{ layout: { duration: 0.4, ease: 'easeOut' }}}

    
        id='menu'
        className='flex items-center flex-col gap-5'
    >

        
        <motion.h1 
            className='MenuHeader2' 
            style={{color:'#012447'}}

            initial={{opacity:0, y:-50}}

            whileInView={{opacity:1, y:0}}

            transition={{duration:.5, ease:'easeOut'}}

            viewport={{once:false}}
        >
            EXPLORE OUR MENU
        </motion.h1>


        <MenuShowcase />

    
      
    </motion.div>
  )
}

export default Menu
