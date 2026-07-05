import React from 'react'
import { Input, Flex, Button } from '@chakra-ui/react'
import { FaRegPaperPlane } from "react-icons/fa6";

const ContactForm = () => {
  return (
    <div className='flex-col flex gap-5'>

        <Flex
            className='gap-5'
        >

            <Input placeholder='Name'/>
            <Input placeholder='Email'/>

        </Flex>

        <Input placeholder='Phone Number'/>

        <Input placeholder='Subject'/>

        <Input placeholder='Message...' style={{
            height:'103px'
        }}/>

        <Button className='w-[100px]'>
            Submit
            <FaRegPaperPlane />
        </Button>
        
      
    </div>
  )
}

export default ContactForm
