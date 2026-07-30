import React from 'react'
import { Flex, Button } from '@chakra-ui/react';

const FranchiseBlock = ({franchiseItem, mark=true, setFranchiseItem, setShowDelete, setRefresh}) => {


    
    const markComplete = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/franchise/new/${franchiseItem.franchiseid}`, {
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

    const markNew = async() => {

        try {

            const response = await fetch(API + `/admin/CMS/franchise/complete/${franchiseItem.franchiseid}`, {
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
                Franchise Request ID: {franchiseItem.franchiseid}
            </h1>

            <h1>
                Name: {franchiseItem.name}
            </h1>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Email: {franchiseItem.email}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Phone Number: {franchiseItem.phonenumber}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    City: {franchiseItem.city}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Investment Interest: {franchiseItem.investmentinterest}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Message: {franchiseItem.message}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Time Submitted: {franchiseItem.datetime}
                </h1>

            </div>

            


            
            

        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end gap-3'>

            {mark && (
            
                <Button className='rounded-lg editButton' style={{background:'#4BB543'}} onClick={() => markComplete(franchiseItem)}>
                    Mark complete
                </Button>

            )}

            {!mark && (

                <Button className='rounded-lg editButton' onClick={() => markNew(franchiseItem)}>
                    Mark new
                </Button>

            )}
            

            <Button className='rounded-lg editButton' style={{background:'red'}} onClick={() => {setShowDelete(true); setFranchiseItem(franchiseItem)}}>
                Delete
            </Button>

            

            

            


        </Flex>
      
    </div>
  )
}

export default FranchiseBlock
