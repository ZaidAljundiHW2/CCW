import React from 'react'
import { Flex, Button } from '@chakra-ui/react';
import DeleteQuery from './DeleteQuery';

const ContactBlock = ({contactItem,
    mark=true,
    setContactItem,
    setShowDelete,
    setRefresh
}) => {


    
    const markComplete = async(contactItem) => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/contact/new/${contactItem.contactid}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response);

            if(response.ok){
                setRefresh(prev => !prev);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const markNew = async(contactItem) => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/contact/complete/${contactItem.contactid}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response);

            if(response.ok){
                setRefresh(prev => !prev);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

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
                Name: {contactItem.name}
            </h1>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Email: {contactItem.email}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Phone Number: {contactItem.phonenumber}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Subject: {contactItem.subject}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Message: {contactItem.message}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Date submitted: {contactItem.datetime}
                </h1>

            </div>


            
            

        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end gap-3'>

            {mark && (

                <Button className='rounded-lg editButton' style={{background:'#4BB543'}} onClick={() => markComplete(contactItem)}>
                    Mark complete
                </Button>

            )}

            {!mark && (

                <Button className='rounded-lg editButton' onClick={() => markNew(contactItem)}>
                    Mark new
                </Button>

            )}
            


            <Button className='rounded-lg editButton' style={{background:'red'}} onClick={() => {setShowDelete(true); setContactItem(contactItem)}}>
                Delete
            </Button>

            

            


        </Flex>

        
    </div>
  )
}

export default ContactBlock
