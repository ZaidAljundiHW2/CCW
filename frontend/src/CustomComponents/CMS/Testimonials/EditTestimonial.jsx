import { Flex, Field, Input, Span, Button, Textarea, NativeSelect } from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import DeleteTestimonial from './DeleteTestimonial';

const EditTestimonial = ({testimonial, setShowEdit}) => {

    const [inputName, setInputName] = useState(testimonial.username);
    const [isNameError, setIsNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");

    const [inputTestimonial, setInputTestimonial] = useState(testimonial.testimonial);
    const [isTestimonialError, setIsTestimonialError] = useState(false);
    const [testimonialErrorMessage, setTestimonialErrorMessage] = useState("");

    const [isImgError, setIsImgError] = useState(false);
    const [imgErrorMessage, setImgErrorMessage] = useState("");

    const [rating, setRating] = useState(Number(testimonial.rating).toFixed(1));
    const [isRatingError, setIsRatingError] = useState(false);
    const [ratingErrorMessage, setRatingErrorMessage] = useState("");

    const [showDeleteConf, setShowDeleteConf] = useState(false);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});

    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileImg, setFileImg] = useState();

    const [buttonLoading, setButtonLoading] = useState(false);

    // Rating options from 0 to 5 in steps of 0.5
    const ratingOptions = [];
    for (let i = 0; i <= 5; i += 0.5) {
        ratingOptions.push(i.toFixed(1));
    }

    const handleSelectFile = (e) => {
        const selected = e.target.files[0];
        if (fileImg) URL.revokeObjectURL(fileImg);
        setFile(selected);
        setIsFileChosen(true);
        setFileImg(URL.createObjectURL(selected));
    };

    const handleUpload = async (testimonialid, currImgURL) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append("my_file", file);
            data.append("curr_image", currImgURL);
            data.append("folder", "testimonials");
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/upload/testimonials/${testimonialid}`, data);
            setRes(res.data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (item) => {

        try {

            setButtonLoading(true);

            let end = false;

            if (inputName.trim().length == 0) {
                setIsNameError(true);
                setNameErrorMessage("Input a value");
                end = true;
            }

            if (inputTestimonial.trim().length == 0) {
                setIsTestimonialError(true);
                setTestimonialErrorMessage("Input a value");
                end = true;
            }

            if (end) {
                setButtonLoading(false);
                return;
            }

            const testimonialid = item.testimonialid;

            const body = {

                "username": inputName,
                "testimonial": inputTestimonial,
                "image": item.image,
                "rating": rating
            }
            
            console.log("C");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/testimonials/update-testimonial/${testimonialid}`, {

                method:"PUT",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            console.log("k");

            console.log(response);
            

            if (file !== null) {
                await handleUpload(testimonialid, item.image);

            }

            setShowEdit(false);

        } catch (error) {
            console.error(error);
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
                Edit Testimonial
            </h1>

            <h1 className='editText'>

                {testimonial.username}
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

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {imgErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                {/* Rating */}
                <Field.Root invalid={isRatingError} className='w-full'>
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

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {ratingErrorMessage}
                    </Field.ErrorText>
                </Field.Root>



            </form>

            <Flex>

                <Button className='editButton'
                    style={{background:'red'}}
                    onClick={() => setShowDeleteConf(true)}>
                    Delete
                </Button>


            </Flex>

            <Flex className='justify-end gap-3'>

                <Button className='editButton'
                    style={{background:'#0076df'}}
                    onClick={() => handleUpdate(testimonial)}
                    loading={buttonLoading}
                >
                    Update
                </Button>

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowEdit(false)}>
                    Cancel
                </Button>
            </Flex>

        </Flex>

        {showDeleteConf && (<DeleteTestimonial setShowDelete={setShowDeleteConf} item={testimonial} setShowEdit={setShowEdit} />)}

    </div>
  )
}

export default EditTestimonial