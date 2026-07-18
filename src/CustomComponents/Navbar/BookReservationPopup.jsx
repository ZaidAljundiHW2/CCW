import React from 'react'
import { Flex } from '@chakra-ui/react'
import BookForm from '../Book/BookForm'
import { useEffect } from 'react'

const BookReservationPopup = ({setShowBook}) => {


    useEffect(() => {

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };

    },[])
  return (
    <div
        className='
            bg-black/70
            inset-0
            fixed
            z-40
        '

        onClick={() => setShowBook(false)}
    >

        <Flex 
            className='
                flex-col 
                absolute 
                top-[50%] 
                left-[50%] 
                landscape:w-[50%] 
                w-[90%]
                bg-black
                rounded-lg
                gap-5
            ' 
            
            style={{
                borderWidth:'2px', 
                borderColor:'white', 
                transform:'translate(-50%,-50%)',
                padding:'20px'
            }}

            onClick={(e) => e.stopPropagation()}
        >

            <h1>
                Book a table now!
            </h1>

            <BookForm setShowBook={setShowBook}/>

        </Flex>
      
    </div>
  )
}

export default BookReservationPopup
