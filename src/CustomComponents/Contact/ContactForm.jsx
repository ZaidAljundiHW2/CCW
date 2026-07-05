import React from 'react'
import { Input, Flex, Button, Textarea, Field  } from '@chakra-ui/react'
import { FaRegPaperPlane } from "react-icons/fa6";
import './ContactForm.css'

const ContactForm = () => {
  return (
    <div className='flex-col flex gap-5'>

        <h1 className='CFH'>
            Send Us A Message!
        </h1>

        <Flex
            className='gap-5'
        >
            <Input placeholder='Name*' required/>
            
            <Input placeholder='Email*' required/>

        </Flex>
        


        <Input placeholder='Phone Number'/>

        <Input placeholder='Subject*' required/>

        <Textarea placeholder='Message...*' required style={{
            height:'103px'
        }} />

        <Button className='w-[100px]' bg={'orange'} color={'white'}>
            Submit
            <FaRegPaperPlane />
        </Button>
        
      
    </div>
  )
}

export default ContactForm
