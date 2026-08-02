import { useRef } from 'react'
import { Input, Flex, Button, Textarea, Field, Span  } from '@chakra-ui/react'
import { FaRegPaperPlane } from "react-icons/fa6";
import './ContactForm.css'
import { useState, useEffect } from 'react';
import Thank from './Thank';
import { motion, AnimatePresence } from 'motion/react';

const ContactForm = () => {
    
    const [name, setName] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(""); 

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

    const [subject, setSubject] = useState("");
    const [isSubjectError, setIsSubjectError] = useState(false);
    const [subjectErrorMessage, setSubjectErrorMessage] = useState("");

    const [message, setMessage] = useState("");
    const [isMessageError, setIsMessageError] = useState(false);
    const [messageErrorMessage, setMessageErrorMessage] = useState("");

    const [isSuccessfulSubmission, setIsSuccessfulSubmission] = useState(false);
    const [isSubmissionError, setIsSubmissionError] = useState(false);

    // Honeypot field — should stay empty; bots often fill every input
    const [honeypot, setHoneypot] = useState("");

    // Track when the form first rendered, to measure fill time
    const formLoadTime = useRef(null);

    useEffect(() => {
        formLoadTime.current = Date.now();
    }, []);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const phoneValRegex = /^(\+1\s?)?(\(?[2-9]\d{2}\)?)[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

    const uploadContact = async(name, email, phonenumber, subject, message) => {


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

            if (!phoneRegex.test(phonenumber) && phonenumber.trim().length > 0) {
                setIsPhoneNumberError(true);
                setPhoneNumberErrorMessage("Enter a valid phone number.");
                end = true;
            }

            else {
                setIsPhoneNumberError(false);
                setPhoneNumberErrorMessage("");
            }

            if (subject.trim().length === 0) {

                setIsSubjectError(true);
                setSubjectErrorMessage("Input a value");
                end = true;

            }

            else {
                setIsSubjectError(false);
                setSubjectErrorMessage("");
            }

            if (message.trim().length === 0) {

                setIsMessageError(true);
                setMessageErrorMessage("Input a value");
                end = true;

            }

            else {
                setIsMessageError(false);
                setMessageErrorMessage("");
            }

            if (end) return;

            const now = new Date();
            const timeTakenMs = formLoadTime.current ? Date.now() - formLoadTime.current : null;

            const body = {
                "name": name,
                "email": email,
                "phonenumber": phonenumber,
                "subject": subject,
                "message": message,
                "status": 'new',
                "datetime":now.toLocaleString(),
                "honeypot": honeypot,
                "timetaken": timeTakenMs
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/contact`, {

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
                setIsSubjectError(false);
                setIsMessageError(false);
                setIsSubmissionError(false);

                setName("");
                setEmail("");
                setPhoneNumber("");
                setSubject("");
                setMessage("");
                setHoneypot("");
                formLoadTime.current = Date.now();

                setIsSuccessfulSubmission(true);

                setTimeout(() => {
                    setIsSuccessfulSubmission(false);
                },1500);
            }

            else {
                setIsSubmissionError(true);

                setTimeout(() => {
                    setIsSubmissionError(false);
                },3000);
            }

            
            
        } catch (error) {
            console.error(error);
            setIsSubmissionError(true);

            setTimeout(() => {
                setIsSubmissionError(false);
            },3000);
        }
        

    }

    


  return (
    <div className='flex-col flex landscape:gap-5 gap-2'>

        <h1 className='CFH'>
            Send Us A Message!
        </h1>

        <form className='flex gap-3 flex-col'>

            {/* Honeypot — hidden from real users, visible to most bots */}
            <div
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden'
                }}
                aria-hidden="true"
            >
                <label htmlFor="company_website">Company Website</label>
                <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.currentTarget.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

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


            {isSubmissionError && (
                <Span color="red.500" fontSize="sm">
                    Something went wrong. Please try again.
                </Span>
            )}

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