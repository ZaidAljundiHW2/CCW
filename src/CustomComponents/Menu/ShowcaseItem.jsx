import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

const ShowcaseItem = (item) => {
  return (
    <div
        className='
            flex
            flex-col
            rounded-lg
            bg-red-500
            h-[200px]
            w-[200px]
            justify-end
        '

        
    >

        <Flex

            className='
                justify-center
                items-center
                w-full
                h-[20%]
                bg-white
            '
        >
            <h1>
                {item.Name}
            </h1>
        </Flex>

      
    </div>
  )
}

export default ShowcaseItem
