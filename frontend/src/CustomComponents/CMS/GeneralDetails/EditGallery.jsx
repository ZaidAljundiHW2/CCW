import React from 'react'
import { Flex } from '@chakra-ui/react'

const CLOUD_NAME = 'pyitrlll';

const EditGallery = () => {
  return (
    <div className='fixed inset-0 bg-black/70 z-40'>
      <Flex
        className='
            absolute top-[50%] left-[50%]
            landscape:w-[50%] portrait:w-[80%]
            rounded-lg shadow-lg flex-col GDWrapper bg-white max-h-[50%]
        '
        style={{ transform: 'translate(-50%,-50%)', overflowY: 'scroll' }}
      >
        <img
          src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/placeholder_yyqeqs`}
          alt="placeholder"
        />
      </Flex>
    </div>
  )
}

export default EditGallery