import './Menu.css'
import { motion } from 'motion/react';
import MenuShowcase from './MenuComponents/MenuShowcase';
import SEO from '@/SEO';

const Menu = () => {

  return (


    <>

        <SEO title={"Captain's Crab | Menu"} description={"Explore the menu of Captain's Crab! View all of our catches, sides, and combos! Build your own seafood boil and choose from our catches, sauces, and sides!"}/>
    

        <section data-navbar-theme="light">
            <motion.div 
                style={{
                    background:'#f4f4f4',
                    
                }}

                

                

                transition={{ layout: { duration: 0.4, ease: 'easeOut' }}}

            
                id='menu'
                className='flex items-center flex-col gap-5 menuwrapper'
            >

                
                <motion.h1 
                    className='MenuHeader2' 
                    style={{color:'#012447', paddingTop:'var(--nav-height)'}}

                    initial={{opacity:0, y:-50}}

                    whileInView={{opacity:1, y:0}}

                    transition={{duration:.5, ease:'easeOut'}}

                    viewport={{once:false}}
                >
                    EXPLORE OUR MENU
                </motion.h1>


                <MenuShowcase />

            
            
            </motion.div>

        </section>
    </>
  )
}

export default Menu
