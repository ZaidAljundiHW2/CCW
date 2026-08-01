import React, { useEffect } from 'react'
import { Flex, Input, Textarea, Field, Button } from '@chakra-ui/react'
import { IoIosCloseCircle } from "react-icons/io";
import { motion, AnimatePresence } from 'motion/react';
import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"
import { useState } from 'react';
import { FaRegPaperPlane } from "react-icons/fa6";
import Thank from '@/CustomComponents/Contact/Thank';
import { NativeSelect } from "@chakra-ui/react"

const ReqFrForm = () => {    
        
    const [name, setName] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(""); 

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

    const [specialRequests, setSpecialRequests] = useState("");
    const [isSpecialRequestsError, setIsSpecialRequestsError] = useState(false);
    const [specialRequestsErrorMessage, setSpecialRequestsErrorMessage] = useState("");

    const [investmentInterest, setInvestmentInterest] = useState("");
    const [isInvestmenetInterestError, setIsInvestmentInterestError] = useState(false);
    const [investmentErrorMessage, setInvestmentErrorMessage] = useState("");
    
    const [city, setCity] = useState("");
    const [isCityError, setIsCityError] = useState("");
    const [cityErrorMessage, setCityErrorMessage] = useState("");

    const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneValRegex = /^(\+1\s?)?(\(?[2-9]\d{2}\)?)[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

    const generateInvestmentRanges = (min, max, step) => {
        const ranges = [];

        for (let i = min; i < max; i += step) {
            const rangeStart = i;
            const rangeEnd = i + step;
            ranges.push({
                value: `${rangeStart}k-${rangeEnd}k`,
                label: `$${rangeStart}k - $${rangeEnd}k`
            });
        }

        ranges.unshift({ value: `<${min}k`, label: `Under $${min}k` });
        ranges.push({ value: `${max}k+`, label: `$${max}k+` });

        return ranges;
    };

    const uploadFranchise = async() => {

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

            if (investmentInterest.trim().length === 0) {
                setIsInvestmentInterestError(true);
                setInvestmentErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsInvestmentInterestError(false);
                setInvestmentErrorMessage("");
            }

            if (city.trim().length === 0) {
                setIsCityError(true);
                setCityErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsCityError(true);
                setCityErrorMessage("");
            }

            if (specialRequests.trim().length === 0) {
                setIsSpecialRequestsError(true);
                setSpecialRequestsErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsSpecialRequestsError(false);
                setSpecialRequestsErrorMessage("");
            }

            if (end) return;

            const now = new Date();


            const body = {

                "name":name,
                "email":email,
                "phonenumber":phoneNumber,
                "investmentinterest":investmentInterest,
                "city":city,
                "message":specialRequests,
                "datetime": now.toLocaleString(),
                "status":'new'
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/franchise`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            });


            if (response.ok) {

                setName("");
                setEmail("");
                setCity("");
                setPhoneNumber("");
                setInvestmentInterest("");
                setSpecialRequests("");

                setIsNameError(false);
                setIsEmailError(false);
                setIsCityError(false);
                setIsPhoneNumberError(false);
                setIsInvestmentInterestError(false);
                setIsSpecialRequestsError(false);

                setNameErrorMessage("");
                setEmailErrorMessage("");
                setCityErrorMessage("");
                setPhoneNumberErrorMessage("");
                setInvestmentErrorMessage("");
                setSpecialRequestsErrorMessage("");

                setIsSuccessfulSubmission(true);

                setTimeout(() => {
                    setIsSuccessfulSubmission(false);
                },1500);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <motion.div className='flex-col flex landscape:gap-5 gap-2 rounded-lg shadow-lg' style={{background:'#f2f0ef', padding:'20px'}}
        initial={{opacity:0, x:-50}}

        whileInView={{opacity:1, x:0}}

        transition={{duration:.5, ease:'easeOut', delay:.1}}
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
                        onChange={(e) => setName(e.currentTarget.value.slice(0, 100))}
                        style={{ color: 'black', background:'white'}}
                        maxLength={100}
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
            
            <Flex className='landscape:gap-5 gap-2' >

                {/* Phone Number */}
                <Field.Root invalid={isPhoneNumberError} required className='w-full'>
                    <Field.Label className='editText'>Phone Number<Field.RequiredIndicator /></Field.Label>
                    
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.currentTarget.value.slice(0, 20))}
                        style={{ color: 'black', background:'white'}}
                        maxLength={20}
                        className='CFText'
                        type='tel'
                        
                    />
                        

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {phoneNumberErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* City */}
                <Field.Root invalid={cityErrorMessage} required className='w-full'>
                    <Field.Label className='editText'>City<Field.RequiredIndicator /></Field.Label>
                    
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value.slice(0, 100))}
                        style={{ color: 'black', background:'white'}}
                        maxLength={100}
                        className='CFText'                        
                    />
                        

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {cityErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

            </Flex>
            
            
        
            
            {/* Investment Interest */}
            <Field.Root invalid={isInvestmenetInterestError} className='w-full' required>
                <Field.Label className='editText'>Investment Interest <Field.RequiredIndicator /></Field.Label>
                
                    <NativeSelect.Root>
                        <NativeSelect.Field 
                            color="black"
                            bg="white"
                            onChange={(e) => setInvestmentInterest(e.target.value)}
                            value={investmentInterest}

                        >

                            <option value={""} style={{color:'black', background:'white'}}>
                                Investment Interest
                            </option>

                            {generateInvestmentRanges(50, 250, 50).map((range) => (
                                <option
                                    key={range.value}
                                    value={range.value}
                                    style={{color:'black', background:'white'}}
                                >
                                    {range.label}
                                </option>
                            ))}

                            
                            
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    

                <Field.ErrorText width="full">
                    <Field.ErrorIcon />
                    {investmentErrorMessage}
                </Field.ErrorText>
            </Field.Root>

            



            {/* Message */}
            <Field.Root invalid={isSpecialRequestsError} required className='w-full'>
                <Field.Label className='editText'>Message <Field.RequiredIndicator /></Field.Label>
                
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


            

            <Button bg={'#ef571b'} color={'white'} onClick={() => uploadFranchise()}>
                REQUEST FRANCHISE INFO
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

export default ReqFrForm
