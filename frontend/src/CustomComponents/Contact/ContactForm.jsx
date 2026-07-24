import React, { useEffect } from 'react'
import { Input, Flex, Button, Textarea, Field, Span  } from '@chakra-ui/react'
import { FaRegPaperPlane } from "react-icons/fa6";
import './ContactForm.css'
import { useState } from 'react';
import Thank from './Thank';
import { motion, AnimatePresence } from 'motion/react';

const ContactForm = () => {

    const API = 'http://localhost:5000'

    
    const [name, setName] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(""); 

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
    const [phoneNumberErrorMessage, setPhoneNUmberErrorMessage] = useState("");

    const [subject, setSubject] = useState("");
    const [isSubjectError, setIsSubjectError] = useState(false);
    const [subjectErrorMessage, setSubjectErrorMessage] = useState("");

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);
    const [messageErrorMessage, setMessageErrorMessage] = useState("");

    const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneValRegex = /^(\+1\s?)?(\(?[2-9]\d{2}\)?)[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

    const uploadContact = async(name, email, phonenumber, subject, message) => {


        try {

            console.log("VVVV");

            let end = false;
            
            if (name.trim().length === 0) {

                setIsNameError(true);
                setNameErrorMessage("Input a value");
                end = true;

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

            if (!phoneRegex.test(phonenumber) && phonenumber.trim().length > 0) {
                setIsPhoneNumberError(true);
                setPhoneNUmberErrorMessage("Enter a valid phone number.");
                end = true;
            }

            if (subject.trim().length === 0) {

                setIsSubjectError(true);
                setSubjectErrorMessage("Input a value");
                end = true;

            }

            if (message.trim().length === 0) {

                setIsMessageError(true);
                setMessageErrorMessage("Input a value");
                end = true;

            }

            if (end) return;

            console.log("BBBB");

            const body = {
                "name": name,
                "email": email,
                "phonenumber": phonenumber,
                "subject": subject,
                "message": message,
                "status": 'new'
            }

            console.log("CCCC");


            const response = await fetch(API + '/admin/CMS/contact', {

                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            console.log(response);

            console.log("KKKK");


            if(response.ok){

                console.log("JJJJ");

                setIsNameError(false);
                setIsEmailError(false);
                setIsPhoneNumberError(false);
                setIsSubjectError(false);
                setIsMessageError(false);

                setName("");
                setEmail("");
                setPhoneNumber("");
                setSubject("");
                setMessage("");

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
    <div className='flex-col flex landscape:gap-5 gap-2'>

        <h1 className='CFH'>
            Send Us A Message!
        </h1>

        <form className='flex gap-3 flex-col'>

            <Flex
                className='landscape:gap-5 gap-2' 
            >

                {/* Name */}
                <Field.Root invalid={isNameError} className='w-full' required>
                    <Field.Label className='editText'>Name <Field.RequiredIndicator /></Field.Label>
                    
                    <Input
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value.slice(0, 255))}
                        style={{ color: 'black'}}
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
                    <Field.Label className='editText'> Email <Field.RequiredIndicator /></Field.Label>
                    
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value.slice(0, 255))}
                        style={{ color: 'black', paddingRight: '4.5rem' }}
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
            <Field.Root invalid={isPhoneNumberError} className='w-full'>
                <Field.Label className='editText'>Phone Number</Field.Label>
                
                <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.currentTarget.value.slice(0, 255))}
                    style={{ color: 'black'}}
                    maxLength={255}
                    className='CFText'
                    type='tel'
                    
                />
                    

                <Field.ErrorText width="full">
                    <Field.ErrorIcon />
                    {phoneNumberErrorMessage}
                </Field.ErrorText>
            </Field.Root>

            {/* Subject */}
            <Field.Root invalid={isSubjectError} className='w-full' required>
                <Field.Label className='editText'>Subject <Field.RequiredIndicator /></Field.Label>
                
                <Input
                    value={subject}
                    onChange={(e) => setSubject(e.currentTarget.value.slice(0, 255))}
                    style={{ color: 'black'}}
                    maxLength={255}
                    className='CFText'
                    
                />
                    

                <Field.ErrorText width="full">
                    <Field.ErrorIcon />
                    {subjectErrorMessage}
                </Field.ErrorText>
            </Field.Root>

            {/* Text area */}
            <Field.Root invalid={isMessageError} className='w-full' required>
                <Field.Label className='editText'>Message <Field.RequiredIndicator /></Field.Label>
                
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value.slice(0, 255))}
                    style={{ color: 'black', height:'100px'}}
                    maxLength={800}
                    className='CFText'
                    
                />  

                <Field.ErrorText width="full">
                    <Field.ErrorIcon />
                    {messageErrorMessage}
                </Field.ErrorText>
            </Field.Root>


            

            <Button bg={'#ef571b'} color={'white'} onClick={() => uploadContact(name, email, phoneNumber, subject, message)}>
                Submit
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
                    initial={{
                        opacity: 0,
                        y: 100
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        y: 100
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut"
                    }}

                    style={{
                        padding:'20px'
                    }}
                >
                
                    <Thank />

                </motion.div>

            )}
        </AnimatePresence>
        
        
      
    </div>
  )
}

export default ContactForm
