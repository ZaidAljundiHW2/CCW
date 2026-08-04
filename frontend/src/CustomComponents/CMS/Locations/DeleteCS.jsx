import { Flex, Button } from '@chakra-ui/react'
import { useState } from 'react';

const DeleteCS = ({setShowDelete, CSItem, setShowEditCSItem, setShowEditCS}) => {


  const [buttonLoading, setButtonLoading] = useState(false);
  const deleteCSItem = async() => {

    try {

      setButtonLoading(true);


      const body = {

        "image": CSItem.imageurl
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/delete/comingsoon/image/${CSItem.csid}`, {

        method:"DELETE",
        credentials:'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      console.log("CCCC");

      setShowDelete(false);
      setShowEditCSItem(false);
      setShowEditCS(false);

      console.log("AAAA");


      
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
                Are you sure you want to delete the following item?
            </h1>

            <h1 className='editText'>
                {CSItem.location}
            </h1>

            

            <Flex className='w-full gap-5 justify-center'>

                

                <Button className='editButton' style={{background:'red', color:'white'}} onClick={() => setShowDelete(false)}>

                    No

                </Button>

                <Button className='editButton' loading={buttonLoading} style={{background:'#4BB543'}} onClick={() => deleteCSItem()}>

                    Yes

                </Button>

            </Flex>


        </Flex>
        
    </div>
  )
}

export default DeleteCS