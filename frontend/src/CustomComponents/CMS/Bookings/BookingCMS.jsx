import { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import ReservationBlock from './ReservationBlock';
import DeleteQuery from './DeleteQuery';
import { Button, Menu, Portal } from "@chakra-ui/react"
import BookingEdit from './BookingEdit';

const BookingCMS = () => {


    const [allNewItems, setAllNewItems] = useState([]);
    const [allCompletedItems, setAllCompletedItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [reservationItem, setReservationItem] = useState();

    const [locations, setLocations] = useState();
    const [location, setLocation] = useState("");
    const [locationName, setLocationName] = useState("");

    const [refresh, setRefresh] = useState(false);

    const getNewReservations = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/bookings/new`, {
                credentials:'include',
            });
            const jsonData = await response.json();
            setAllNewItems(jsonData);
            
            
        } catch (error) {
            console.error(error);
        }
    }

    const getCompletedReservations = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/bookings/complete`, {
                credentials:'include',
            });
            const jsonData = await response.json();
            setAllCompletedItems(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    const getLocations = async() => {

        try {

            const response = await fetch( `${import.meta.env.VITE_API_URL}/locations`, {
                credentials:'include',
            });
            const jsonData = await response.json();
            setLocations(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleLocationChange = (details) => {

        const currLocationID = details.value;
        setLocation(currLocationID);
        setLocationName(locations.find(item => item.locationid == currLocationID).locationname);

    }


    useEffect(() => {

        const load = async() => {
            await getNewReservations();
            await getCompletedReservations();
            await getLocations();
            setIsLoading(false);
        }

        load();
    }, [showDelete, refresh, showEdit]);

    // Derived state: no need for an effect here — just compute the filtered
    // lists directly from the current render's values. useMemo avoids
    // re-filtering on every render unless the underlying data actually changed.
    const selectedNewItems = useMemo(() => {
        if (!location) return [];
        return allNewItems.filter(item => item.locationid == location);
    }, [allNewItems, location]);

    const selectedCompletedItems = useMemo(() => {
        if (!location) return [];
        return allCompletedItems.filter(item => item.locationid == location);
    }, [allCompletedItems, location]);

    if (isLoading) {
        return (
            <p style={{color:'black'}}>Loading...</p>
        )
    }


  return (
    <div
        className='
            w-full
            h-screen
            GDWrapperC
            flex
            flex-col
            bg-white
        '
    >

        {isLoading ? (

                <p style={{color:'black'}}>Loading...</p>

            )

            :

            (

                <div>
                    <h1 className='CMSHead'>
                        Booking Reservations
                    </h1>

                    <Menu.Root onSelect={handleLocationChange}>
                        <Menu.Trigger asChild>
                            <Button color={'black'} style={{borderWidth:'2px', borderColor:'black'}}>
                                Locations
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                            <Menu.Content >
                                
                                {locations.map((location) => (

                                    <Menu.Item value={location.locationid} key={location.locationid}>
                                        {location.locationname}
                                    </Menu.Item>

                                ))}
                            </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                    
                    <h1 className='editText'>
                        Selected Location: {locationName}
                    </h1>


                    <Flex 
                        className='
                            GDWrapper 
                            rounded-lg 
                            shadow-lg
                            flex-col
                        '
                    >

                        <h1 className='CMSHead'>
                            New Reservations
                        </h1>

                        {selectedNewItems.map((item) => (

                            <ReservationBlock 
                                mark={true}
                                reservationItem={item}
                                key={item.bookingid}
                                setShowDelete={setShowDelete}
                                setReservationItem={setReservationItem}
                                setRefresh={setRefresh}
                                setShowEdit={setShowEdit}
                                location={locations.find(location => location.locationid === item.locationid).locationname}

                            />

                        ))}

                        
                    </Flex>

                    <Flex 
                        className='
                            GDWrapper 
                            rounded-lg 
                            shadow-lg
                            flex-col
                        '
                    >

                        <h1 className='CMSHead'>
                            Completed Reservations
                        </h1>

                        {selectedCompletedItems.map((item) => (

                            <ReservationBlock 
                                mark={false} 
                                reservationItem={item} 
                                key={item.bookingid}
                                setShowDelete={setShowDelete} 
                                setReservationItem={setReservationItem}
                                setRefresh={setRefresh}
                                setShowEdit={setShowEdit}
                                location={locations.find(location => location.locationid === item.locationid).locationname}

                            />

                        ))}

                        
                    </Flex>

                    {showDelete && (<DeleteQuery item={reservationItem} setShowDelete={setShowDelete}/>)}

                    {showEdit && (<BookingEdit selectedReservation={reservationItem} setShowEdit={setShowEdit}/>)}
                </div>

            )
            
        
        }
        
      
    </div>
  )
}

export default BookingCMS