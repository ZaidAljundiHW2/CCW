import React, { useEffect } from 'react'
import { Flex, Input, Textarea, Field, Button } from '@chakra-ui/react'
import { IoIosCloseCircle } from "react-icons/io";
import { motion, AnimatePresence } from 'motion/react';
import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"
import { useState } from 'react';
import { FaRegPaperPlane } from "react-icons/fa6";
import { NativeSelect } from "@chakra-ui/react"
import { select } from 'motion/react-client';

const BookingEdit = ({selectedReservation, setShowEdit}) => {

    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const nextMonthFormatted = nextMonth.toISOString().split("T")[0];    
    const API = 'http://localhost:5000';
    
        
    const [name, setName] = useState(selectedReservation.name);
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [email, setEmail] = useState(selectedReservation.email);
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(""); 

    const [phoneNumber, setPhoneNumber] = useState(selectedReservation.phonenumber);
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

    const [date, setDate] = useState(selectedReservation.reservationdate);
    const [isDateError, setIsDateError] = useState(false);
    const [dateErrorMessage, setDateErrorMessage] = useState("");

    const [numGuests, setNumGuests] = useState(selectedReservation.numguests);
    const [isNumGuestsError, SetIsNumGuestsError] = useState(false);
    const [numGuestsErrorMessage, setNumGuestsErrorMessage] = useState("");

    const [specialRequests, setSpecialRequests] = useState(selectedReservation.specialrequests);
    const [isSpecialRequestsError, setIsSpecialRequestsError] = useState(false);
    const [specialRequestsErrorMessage, setSpecialRequestsErrorMessage] = useState("");
    const normalizeTime = (str) => str.replace(/\s/g, " "); // collapse any whitespace variant to a plain space

    const [time, setTime] = useState(normalizeTime(selectedReservation.reservationtime ?? ""));
    const [isTimeError, setIsTimeError] = useState(false);
    const [timeErrorMessage, setTimeErrorMessage] = useState("");

    const [location, setLocation] = useState("");
    const [isLocationError, setIsLocationError] = useState(false);
    const [locationErrorMessage, setLocationErrorMessage] = useState("");

    const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);

    const [locations, setLocations] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const getLocations = async() => {

        try {

            const response = await fetch(API + '/locations');
            const jsonData = await response.json();

            setLocations(jsonData);

            console.log(jsonData);

            const selectedLocation = jsonData.find(item => item.locationid === selectedReservation.locationid);

            setLocation(selectedLocation);

            
        } catch (error) {
            console.error(error);
        }
    }



    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneValRegex = /^(\+1\s?)?(\(?[2-9]\d{2}\)?)[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;
    
    useEffect(() => {

    const load = async() => {
        await getLocations();
        setIsLoading(false);
    }

    load();

    },[])


    const generateTimes = (open, close, is24hrs) => {
        const times = [];

        if (is24hrs) {
            let start = new Date(`2000-01-01T00:00:00`);
            const end = new Date(`2000-01-02T00:00:00`);

            while (start < end) {
                times.push(
                    start.toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit'
                    })
                );
                start.setMinutes(start.getMinutes() + 30);
            }

            return times;
        }

        let start = new Date(`2000-01-01T${open}`);
        let end = new Date(`2000-01-01T${close}`);

        // Overnight range (e.g. opens 6 AM, closes 2 AM the next day)
        if (end <= start) {
            end.setDate(end.getDate() + 1);
        }

        // remove last hour from closing time
        end.setHours(end.getHours() - 1);

        while (start <= end) {
            times.push(
                start.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit'
                })
            );

            start.setMinutes(start.getMinutes() + 30);
        }

        return times;
    };

    const dayNameToNumber = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };

    const isDateUnavailable = (date) => {
        if (!location || !location.closeddays) return false;

        const dayOfWeek = date.toDate("UTC").getDay();

        return location.closeddays.some(
            (day) => dayNameToNumber[day] === dayOfWeek
        );
    };

    if (isLoading) {
        return (
            <p style={{color:'black'}}>Loading...</p>
        )
    }

    const updateBooking = async(name, email, phoneNumber, date, numGuests, specialRequests, location, time) => {

        try {

            let end = false;
          
            if (name.trim().length === 0) {

                setIsNameError(true);
                setNameErrorMessage("Input a value");
                end = true;

            }

            else {
                setIsNameError(false);
                setNameErrorMessage("");
            }

            if (email.trim().length === 0) {

                setIsEmailError(true);
                setEmailErrorMessage("Input a value");
                end = true;
            }

            else if (!emailRegex.test(email)) {
                setIsEmailError(true);
                setEmailErrorMessage("Enter a valid email address.");
                end = true;
            }

            else {
                setIsEmailError(false);
                setEmailErrorMessage("");
            }

            if (!phoneRegex.test(phoneNumber) && phoneNumber.trim().length > 0) {
                setIsPhoneNumberError(true);
                setPhoneNumberErrorMessage("Enter a valid phone number.");
                end = true;
            }

            else if (phoneNumber.trim().length === 0) {

                setIsPhoneNumberError(true);
                setPhoneNumberErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsPhoneNumberError(false);
                setPhoneNumberErrorMessage("");
            }

            if (date.trim().length === 0) {

                setIsDateError(true);
                setDateErrorMessage("Input a value");
                end = true;

            }

            else {
                setIsDateError(false);
                setDateErrorMessage("");
            }

            if (location === "") {

                setIsLocationError(true);
                setLocationErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsLocationError(false);
                setLocationErrorMessage("");
            }

            if (time === "") {

                setIsTimeError(true);
                setTimeErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsTimeError(false);
                setTimeErrorMessage("");
            }

            if (end) return;

            const locationid = location.locationid;

            const body = {
                "name": name,
                "email": email,
                "phonenumber": phoneNumber,
                "reservationdate": date,
                "numguests": numGuests,
                "specialrequests": specialRequests,
                "reservationtime":time,
                "locationid": locationid,
                "datetime": selectedReservation.datetime,
                "status": selectedReservation.status    
            }

            const response = await fetch(API + `/admin/CMS/bookings/${selectedReservation.bookingid}`, {

                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });


            if (response.ok) {
                setShowEdit(false);
            }
            
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
                rounded-lg
                shadow-lg
                GDWrapper
                bg-white
                justify-center
                flex-col
                text-center
                gap-3
            '

            style={{
                transform:'translate(-50%,-50%)'
            }}
        >

            <h1 className='CMSHead'>
                Edit Reservation
            </h1>

            <h1 className='editText'>
                Booking ID: {selectedReservation.bookingid}
            </h1>

            <form className='flex gap-3 flex-col'>
                  
                <Flex
                    className='landscape:gap-5 gap-2' 
                >

                    {/* Name */}
                    <Field.Root invalid={isNameError} className='w-full' required>
                        <Field.Label className='editText'>Name<Field.RequiredIndicator /></Field.Label>
                        
                        <Input
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value.slice(0, 255))}
                            style={{ color: 'black', background:'white'}}
                            maxLength={255}
                            className='CFText'
                            
                        />
                            

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {nameErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>
                    
                    {/* Email */}
                    <Field.Root invalid={isEmailError} className='w-full' required>
                        <Field.Label className='editText'>Email<Field.RequiredIndicator /></Field.Label>
                        
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value.slice(0, 255))}
                            style={{ color: 'black', background:'white'}}

                            maxLength={255}
                            className='CFText'
                            type='email'
                        />
                            

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {emailErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                </Flex>
                
                {/* Phone Number */}
                <Field.Root invalid={isPhoneNumberError} required className='w-full'>
                    <Field.Label className='editText'>Phone Number<Field.RequiredIndicator /></Field.Label>
                    
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.currentTarget.value.slice(0, 255))}
                        style={{ color: 'black', background:'white'}}
                        maxLength={255}
                        className='CFText'
                        type='tel'
                        
                    />
                        

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {phoneNumberErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                <Flex
                    className='landscape:flex-row flex-col gap-5' 
                >
                    {/* Date */}
                    <Field.Root invalid={isDateError} className='w-full' required>
                        <Field.Label className='editText'>Date <Field.RequiredIndicator /></Field.Label>
                        
                        <DatePicker.Root
                            min={parseDate(today)}
                            max={parseDate(nextMonthFormatted)}
                            className='CFText'
                            isDateUnavailable={isDateUnavailable}
                            
                            onValueChange={(e) => {
                                setDate(e.value[0].toString());
                            }}  
                            defaultValue={[parseDate(selectedReservation.reservationdate)]}
                            style={{ color: 'black', background:'white'}}
                            value={date ? [parseDate(date)] : []}
                            
                
                        >
                        <DatePicker.Control>
                            <DatePicker.Input readOnly color={'black'} />
                            <DatePicker.IndicatorGroup>
                            <DatePicker.Trigger>
                                <LuCalendar />
                            </DatePicker.Trigger>
                            </DatePicker.IndicatorGroup>
                        </DatePicker.Control>
                        <Portal>
                            <DatePicker.Positioner>
                            <DatePicker.Content>
                                <DatePicker.View view="day">
                                <DatePicker.Header />
                                <DatePicker.DayTable />
                                </DatePicker.View>
                                <DatePicker.View view="month">
                                <DatePicker.Header />
                                <DatePicker.MonthTable />
                                </DatePicker.View>
                                <DatePicker.View view="year">
                                <DatePicker.Header />
                                <DatePicker.YearTable />
                                </DatePicker.View>
                            </DatePicker.Content>
                            </DatePicker.Positioner>
                        </Portal>
                        </DatePicker.Root>
                            

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {dateErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* NumGuests */}
                    <Field.Root invalid={isNumGuestsError} className='w-full' required>
                        <Field.Label className='editText'>Number of Guests <Field.RequiredIndicator /></Field.Label>
                        
                        <Input
                            value={numGuests}
                            onChange={(e) => {
                                let value = Number(e.currentTarget.value);

                                if (value > 20) {
                                    value = 20;
                                }

                                if (value < 1) {
                                    value = 1;
                                }

                                setNumGuests(value);
                            }}
                            style={{ color: 'black', background:'white'}}
                            className='CFText'
                            type='number'
                            min={1}
                            max={20}
                            
                        />  

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {numGuestsErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>


                </Flex>
                
            
                <Flex
                    className='landscape:flex-row flex-col gap-5' 
                > 
                    {/* Location */}
                    <Field.Root invalid={isLocationError} className='w-full' required>
                        <Field.Label className='editText'>Location <Field.RequiredIndicator /></Field.Label>
                        
                            <NativeSelect.Root>
                                <NativeSelect.Field 
                                    value={locations.findIndex(loc => loc.locationid === location?.locationid)}
                                    color="black"
                                    bg="white"
                                    onChange={(e) => {
                                        
                                        const value = locations[e.target.value];
                                        setLocation(value);
                                        setTime("");
                                        setDate("");
                                    }}
                                >

                                    <option value={""} style={{color:'black', background:'white'}}>
                                        Select a branch
                                    </option>

                                    {locations.map((location, i) => (
                                        <option value={i} key={i}
                                            style={{
                                                color: "black",
                                                backgroundColor: "white"
                                            }}
                                        >
                                            {location.locationname}
                                        </option>
                                    ))}
                                    
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                            

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {locationErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Time */}
                    <Field.Root invalid={isTimeError} className='w-full' required disabled={location === ""}>
                        <Field.Label className='editText'> Time <Field.RequiredIndicator /></Field.Label>
                        
                            
                            <NativeSelect.Root>
                                <NativeSelect.Field
                                    color="black"
                                    bg="white"
                                    value={time}
                                    onChange={(e) => {setTime(e.target.value)}}
                                >
                                    <option 
                                        value="" 
                                        style={{ color: 'black', background:'white'}}
                                        
                                    >
                                        Select a time
                                    </option>

                                    {location && generateTimes(
                                        location.opentime,
                                        location.closetime,
                                        location.is24hrs
                                    ).map((timeOption) => {
                                        const normalized = normalizeTime(timeOption);
                                        return (
                                            <option key={normalized} value={normalized} style={{background:'white', color:'black'}}>
                                                {normalized}
                                            </option>
                                        );
                                    })}
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                            
                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {numGuestsErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>


                </Flex>

                {/* Special Requests */}
                <Field.Root invalid={isSpecialRequestsError} className='w-full' disabled>
                    <Field.Label className='editText'>Special Requests </Field.Label>
                    
                    <Textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.currentTarget.value.slice(0, 255))}
                        style={{ color: 'black', height:'100px', background:'white'}}
                        maxLength={800}
                        className='CFText'
                        
                    />  

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {specialRequestsErrorMessage}
                    </Field.ErrorText>
                </Field.Root>


                <Flex className='gap-2 justify-end'>

                    <Button className='editButton' color={'white'} onClick={() => updateBooking(name, email, phoneNumber, date, numGuests, specialRequests, location, time)}>
                        Update Reservation
                    </Button>

                    <Button bg={'red'} color={'white'} onClick={() => setShowEdit(false)}>
                        Cancel
                    </Button>

                </Flex>
                

            </form>

            
            

        </Flex>
      
    </div>
  )
}

export default BookingEdit