import { useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';

const DeleteTestimonial = ({setShowDelete, setShowEdit, item}) => {

    const [buttonLoading, setButtonLoading] = useState(false);
    

    const deleteItem = async(item) => {

        try {

            setButtonLoading(true);

            const body = {
                "curr_image": item.image
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/testimonials/${item.testimonialid}`, {

                method:"DELETE",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            console.log(response);



            if (response.ok) {

                setShowDelete(false);
                setShowEdit(false)

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
                Are you sure you want to delete the following item?
            </h1>

            <h1 className='editText'>
                Testimonial ID: {item.testimonialid}
            </h1>

            

            <Flex className='w-full gap-5 justify-center'>

                

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(false)}>

                    No

                </Button>

                <Button className='editButton' loading={buttonLoading} style={{background:'#4BB543'}} onClick={() => deleteItem(item)}>

                    Yes

                </Button>

            </Flex>


        </Flex>
        
    </div>
  )
}

export default DeleteTestimonial