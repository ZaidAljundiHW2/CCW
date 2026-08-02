import React from 'react'
import { Flex, Button } from '@chakra-ui/react';

const TestimonialBlock = ({testimonial, setTestimonial, setShowEdit}) => {

  return (
    <div
        className='
            w-full
            rounded-lg
            shadow-lg
            flex
            InfoBlockWrapper
            gap-5
            md:flex-row
            flex-col
        '
    >
        
        {/* Label and Info */}
        <Flex className='gap-3 min-w-0 flex-col'>
            <h1>
                Testimonial ID: {testimonial.testimonialid}
            </h1>

            <h1>
                Name: {testimonial.username}
            </h1>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Testimonial: {testimonial.testimonial}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Profile:
                </h1>

                <img src={testimonial.image} style={{height:'100px', aspectRatio:'1/1'}}/>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Rating: {testimonial.rating} stars
                </h1>

            </div>
            
            
        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end gap-3'>

            
            


            <Button className='rounded-lg editButton' onClick={() => {setTestimonial(testimonial); setShowEdit(true)}}>
                Edit
            </Button>

            

            


        </Flex>

        
    </div>
  )
}

export default TestimonialBlock