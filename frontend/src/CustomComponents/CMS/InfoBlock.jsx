import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import './CMS.css'

const InfoBlock = ({
    item={}, 
    setShowEdit = () => {}, 
    setEditedObj = () => {}, 
    label="", 
    val="",
    add=false,
    setShowAdd = () => {},
    edit=true
}) => {
  return (
    <div
        className='
            w-full
            rounded-lg
            shadow-lg
            flex
            InfoBlockWrapper
            gap-5
        '
    >
        
        {/* Label and Info */}
        <Flex className='gap-3'>

            <h1>
                {item.label}
                {label}
            </h1>

            <h1 className='whitespace-pre-line'>
                {item.val}
                {val}
            </h1>

        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end gap-3'>

            {add && (
                <Button className='rounded-lg editButton' style={{background:'#4BB543'}} onClick={() => setShowAdd(true)}>
                    Add
                </Button>
            )}

            {edit && (

                <Button className='rounded-lg editButton' onClick={() => {setShowEdit(true); setEditedObj(item)}}>
                    Edit
                </Button>

            )}
            

            


        </Flex>
      
    </div>
  )
}

export default InfoBlock
