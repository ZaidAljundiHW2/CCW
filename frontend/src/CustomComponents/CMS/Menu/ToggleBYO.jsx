import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

const ToggleBYO = ({cats, setShowToggle, categories}) => {

    const API = 'http://localhost:5000'

    const disableBYO = async() => {

        try {

            const response = await fetch(API + '/admin/CMD/menu/menu-categories/byo', {

                method:'DELETE'
            })

            console.log(response);

            setShowToggle(false);
            
        } catch (error) {
            console.error(error);
        }
    }

    const enableBYO = async(categories) => {

        try {

            const nextDisplay = categories[categories.length - 1].displayorder + 1;

            const body = {
                displayorder: nextDisplay
            };

            const response = await fetch(API + '/admin/CMD/menu/menu-categories/byo', {
                
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            });

            console.log(response);
            setShowToggle(false);


            
        } catch (error) {
            console.error(error);
            
        }
    }

  return (
    <div
        className='
            fixed
            inset-0
            bg-black/70
        '
    >

        <Flex 
            className='
                absolute
                top-[50%]
                left-[50%]
                w-[50%]
                rounded-lg
                shadow-lg
                GDWrapper
                bg-white
                justify-center
                flex-col
                text-center
                gap-3
            '

            style={{
                transform:'translate(-50%,-50%)'
            }}
        >

            <h1 className='CMSHead'>
                Toggle Build Your Own
            </h1>

            
            {cats.includes("Build Your Own") ? 
                <h1 className='editText'> 
                    Current Status: Enabled 
                </h1> :

                <h1 className='editText'>
                    Current Status : Disabled 
                </h1>
            }
            
            
            <Flex
                className='
                    gap-5
                    justify-center
                    items-center
                '
            >

                <Button     
                    className='editButton' 
                    style={{background:'red'}}
                    disabled={

                        !(cats.includes('Build Your Own'))
                    }

                    onClick={disableBYO}
                >
                    Disable
                </Button>

                <Button 
                    className='editButton' 
                    style={{background:'#4BB543'}}

                    disabled={

                        (cats.includes('Build Your Own'))
                    }

                    onClick={() => enableBYO(categories)}
                >
                    Enable
                </Button>

            </Flex>

            <Flex className='justify-end'>
                <Button className='editButton' style={{background:'red'}} onClick={() => setShowToggle(false)}>
                    Cancel
                </Button>
            </Flex>
            

        </Flex>
      
    </div>
  )
}

export default ToggleBYO
