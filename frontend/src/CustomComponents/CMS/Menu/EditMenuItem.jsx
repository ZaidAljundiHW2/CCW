import React from 'react'
import { Flex, Field, Input, InputGroup, Span, Button, Textarea } from '@chakra-ui/react'
import { useState } from 'react';
import { FileUpload } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

const EditMenuItem = ({menuitem, setShowMenuItemEdit}) => {

    const [inputName, setInputName] = useState(menuitem.itemname);
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [discErrorMessage, setDiscErrorMessage] = useState("");
    const [inputDesc, setInputDesc] = useState(menuitem.itemdescription);
    const [inputPrice, setInputPrice] = useState(menuitem.price);
    const [priceErrorMessage, setPriceErrorMessage] = useState("");
    const [img, setImg] = useState(null);
    

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
                        {discErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Price */}
                <Field.Root invalid={isNameError} className='w-full'>
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
                

                
            </form>

            <Flex className='justify-end'>
                <Button className='editButton' style={{background:'red'}} onClick={() => setShowMenuItemEdit(false)}>
                    Cancel
                </Button>
            </Flex>

        </Flex>
      
    </div>
  )
}

export default EditMenuItem
