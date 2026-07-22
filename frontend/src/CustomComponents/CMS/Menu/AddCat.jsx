import React from 'react'
import { Flex, Input, Field, Button } from '@chakra-ui/react'
import { useState } from 'react';

const AddCat = ({categories, setShowAdd}) => {

    const [selectedName, setSelectedName] = useState('');
    const handleNameInputChange = (e) => setSelectedName(e.target.value);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const API = 'http://localhost:5000'

    const AddCategory = async(catName, categories) => {

        try {

            const catNames = categories.map(category => category.category);
            console.log(catNames);

            if (catName.trim().length === 0) {
                setErrorMessage("Enter a category name");
                setIsError(true);
                return;
            }

            else if (catNames.includes(catName)) {
                setErrorMessage("Category already exists");
                setIsError(true);
                return;
            }

            const nextDisplay = categories[categories.length - 1].displayorder + 1;

            const body = {
                "category":catName,
                "displayorder":nextDisplay
            }

            const response = await fetch(API + '/admin/CMS/menu/menu-categories',
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            console.log(response);
            setShowAdd(false);
            
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
                flex-col                
                rounded-lg
                shadow-lg
                GDWrapper
                bg-white
                justify-center
                text-center
            '

            style={{
                transform:'translate(-50%,-50%)'
            }}
        >
            <h1 className='CMSHead'>Add a new category</h1>

            <Flex className='w-full GDWrapper items-end justify-center'>

                <Flex className='flex-1'>
                    <Field.Root invalid={isError}>
                        <Field.Label className='editText'>Category Name</Field.Label>
                        <Input 
                            value={selectedName} 
                            onChange={handleNameInputChange} 
                            placeholder="New category" 
                            style={{color:'black'}} 
                        />
                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {errorMessage}
                        </Field.ErrorText>
                    </Field.Root>
                </Flex>

                <Flex className='flex-1 justify-end gap-3'>

                    <Button className='editButton' style={{background:'red'}} onClick={() => setShowAdd(false)}>
                        Cancel
                    </Button>

                    <Button className='editButton' style={{background:'#4BB543'}} onClick={() => AddCategory(selectedName, categories)}>
                        Add
                    </Button>

                </Flex>



            </Flex>

        </Flex>
      
    </div>
  )
}

export default AddCat
