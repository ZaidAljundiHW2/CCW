import { Flex, Input, Textarea, Field, Button } from '@chakra-ui/react'
import { useState, useRef } from 'react';

const EditGenDet = ({editedItem, setShowEdit, fetchAll}) => {

    const textarea = editedItem.type === "Legal";
    const [buttonLoading, setButtonLoading] = useState(false);
    
    const [value, setValue] = useState(editedItem.val);
    const label = useRef(editedItem.label);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const updateVal = async (e) => {

        setButtonLoading(true);


        e.preventDefault();

        try {
            
            const body = {
                val: value,
            };


            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/general-details/${label.current}`, {

                method:"PUT",
                credentials:'include',
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });



            console.log(response);

            fetchAll();


            setShowEdit(false);

            
            
        } catch (error) {

            console.error(error)
            
        }
    }

  return (
    <div
        className='
            fixed
            inset-0
            bg-black/70
            z-40
        '
    >

        <Flex
            className='
                absolute
                top-[50%]
                left-[50%]
                landscape:w-[50%]
                portrait:w-[80%]                
                rounded-lg
                shadow-lg
                flex-col
                GDWrapper
                bg-white
                max-h-[50%]
                
            '

            style={{
                transform:'translate(-50%,-50%)',
                overflowY:'scroll'
            }}
        >
            <h1 className='CMSHead'>
                Update Details
            </h1>

            <h1 className='editText'>
                Current:
            </h1>
            
            <h1 className='editText'>
                {editedItem.val}
            </h1>

            <h1 className='editText'>
                Updated:
            </h1>

            <form onSubmit={updateVal}>


                {!textarea && (


                        <Field.Root invalid={isError}>
                            <Field.Label className='editText'></Field.Label>
                            <Input 
                                onChange={(e) => setValue(e.target.value)} 
                                style={{color:'black'}}
                                value={value}
                            />

                            <Field.ErrorText width="full">
                                <Field.ErrorIcon />
                                {errorMessage}
                            </Field.ErrorText>
                        </Field.Root>
                    )
                }

                {textarea && (
                        <Field.Root invalid={isError}>
                            <Field.Label className='editText'></Field.Label>
                            <Textarea 
                                onChange={(e) => setValue(e.target.value)} 
                                style={{color:'black'}}
                                value={value}
                            />
                            <Field.ErrorText width="full">
                                <Field.ErrorIcon />
                                {errorMessage}
                            </Field.ErrorText>
                        </Field.Root>
                    )
                }
                
                
                
                
                
                <h1 className='editText'>
                    Make sure to include 'https://' for links.
                </h1>

                <Flex
                    className='
                        justify-end
                        gap-3
                    '
                >

                    <Button

                        className='
                            rounded-lg
                            shadow-lg
                            cursor-pointer
                            
                        '
                        
                        type='button'
                        style={{
                            background:'red',
                            padding:'10px'
                        }}

                        onClick={() => setShowEdit(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        className='
                            editButton
                            rounded-lg
                            
                        '

                        loading={buttonLoading}

                        
                        type='submit'
                        
                        
                    >
                        Update
                    </Button>

                </Flex>
            </form>

        </Flex>
      
    </div>
  )
}

export default EditGenDet
