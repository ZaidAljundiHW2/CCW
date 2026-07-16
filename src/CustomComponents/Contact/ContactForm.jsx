import React from 'react'
import { Input, Flex, Button, Textarea, Field  } from '@chakra-ui/react'
import { FaRegPaperPlane } from "react-icons/fa6";
import './ContactForm.css'

const ContactForm = () => {
  return (
    <div className='flex-col flex md:gap-5 gap-2'>

        <h1 className='CFH'>
            Send Us A Message!
        </h1>

        <Flex
            className='md:gap-5 gap-2' 
        >
            <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Name*' required/>
            
            <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Email*' required/>

        </Flex>
        


        <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Phone Number'/>

        <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Subject*' required/>

        <Textarea className='CFText' size={{base:'xs', md:'md'}} placeholder='Message...*' required style={{
            height:'103px'
        }} />

        <Button className='w-[100px]' bg={'#ef571b'} color={'white'}>
            Submit
            <FaRegPaperPlane />
        </Button>
        
      
    </div>
  )
}

export default ContactForm
