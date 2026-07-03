import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import HomeMapBackground from '@/assets/img/home-map-background.png'

const ExistingLocation = () => {
  return (
    <div>

        <Box
            className='
                w-full
                h-[50vh]
                relative
            '    
        >

            <img 
                src={HomeMapBackground}
                style={{
                    height:'100%',
                    width:'100%',
                    objectFit:'cover',
                    position:'absolute'
                }}
            />

            <Flex 
                className='
                    h-full
                    w-full
                    absolute
                '
            >

                <Box
                    className='
                        h-full
                        w-[71%]
                    '

                    style={{
                        paddingLeft:'10%'
                    }}
                
                >
                    <Box
                        className='
                            h-full
                            max-w-[40%]
                            bg-red-500
                            flex
                            flex-col
                            justify-center
                            
                        '

                        
                        
                    >

                        <h1>Our Home Port</h1>

                        <h1>Burlington, Ontario</h1>

                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident"
                        </p>

                    </Box>

                

                </Box>

                <Box
                    className='
                        h-full
                        w-[29%]
                    '
                >

                </Box>

            </Flex>



        </Box>
      
    </div>
  )
}

export default ExistingLocation
