import React from 'react'
import { Flex, Field, Button, Input, Select, Span, Textarea, FileUpload } from '@chakra-ui/react'
import { HiUpload } from "react-icons/hi"
import { useState } from 'react'
import { createListCollection, Portal } from '@chakra-ui/react'

const AddMenuItem = ({setShowMenuItemAdd, categories}) => {

    
    const [isNameError, setIsNameError] = useState("");
    const [inputName, setInputName] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [inputDesc, setInputDesc] = useState("");
    const [imgErrorMessage, setImgErrorMessage] = useState("");
    
    const [inputPrice, setInputPrice] = useState("");
    const [isPriceError, setIsPriceError] = useState("");
    const [priceErrorMessage, setPriceErrorMessage] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [isSelectCategoryError, setIsSelectCategoryError] = useState();
    const [selectedCategoryErrorMessage, setSelectedCategoryErrorMessage] = useState("");

    const API = 'http://localhost:5000'


    const categoryCollection = createListCollection({
        items: categories,
        itemToString: (item) => item.category,
        itemToValue: (item) => item.category,
    });

    const placeholderImgsrc = 'https://drive.google.com/thumbnail?id=1HVFwBvKrLDQKjtUe8KiYP3W-GYacn1Up';

    const addItem = async(itemname, itemprice, itemimg, itemdesc, itemcat, categories) => {

        
        try {

            let end = false;

            if (itemname.trim().length == 0) {

                setIsNameError(true);
                setNameErrorMessage("Enter a value.");
                end = true;
            }

            if (itemprice.trim().length == 0) {
                setIsPriceError(true);
                setPriceErrorMessage("Enter a value.")
                end = true;
            }

            if (itemcat.trim().length == 0) {
                setIsSelectCategoryError(true);
                setSelectedCategoryErrorMessage("Choose a category.");
                end = true;
            }

            if (end) return;

            const hasDesc = itemdesc.trim().length > 0;

            const catid = categories.find(item => item.category === itemcat).categoryid;

            const body = {

                "itemname": itemname,
                "hasdesc":hasDesc,
                "itemdescription": itemdesc,
                "foodimage": itemimg,
                "price": itemprice,
                "categoryid": catid
            }

            const response = await fetch(API + '/admin/CMS/menu/menu-item', {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(body)

            });

            setShowMenuItemAdd(false);

            console.log(response);


            
        } catch (error) {
            console.error(error);
        }
    }
    

  return (

    <div
        className='

            bg-black/70
            fixed
            inset-0
        '

    >

        <Flex
            className='
                absolute
                top-[50%]
                left-[50%]
                rounded-lg
                shadow-lg
                GDWrapper
                bg-white
                flex-col
                text-center
                gap-3
                max-h-[50%]
                min-w-[50%]
            '
            
            style={{
                transform:'translate(-50%,-50%)',
                overflowY:'scroll'
            }}
        >

            <h1 className='CMSHead'>
                Add Menu Item
            </h1>

            <form className='w-full flex gap-5 flex-col'>

                {/* Name */}
                <Field.Root invalid={isNameError} className='w-full'>
                    <Field.Label className='editText'>Item Name</Field.Label>
                    
                    <div className="relative w-full">
                        <Input
                            value={inputName}
                            onChange={(e) => setInputName(e.currentTarget.value.slice(0, 255))}
                            placeholder="New name"
                            style={{ color: 'black', paddingRight: '4.5rem' }}
                            maxLength={255}
                            className="w-full"
                        />
                        <Span
                            color="fg.muted"
                            textStyle="xs"
                            className="absolute right-3 top-1/2"
                            style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                        >
                            {inputName.length}/255
                        </Span>
                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {nameErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Description */}
                <Field.Root className='w-full'>
                    <Field.Label className='editText'>Item Description</Field.Label>
                    
                    <div className="relative w-full">
                        <Textarea
                            value={inputDesc}
                            onChange={(e) => setInputDesc(e.currentTarget.value.slice(0, 255))}
                            placeholder="New description"
                            style={{ color: 'black', paddingRight: '4.5rem' }}
                            maxLength={255}
                            className="w-full"
                        />
                        <Span
                            color="fg.muted"
                            textStyle="xs"
                            className="absolute right-3 top-1/2"
                            style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                        >
                            {inputDesc.length}/255
                        </Span>
                    </div>

                    {/* <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {discErrorMessage}
                    </Field.ErrorText> */}
                </Field.Root>
                
                {/* Image */}
                <Field.Root className='w-full'>
                    <Field.Label className='editText'>Item Image</Field.Label>
                    
                    <div className="relative flex flex-col gap-3 w-full">

                        {/* <img src={menuitem.foodimage} 
                            className='
                                aspect-square
                                w-[20%]
                            '
                        /> */}
                        
                        <FileUpload.Root>
                            <FileUpload.HiddenInput />
                            <FileUpload.Trigger asChild>
                                <Button colorPalette={'black'} variant="outline" size="sm">
                                <HiUpload /> Upload file
                                </Button>
                            </FileUpload.Trigger>
                            <FileUpload.List />
                        </FileUpload.Root>


                        
                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {imgErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Price */}
                <Field.Root invalid={isPriceError} className='w-full'>
                    <Field.Label className='editText'>Item Price</Field.Label>
                    
                    <div className="relative">
                        <Input
                            value={inputPrice}
                            onChange={(e) => setInputPrice(e.currentTarget.value.slice(0, 255))}
                            placeholder="New price"
                            style={{ color: 'black', paddingRight: '4.5rem' }}
                            maxLength={20}
                        />
                        <Span
                            color="fg.muted"
                            textStyle="xs"
                            className="absolute right-3 top-1/2"
                            style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                        >
                            {inputPrice.length}/20
                        </Span>
                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {priceErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Category */}
                <Field.Root invalid={isSelectCategoryError} className='w-full'>
                    <Field.Label className='editText'>Item Category</Field.Label>
                    
                        <Select.Root 
                            collection={categoryCollection} 
                            value={[selectedCategory]} 
                            size="sm" 
                            width="320px"
                            onValueChange={(details) => setSelectedCategory(details.value[0])}

                        >
                            <Select.HiddenSelect />
                            <Select.Control>
                                <Select.Trigger>
                                <Select.ValueText color={'black'} placeholder="Select category" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                <Select.Content>
                                    {categoryCollection.items.map((cat) => (
                                        <Select.Item item={cat} key={cat.category}>
                                            {cat.category}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                                </Select.Positioner>
                            </Portal>
                            </Select.Root>                    

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {selectedCategoryErrorMessage}
                    </Field.ErrorText>
                </Field.Root>
                

                
            </form>

            <Flex className='justify-end gap-3'>

                <Button className='editButton' 
                    style={{background:'#4BB543'}} 
                    onClick={() => addItem(inputName, inputPrice, placeholderImgsrc, inputDesc, selectedCategory, categories)}>
                    Add
                </Button>

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowMenuItemAdd(false)}>
                    Cancel
                </Button>
            </Flex>

        </Flex>
        
    </div>
  )
}

export default AddMenuItem
