import React from 'react'
import { Flex } from '@chakra-ui/react'
import './Book.css'
import bookback from '@/assets/img/Backgrounds/f2eeee.png'
import BookForm from './BookForm'
import { motion } from 'motion/react'

const Book = () => {
  return (
    <div
        className='
            flex
            landscape:flex-row
            flex-col
            bookwrapper
        '

        style={{
            backgroundImage:`url(${bookback})`,
            backgroundSize:'100% 100%',
            backgroundPosition:'center'
            
        }}
    >

        {/* Writing */}
        <Flex className='landscape:flex-1 flex-col booktext' style={{paddingTop:'var(--nav-height)'}}>

            <motion.h1 
                style={{color:'#ef571b'}}

                initial={{ opacity:0, x:-50 }}
                animate={{ opacity:1, x:0 }}
                transition={{duration:.5, ease:'easeOut', delay:.2}}
            
            >
                HUNGRY?
            </motion.h1>

            <motion.h1 
                style={{color:'#012447'}}
                initial={{ opacity:0, x:-50 }}
                animate={{ opacity:1, x:0 }}
                transition={{duration:.5, ease:'easeOut', delay:.1}}
            >
                READY TO SATISFY YOUR CRAVINGS?
            </motion.h1>

            <motion.h1 
                style={{color:'#ef571b'}}
                initial={{ opacity:0, x:-50 }}
                animate={{ opacity:1, x:0 }}
                transition={{duration:.5, ease:'easeOut'}}
            >
                BOOK YOUR TABLE
            </motion.h1>

        </Flex>

        {/* Form */}
        <Flex 
            className='
                bookformwrapper 
                landscape:items-center 
                justify-center
                landscape:flex-1
                
            '
            
        >

            <BookForm />

        </Flex>
      
    </div>
  )
}

export default Book
