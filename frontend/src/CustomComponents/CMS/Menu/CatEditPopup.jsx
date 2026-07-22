import React from 'react'
import { Flex } from '@chakra-ui/react'
import './CatEditPopup.css'
import { useState } from 'react'
import { Table } from "@chakra-ui/react"
import { Input, Field, Button } from '@chakra-ui/react'


const CatEditPopup = ({cats, catItem}) => {

    
    const [selectedCat, setSelectedCat] = useState("");
    const [rankErrorMessage, setRankErrorMessage] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [isRankError, setIsRankError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);
    const [rankInput, setRankInput] = useState();
    const [selectedName, setSelectedName] = useState('');

    const handleRankInputChange = (e) => setRankInput(e.target.value);
    const handleNameInputChange = (e) => setSelectedName(e.target.value);

    const API = 'http://localhost:5000'


    const isNumericString = (val) => {
        return typeof val === 'string' && val.trim() !== '' && !isNaN(val) && isFinite(val);
    }

    const handleUpdate = (originalName, newRank, newName, categories) => {

        if(newName.trim().length === 0) {

            setIsNameError(true);
            setNameErrorMessage("Enter a name.");
            return;

        }

        if (newRank.trim().length === 0) {
            setIsRankError(true);
            setRankErrorMessage("Enter a rank.");
            return;
        }

        const newCatObj = {
            "category": originalName,
            "displayOrder": newRank,
            "newCat": newName,
            "categoryID": categories[categories.findIndex(item => item.category === originalName)].categoryid
        };

        reorder(newCatObj, categories);

    }


    const reorder = async(category, categories) => {

        let output = categories; 

        if (category.displayOrder <= 0 || category.displayOrder > categories.length) {
            setRankErrorMessage("Out of bounds");
            setIsRankError(true);
            return;
        }

        else if (!(isNumericString(category.displayOrder))) {
            setRankErrorMessage("Not a number");
            setIsRankError(true);
            return;
        }

        if (category.displayOrder < categories[categories.findIndex(item => item.category === category.category)].displayorder) {


            for (let i = category.displayOrder - 1; i < categories[categories.findIndex(item => item.category === category.category)].displayorder - 1; i++) {


                output[i].displayorder+=1;

            }

            output[output.findIndex(item => item.category === category.category)].displayorder = category.displayOrder;

        }

        else if (category.displayOrder > categories[categories.findIndex(item => item.category === category.category)].displayorder) {


            for (let i = categories[categories.findIndex(item => item.category === category.category)].displayorder; i < category.displayOrder; i++) {
                
                
                output[i].displayorder-=1;
            }

            output[output.findIndex(item => item.category === category.category)].displayorder = category.displayOrder;

        }


        for (const item of output) {

            const body = {
                newName: item.category,
                newRank: item.displayorder,

            };


            const response = await fetch(API + `/admin/CMS/menu/menu-categories/${item.categoryid}`, {

                method:"PUT",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });

            console.log(response);

            

        }
        


        



        return output;
    }

    const addCat = (category, categories) => {

        let output = categories;
        category.displayOrder = categories.length + 1;

        if (categories[categories.findIndex(item => item.category === category.category)]) {
            setNameErrorMessage("Category already exists");
            setIsNameError(true);
            return;
        }

        //API POST call instead
        output.push(category);

        return output;
    }

    const deleteCat = (category, categories) => {

        let output = categories;

        let catNames = categories.map(item => item.category);

        if (!(category.category in catNames)) {
            setRankErrorMessage("Category does not exist");
            setIsNameError(true);
            return;
        }

        for (let i = categories.findIndex(item => item.category === category.category) + 1; i < categories.length; i++) {

            
            output[i].displayOrder-=1;
        }

        //API DELETE call instead
        output.splice(categories.findIndex(item => item.category === category.category), 1);

        return output;
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
                h-[50%]
                
                rounded-lg
                shadow-lg
                GDWrapper
                bg-white
                justify-center
            '

            style={{
                transform:'translate(-50%,-50%)'
            }}
        >

            <Flex
                className='
                    flex-1
                    flex-col

                    
                '

                style={{
                    overflowY:'scroll'
                }}
            >

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                        <Table.ColumnHeader>Category Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Display Order</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {catItem.map((item) => (
                            <Table.Row key={item.categoryid} onClick={() => { setSelectedCat(item.category); setRankInput(item.displayorder); setSelectedName(item.category) }}>
                                <Table.Cell>{item.category}</Table.Cell>
                                <Table.Cell>{item.displayorder}</Table.Cell>
                            </Table.Row>
                        ))}

                    </Table.Body>
                </Table.Root>

                



            </Flex>

            <Flex
                className='
                    flex-1
                    rounded-lg
                    GDWrapper
                    flex-col
                    gap-5
                '
                
            >

                <h1 className='editText'>
                    Selected category: {selectedCat}
                </h1>
                
                <Field.Root invalid={isNameError}>
                    <Field.Label className='editText'>Category Name</Field.Label>
                    <Input value={selectedName} onChange={handleNameInputChange} placeholder="New Order Rank" style={{color:'black'}} />
                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                         {nameErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={isRankError}>
                    <Field.Label className='editText'>Display Order Rank</Field.Label>
                    <Input value={rankInput} onChange={handleRankInputChange} placeholder="New Order Rank" style={{color:'black'}} />
                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                         {rankErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                <Flex className='w-full gap-5'>

                    <Button className='editButton flex-1' onClick={() => handleUpdate(selectedCat, rankInput, selectedName, catItem)}>

                        Update

                    </Button>

                    <Button className='editButton flex-1' style={{background:'red'}}>

                        Delete

                    </Button>
                </Flex>




            </Flex>

        </Flex>
      
    </div>
  )
}

export default CatEditPopup
