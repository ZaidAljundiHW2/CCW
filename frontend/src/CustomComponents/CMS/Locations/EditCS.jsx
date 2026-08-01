import React, { useEffect } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import CSCard from '@/CustomComponents/Locations/LocationsComponents/CSCard'
import {
  Badge,
  Box,
  Carousel,
  HStack,
  Icon,
  IconButton,
  Image,
  Span,
  Stack,
} from "@chakra-ui/react"
import { FaStar } from "react-icons/fa"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { useState } from 'react'
import EditCSItem from './EditCSItem'

const EditCS = ({setShowEdit}) => {


    const [CSLocations, setCSLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedItem, setSelectedItem] = useState();
    const [showEditCSItem, setShowEditCSItem] = useState(false);



    const getCSLocations = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/coming-soon`, {
                credentials:'include',
            });

            const jsonData = await response.json();

            setCSLocations(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const load = async() => {

            await getCSLocations();
            setIsLoading(false);
        }

        load();

    },[]);

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
                portrait:w-[90%]

            '
            
            style={{
                transform:'translate(-50%,-50%)',
                overflowY:'scroll'
            }}
        >

            <h1 className='CMSHead'>
                Edit 'Coming Soon' Locations
            </h1>

            <h1 className='editText'>
                Click on a location to edit
            </h1>

            {isLoading ? (
                    <p style={{color:'black'}}>Loading...</p>
                )

                :

                (
                    <Carousel.Root slideCount={CSLocations.length} slidesPerPage={3} gap="3">
                        <HStack justify="space-between">
                            <HStack>
                            <Carousel.PrevTrigger asChild>
                                <IconButton size="xs" variant="subtle">
                                <LuChevronLeft />
                                </IconButton>
                            </Carousel.PrevTrigger>
                            <Carousel.NextTrigger asChild>
                                <IconButton size="xs" variant="subtle">
                                <LuChevronRight />
                                </IconButton>
                            </Carousel.NextTrigger>
                            </HStack>
                        </HStack>
                        <Carousel.ItemGroup>
                            {CSLocations.map((CSLocation, index) => (
                            <Carousel.Item 
                                key={CSLocation.csid} 
                                index={index}
                                onClick={() => {setSelectedItem(CSLocation); setShowEditCSItem(true)}}
                                _hover={{cursor:'pointer'}}
                            >
                                <CSCard csitem={CSLocation} index={index}/>
                            </Carousel.Item>
                            ))}
                        </Carousel.ItemGroup>
                    </Carousel.Root>

                )
            }

            


            <Button className='editButton' style={{background:'red', alignSelf:'end'}} onClick={() => setShowEdit(false)}>
                Cancel
            </Button>

        </Flex>


        {showEditCSItem && (<EditCSItem CSItem={selectedItem} setShowEditCSItem={setShowEditCSItem} setShowEditCS={setShowEdit}/>)}

        
    </div>
  )
}

export default EditCS