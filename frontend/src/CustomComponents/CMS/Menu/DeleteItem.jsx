import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

const DeleteItem = ({setShowDelete, item}) => {

    const API = 'http://localhost:5000'

    const deleteItem = async(item) => {

        try {

            const response = await fetch(API + `/admin/CMS/menu/menu-item/${item.fooditemid}`, {

                method:"DELETE"
            });

            console.log(response);



            setShowDelete(false);

            
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

            <h1 className='CMSHead' style={{lineHeight:1}}>
                Are you sure you want to delete the following item?
            </h1>

            <h1 className='editText'>
                {item.itemname}
            </h1>

            

            <Flex className='w-full gap-5 justify-center'>

                

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(false)}>

                    No

                </Button>

                <Button className='editButton' style={{background:'#4BB543'}} onClick={() => deleteItem(item)}>

                    Yes

                </Button>

            </Flex>


        </Flex>
        
    </div>
  )
}

export default DeleteItem
