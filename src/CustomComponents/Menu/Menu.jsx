import MenuBackground from '@/assets/img/back4.png'
import './Menu.css'
import { motion } from 'motion/react';

import InfiniteAppetizerCarousel from './InfiniteAppetizerCarousel';
import CreateYourOwn from './CreateYourOwn';
import MenuShowcase from './MenuShowcase';

const Menu = () => {

  return (
    <div 
        style={{
            background:'#f4f4f4',
            padding:'5%'
        }}

    
        id='menu'
        className='flex items-center flex-col gap-5'
    >

        <h1 className='MenuHeader2' style={{color:'#012447'}}>
            EXPLORE OUR MENU
        </h1>

        <MenuShowcase />

        





        {/* <CreateYourOwn /> */}

        {/* <motion.div  
            className='
                flex
                w-[100%] 
                flex-col
                justify-center
                items-center
                gap-5
                bg-[#f2f0ef]

            '

            layout
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}


            style={{
                padding:'20px'
            }}
        >

            <InfiniteAppetizerCarousel />


        </motion.div> */}

        



        

      
    </div>
  )
}

export default Menu
