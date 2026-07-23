import React from 'react'
import { Flex, Field, Input, InputGroup, Span, Button, Textarea } from '@chakra-ui/react'
import { useState } from 'react';
import { FileUpload } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import DeleteItem from './DeleteItem'

const EditMenuItem = ({menuitem, setShowMenuItemEdit, categories}) => {

    const [inputName, setInputName] = useState(menuitem.itemname);
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [discErrorMessage, setDiscErrorMessage] = useState("");
    const [inputDesc, setInputDesc] = useState(menuitem.itemdescription);
    const [inputPrice, setInputPrice] = useState(menuitem.price);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");
    const [isPriceError, setIsPriceError] = useState(false);
    const [isImgError, setIsImgError] = useState(false);
    const [imgErrorMessage, setImgErrorMessage] = useState("");

    const [isSelectCategoryError, setIsSelectCategoryError] = useState();
    const [selectedCategoryErrorMessage, setSelectedCategoryErrorMessage] = useState("");

    const [showDeleteConf, setShowDeleteConf] = useState(false);

    const [img, setImg] = useState(null);

    const API = 'http://localhost:5000'

    const categoryCollection = createListCollection({
        items: categories,
        itemToString: (item) => item.category,
        itemToValue: (item) => item.category,
    });

    const [selectedCategory, setSelectedCategory] = useState(() => {
        const match = categories.find(cat => cat.categoryid === menuitem.categoryid);
        return match ? match.category : "";
    });

    
    const handleUpdate = async (item, categories) => {

        



        try {

            let end = false;

            if (inputName.trim().length == 0) {
                setIsNameError(true);
                setNameErrorMessage("Input a value");
                end = true;
            }

            if (inputPrice.trim().length == 0) {
                setIsPriceError(true);
                setPriceErrorMessage("Input a value");
                end = true;
            }

            if (end) return;

            const categoryid = categories.find(cat => cat.category === selectedCategory).categoryid;
            const fooditemid = item.fooditemid;

            const body = {

                "itemname": inputName,
                "hasdesc": (inputDesc.trim().length > 0),
                "itemdescription": inputDesc,
                "foodimage": item.foodimage,
                "price": inputPrice,
                "categoryid": categoryid
            }

            const response = await fetch(API + `/admin/CMS/menu/menu-item/${fooditemid}`, {

                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            console.log(response);
            setShowMenuItemEdit(false);
            
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
                w-[50%]
            '
            
            style={{
                transform:'translate(-50%,-50%)',
                overflowY:'scroll'
            }}
        >

            <h1 className='CMSHead'>
                Edit Menu Item
            </h1>

            <h1 className='editText'>

                {menuitem.itemname}
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
                            {inputDesc.length}/255
                        </Span>
                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {discErrorMessage}
                    </Field.ErrorText>
                </Field.Root>
                
                {/* Image */}
                <Field.Root className='w-full'>
                    <Field.Label className='editText'>Item Image</Field.Label>
                    
                    <div className="relative flex flex-col gap-3 w-full">

                        <img src={menuitem.foodimage} 
                            className='
                                aspect-square
                                w-[20%]
                            '
                        />

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
                            placeholder="New name"
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
                                <Select.ValueText color={'black'} placeholder="Select framework" />
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

            <Flex>

                <Button className='editButton' 
                    style={{background:'red'}} 
                    onClick={() => setShowDeleteConf(true)}>
                    Delete
                </Button>

                
            </Flex>

            <Flex className='justify-end gap-3'>

                <Button className='editButton' 
                    style={{background:'#0076df'}} 
                    onClick={() => handleUpdate(menuitem, categories)}>
                    Update
                </Button>

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowMenuItemEdit(false)}>
                    Cancel
                </Button>
            </Flex>

        </Flex>

        {showDeleteConf && (<DeleteItem setShowDelete={setShowMenuItemEdit} item={menuitem} />)}
      
    </div>
  )
}

export default EditMenuItem
