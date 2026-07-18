import React from 'react'
import { Flex } from '@chakra-ui/react'
import './Book.css'
import bookback from '@/assets/img/Backgrounds/f2eeee.png'
import BookForm from '../Navbar/BookForm'

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

            <h1 style={{color:'#ef571b'}}>
                HUNGRY?
            </h1>

            <h1 style={{color:'#012447'}}>
                READY TO SATISFY YOUR CRAVINGS?
            </h1>

            <h1 style={{color:'#ef571b'}}>
                BOOK YOUR TABLE
            </h1>

        </Flex>

        {/* Form */}
        <Flex 
            className='
                flex-1 
                bookformwrapper 
                landscape:items-center 
                justify-center
                
            '
            
        >

            <BookForm />

        </Flex>
      
    </div>
  )
}

export default Book
