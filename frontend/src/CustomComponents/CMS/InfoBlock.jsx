import React from 'react'
import { Flex } from '@chakra-ui/react'
import './CMS.css'

const InfoBlock = ({item={}, setShowEdit = () => {}, setEditedObj = () => {}, label="", val=""}) => {
  return (
    <div
        className='
            w-full
            rounded-lg
            shadow-lg
            flex
            InfoBlockWrapper
        '
    >
        
        {/* Label and Info */}
        <Flex className='gap-3'>

            <h1>
                {item.label}
                {label}
            </h1>

            <h1>
                {item.val}
                {val}
            </h1>

        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end'>

            <button className='rounded-lg editButton' onClick={() => {setShowEdit(true); setEditedObj(item)}}>
                Edit
            </button>


        </Flex>
      
    </div>
  )
}

export default InfoBlock
