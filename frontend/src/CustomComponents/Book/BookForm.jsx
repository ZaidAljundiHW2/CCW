import React, { useEffect } from 'react'
import { Flex, Input, Textarea, Field, Button } from '@chakra-ui/react'
import { IoIosCloseCircle } from "react-icons/io";
import { motion, AnimatePresence } from 'motion/react';
import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"
import { useState } from 'react';
import { FaRegPaperPlane } from "react-icons/fa6";
import Thank from '../Contact/Thank';
import { NativeSelect } from "@chakra-ui/react"

const BookForm = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const nextMonthFormatted = nextMonth.toISOString().split("T")[0];

  const API = 'http://localhost:5000';
  
      
  const [name, setName] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(""); 

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  const [date, setDate] = useState("");
  const [isDateError, setIsDateError] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("");

  const [numGuests, setNumGuests] = useState(1);
  const [isNumGuestsError, SetIsNumGuestsError] = useState(false);
  const [numGuestsErrorMessage, setNumGuestsErrorMessage] = useState("");

  const [specialRequests, setSpecialRequests] = useState("");
  const [isSpecialRequestsError, setIsSpecialRequestsError] = useState(false);
  const [specialRequestsErrorMessage, setSpecialRequestsErrorMessage] = useState("");

  const [time, setTime] = useState("");
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

  const uploadBooking = async(name, email, phonenumber, date, numguests, requests, location, time) => {

      try {

          const locationid = location.locationid;

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

          if (!phoneRegex.test(phonenumber) && phonenumber.trim().length > 0) {
              setIsPhoneNumberError(true);
              setPhoneNumberErrorMessage("Enter a valid phone number.");
              end = true;
          }

          else if (phonenumber.trim().length === 0) {

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

          const now = new Date();


          const body = {
              "name": name,
              "email": email,
              "phonenumber": phonenumber,
              "date": date,
              "numguests": numguests,
              "specialrequests": requests,
              "status": 'new',
              "datetime": now.toLocaleString(),
              "locationid": locationid,
              "reservationtime": time
          }

          const response = await fetch(API + '/admin/booking', {

              method:"POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
          });



          if(response.ok){


              setIsNameError(false);
              setIsEmailError(false);
              setIsPhoneNumberError(false);
              setIsDateError(false);
              setIsSpecialRequestsError(false);
              setIsTimeError(false);
              setIsDateError(false);

              setName("");
              setEmail("");
              setPhoneNumber("");
              setDate("");
              setSpecialRequests("");
              setTime("");
              setDate("");

              setIsSuccessfulSubmission(true);

              setTimeout(() => {
                  setIsSuccessfulSubmission(false);
              },1500);
          }

          
          
      } catch (error) {
          console.error(error);
      }
      

  }

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

  return (
    <motion.div 
      className='landscape:w-full w-[90%] gap-5 rounded-lg shadow-lg flex flex-col bg-[#f2eeee]/90' 
      style={{padding:'20px'}}
      initial={{ opacity:0, x:50 }}
      animate={{ opacity:1, x:0 }}
      transition={{duration:.5, ease:'easeOut'}}
    >


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
                <Field.Root invalid={isDateError} className='w-full' required disabled={location === ""}>
                    <Field.Label className='editText'>Date <Field.RequiredIndicator /></Field.Label>
                    
                    <DatePicker.Root
                        min={parseDate(today)}
                        max={parseDate(nextMonthFormatted)}
                        className='CFText'
                        isDateUnavailable={isDateUnavailable}
                        onValueChange={(e) => {
                            setDate(e.value[0].toString());
                            console.log(e.value[0].toString());
                        }}   
                        style={{ color: 'black', background:'white'}}
                        disabled={location === ""}
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
                                ).map((timeOption) => (
                                    <option 
                                        key={timeOption}
                                        value={timeOption}
                                        style={{
                                            color:'black',
                                            background:'white'
                                        }}
                                    >
                                        {timeOption}
                                    </option>
                                ))}
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
            <Field.Root invalid={isSpecialRequestsError} className='w-full'>
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


            

            <Button bg={'#ef571b'} color={'white'} onClick={() => uploadBooking(name, email, phoneNumber, date, numGuests, specialRequests, location, time)}>
                Submit Reservation
                <FaRegPaperPlane />
            </Button>

        </form>


        <AnimatePresence>
            {isSuccessfulSubmission && (
            
                <motion.div 
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                    "
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 100}}
                    transition={{duration: 0.2, ease: "easeInOut"}}

                    style={{padding:'20px'}}
                >
                
                    <Thank />

                </motion.div>

            )}
        </AnimatePresence>

        


        

        
      
    </motion.div>
  )
}

export default BookForm