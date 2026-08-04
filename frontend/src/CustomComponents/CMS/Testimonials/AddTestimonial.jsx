import { Flex, Field, Button, Input, Span, Textarea, NativeSelect } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'

const AddTestimonial = ({ setShowAdd }) => {

    const [inputName, setInputName] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [inputTestimonial, setInputTestimonial] = useState("");
    const [isTestimonialError, setIsTestimonialError] = useState(false);
    const [testimonialErrorMessage, setTestimonialErrorMessage] = useState("");

    const [rating, setRating] = useState("5.0");
    

    const [file, setFile] = useState(null);
    

    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileImg, setFileImg] = useState();

    const [buttonLoading, setButtonLoading] = useState(false);

    // Rating options from 0 to 5 in steps of 0.5
    const ratingOptions = [];
    for (let i = 0; i <= 5; i += 0.5) {
        ratingOptions.push(i.toFixed(1));
    }

    const placeholderImgsrc = 'https://res.cloudinary.com/pyitrlll/image/upload/v1785008926/placeholder_yyqeqs.jpg';

    const handleSelectFile = (e) => {
        const selected = e.target.files[0];
        if (fileImg) URL.revokeObjectURL(fileImg);
        setFile(selected);
        setIsFileChosen(true);
        setFileImg(URL.createObjectURL(selected));
    };

    const handleUpload = async (testimonialid) => {
        try {
            const data = new FormData();
            data.append("my_file", file);
            data.append("folder", "testimonials");
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/upload/testimonials/${testimonialid}`, data, { withCredentials: true });
        } catch (error) {
            alert(error.message);
        } 
    };

    const addTestimonial = async (username, testimonialText, testimonialImg, testimonialRating) => {

        try {

            setButtonLoading(true);

            let end = false;

            if (username.trim().length == 0) {
                setIsNameError(true);
                setNameErrorMessage("Input a value");
                end = true;
            }

            if (testimonialText.trim().length == 0) {
                setIsTestimonialError(true);
                setTestimonialErrorMessage("Input a value");
                end = true;
            }

            if (end) {
                setButtonLoading(false);
                return;
            }

            const body = {

                "username": username,
                "testimonial": testimonialText,
                "image": testimonialImg,
                "rating": testimonialRating
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/testimonials`, {

                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });

            const newTestimonial = await response.json();

            const testimonialid = newTestimonial.testimonialid;

            if (file !== null) {
                await handleUpload(testimonialid);
            }

            setShowAdd(false);

        } catch (error) {
            console.error(error);
        } finally {
            setButtonLoading(false);
        }

    }

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
                portrait:w-[90%]
            '

            style={{
                transform:'translate(-50%,-50%)',
                overflowY:'scroll'
            }}
        >

            <h1 className='CMSHead'>
                Add Testimonial
            </h1>

            <form className='w-full flex gap-5 flex-col'>

                {/* Name */}
                <Field.Root invalid={isNameError} className='w-full'>
                    <Field.Label className='editText'>Username</Field.Label>

                    <div className="relative w-full">
                        <Input
                            value={inputName}
                            onChange={(e) => setInputName(e.currentTarget.value.slice(0, 100))}
                            placeholder="New name"
                            style={{ color: 'black', paddingRight: '4.5rem' }}
                            maxLength={100}
                            className="w-full"
                        />
                        <Span
                            color="fg.muted"
                            textStyle="xs"
                            className="absolute right-3 top-1/2"
                            style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                        >
                            {inputName.length}/100
                        </Span>
                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {nameErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Testimonial */}
                <Field.Root invalid={isTestimonialError} className='w-full'>
                    <Field.Label className='editText'>Testimonial</Field.Label>

                    <div className="relative w-full">
                        <Textarea
                            value={inputTestimonial}
                            onChange={(e) => setInputTestimonial(e.currentTarget.value)}
                            placeholder="New testimonial"
                            style={{ color: 'black', paddingRight: '4.5rem' }}
                            className="w-full"
                        />

                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {testimonialErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Image */}
                <Field.Root className='w-full'>
                    <Field.Label className='editText'>Testimonial Image</Field.Label>

                        <div className="App">
                            <label htmlFor="file">

                                <Button as='span' style={{color:'black', borderWidth:'2px', borderColor:'black'}}>
                                    {" "}
                                    Select File
                                </Button>

                            </label>
                            {file && isFileChosen && <center style={{color:'black'}}> {file.name}</center>}
                            {file && isFileChosen && (
                                <img src={fileImg}/>
                            )}
                            <input
                                id="file"
                                type="file"
                                onChange={handleSelectFile}
                                multiple={false}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />

                        </div>

                    
                </Field.Root>

                {/* Rating */}
                <Field.Root className='w-full'>
                    <Field.Label className='editText'>Rating</Field.Label>

                    <NativeSelect.Root size="sm" width="320px">
                        <NativeSelect.Field
                            value={rating}
                            onChange={(e) => setRating(e.currentTarget.value)}
                            style={{ color: 'black' }}
                        >
                            {ratingOptions.map((val) => (
                                <option key={val} value={val} style={{background:'white', color:'black'}}>
                                    {val}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>

                    
                </Field.Root>

            </form>

            <Flex className='justify-end gap-3'>

                <Button className='editButton'
                    style={{background:'#4BB543'}}
                    loading={buttonLoading}
                    onClick={() => addTestimonial(inputName, inputTestimonial, placeholderImgsrc, rating)}
                >
                    Add
                </Button>

                <Button className='editButton' style={{background:'red', color:'white'}} onClick={() => setShowAdd(false)}>
                    Cancel
                </Button>
            </Flex>

        </Flex>

    </div>
  )
}

export default AddTestimonial