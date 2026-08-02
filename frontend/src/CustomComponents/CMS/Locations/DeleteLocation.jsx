import { Flex, Button } from '@chakra-ui/react'
import { useState } from 'react';

const DeleteLocation = ({item, setShowDelete, setShowEdit}) => {

    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const deleteLocation = async() => {



        try {

            const body = {
                "image": item.image
            };

            setIsButtonPressed(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/locations/delete/${item.locationid}`, {

                method:"DELETE",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(body)
            });

            if (response.ok) {
                setShowDelete(false);
                setShowEdit(false);
            }
            
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
            portrait:w-[90%]
        '

        style={{

            transform:'translate(-50%,-50%)'
        }}
        >

        <h1 className='CMSHead' style={{lineHeight:1}}>
            Are you sure you want to delete this location?
        </h1>

        <h1 className='editText' style={{lineHeight:1}}>
            Deleting this location will delete all of its associated booking reservations.
        </h1>

        <h1 className='editText' style={{lineHeight:1}}>
            {item.locationname}
        </h1>

        <Flex className='w-full gap-5 justify-center'>

            

            <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(false)}>

            No

            </Button>

            <Button className='editButton' loading={isButtonPressed} style={{background:'#4BB543'}} onClick={() => deleteLocation(item)}>

            Yes

            </Button>

        </Flex>


        </Flex>
        
    </div>
  )
}

export default DeleteLocation