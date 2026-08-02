import { Flex, Input, Field, Button, Span } from '@chakra-ui/react'
import { useState } from 'react';

const AddCat = ({categories, setShowAdd}) => {

    const [selectedName, setSelectedName] = useState('');
    const handleNameInputChange = (e) => setSelectedName(e.target.value.slice(0,255));
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    const createCloudinaryFolder = async(catName) => {

        try {

            const safeCat = catName.trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, "_");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/create/menu/category/folder/${safeCat}`, {
                method:"POST",
                credentials:'include',
            });

            console.log(response);

            
        } catch (error) {
            console.error(error);
        }
    }

    const AddCategory = async(catName, categories) => {

        try {

            setButtonLoading(true);

            const catNames = categories.map(category => category.category);
            console.log(catNames);

            if (catName.trim().length === 0) {
                setErrorMessage("Enter a category name");
                setIsError(true);
                setButtonLoading(false);
                return;
            }

            else if (catNames.includes(catName)) {
                setErrorMessage("Category already exists");
                setButtonLoading(false);
                setIsError(true);
                return;
            }

            const nextDisplay = categories[categories.length - 1].displayorder + 1;

            const body = {
                "category":catName,
                "displayorder":nextDisplay
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/menu/menu-categories`,
                {
                    method:"POST",
                    credentials:'include',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            
            await createCloudinaryFolder(catName);
            
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
                portrait:w-[90%]
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
                            maxLength={255}
                            placeholder="New category" 
                            style={{color:'black'}} 

                        />

                        <Span
                            color="fg.muted"
                            textStyle="xs"
                            className="absolute right-3 top-1/2"
                            style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                        >
                            {selectedName.length}/255
                        </Span>


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

                    <Button className='editButton' loading={buttonLoading} style={{background:'#4BB543'}} onClick={() => AddCategory(selectedName, categories)}>
                        Add
                    </Button>

                </Flex>



            </Flex>

        </Flex>
      
    </div>
  )
}

export default AddCat
