import { Flex, Button } from '@chakra-ui/react'
import { useState } from 'react';

const DeleteQuery = ({item, setShowDelete}) => {

    const [buttonLoading, setButtonLoading] = useState(false);
    

    const deleteContact = async(item) => {

        try {

            setButtonLoading(true);

            const id = item.contactid;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/contact/${id}`, {
                method:"DELETE",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });

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
            Are you sure you want to delete this query?
        </h1>

        <Flex className='w-full gap-5 justify-center'>

            

            <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(false)}>

            No

            </Button>

            <Button className='editButton' loading={buttonLoading} style={{background:'#4BB543'}} onClick={() => deleteContact(item)}>

            Yes

            </Button>

        </Flex>


        </Flex>
        
    </div>
  )
}

export default DeleteQuery
