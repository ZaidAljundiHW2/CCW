import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

const DeleteGalleryImage = ({setShowEdit, imageobj, setShowDelete}) => {


    const deleteImage = async() => {

        try {

            const body = {

                "image":imageobj.url

            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/delete/gallery/image/${imageobj.imageid}`, {

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
    <div className='fixed inset-0 bg-black/70 z-40'>

        <Flex
            className='
            absolute top-[50%] left-[50%]
            landscape:w-[50%] portrait:w-[80%]
            rounded-lg shadow-lg flex-col GDWrapper bg-white max-h-[50%] gap-5
            items-center justify-center
        '
            style={{ transform: 'translate(-50%,-50%)', overflowY: 'scroll' }}
        >

            <h1 className='CMSHead text-center'>
                Are you sure you want to delete the following image?
            </h1>

            <img src={imageobj.url} style={{height:'100px', aspectRatio:'1/1', alignSelf: 'center' }}/>

            <Flex className='w-full gap-5 justify-center'>
                <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(false)}>
                
                    No
    
                </Button>
    
                <Button className='editButton' style={{background:'#4BB543'}} onClick={() => deleteImage()}>
    
                    Yes
    
                </Button>
            </Flex>

        </Flex>
        
    </div>
  )
}

export default DeleteGalleryImage