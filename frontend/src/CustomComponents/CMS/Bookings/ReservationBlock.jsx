import React from 'react'
import { Flex, Button } from '@chakra-ui/react';
import DeleteQuery from './DeleteQuery';

const ReservationBlock = ({reservationItem,
    mark=true,
    setReservationItem,
    setShowDelete,
    setRefresh,
    location,
    setShowEdit
}) => {

    const API = 'http://localhost:5000'

    
    const markComplete = async(reservationItem) => {

        try {

            const response = await fetch(API + `/admin/CMS/bookings/new/${reservationItem.locationid}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response);

            if(response.ok){
                setRefresh(prev => !prev);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const markNew = async(contactItem) => {

        try {

            const response = await fetch(API + `/admin/CMS/bookings/complete/${contactItem.locationid}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response);

            if(response.ok){
                setRefresh(prev => !prev);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div
        className='
            w-full
            rounded-lg
            shadow-lg
            flex
            InfoBlockWrapper
            gap-5
            md:flex-row
            flex-col
        '
    >
        
        {/* Label and Info */}
        <Flex className='gap-3 min-w-0 flex-col'>

            <h1>
                Booking ID: {reservationItem.bookingid}
            </h1>

            <h1>
                Name: {reservationItem.name}
            </h1>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Email: {reservationItem.email}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Phone Number: {reservationItem.phonenumber}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Location: {location}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Reservation Date: {reservationItem.reservationdate}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Reservation Time: {reservationItem.reservationtime}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Num. Guests: {reservationItem.numguests}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Special Requests: {reservationItem.specialrequests}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Date Submitted: {reservationItem.datetime}
                </h1>

            </div>


            
            

        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end gap-3'>

            {mark && (
            
                <Button className='rounded-lg editButton' style={{background:'#4BB543'}} onClick={() => markComplete(reservationItem)}>
                    Mark complete
                </Button>

            )}

            {!mark && (

                <Button className='rounded-lg editButton' onClick={() => markNew(reservationItem)}>
                    Mark new
                </Button>

            )}
            
            <Button className='rounded-lg editButton' onClick={() => {setReservationItem(reservationItem); setShowEdit(true)}}>
                Edit
            </Button>

            <Button className='rounded-lg editButton' style={{background:'red'}} onClick={() => {setShowDelete(true); setReservationItem(reservationItem)}}>
                Delete
            </Button>

            

            

            


        </Flex>

        
    </div>
  )
}

export default ReservationBlock
