import React from 'react'
import { Flex, Button, Field, Input, Span } from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import DeleteCS from './DeleteCS';

const EditCSItem = ({setShowEditCSItem, CSItem, setShowEditCS}) => {    
    
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});

    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileImg, setFileImg] = useState(CSItem.imageurl);

    const [isFileError, setIsFileError] = useState(false);

    const API = import.meta.env.VITE_API_URL;

    const [isNameError, setIsNameError] = useState("");
    const [inputName, setInputName] = useState(CSItem.location);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [imgErrorMessage, setImgErrorMessage] = useState("");

    const [showDelete, setShowDelete] = useState(false);

    const handleSelectFile = (e) => {
        const selected = e.target.files[0];
        if (fileImg) URL.revokeObjectURL(fileImg);
        setFile(selected);
        setIsFileChosen(true);
        setFileImg(URL.createObjectURL(selected));
    };

    
    const handleUpload = async (itemid, oldurl) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append("my_file", file);
            data.append("curr_image", oldurl);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/replace/comingsoon/image/${itemid}`, data);
            setRes(res.data);
        } catch (error) {
        alert(error.message);
        } finally {
        setLoading(false);
        }
    };


    const updateCS = async() => {

        try {

            if (inputName.trim().length === 0) {

                setIsNameError(true);
                setNameErrorMessage("Input a value");
                return;
            }

            const csid = CSItem.csid;
            const currimg = CSItem.imageurl;

            const body = {
                "location": inputName,                
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/locations/coming-soon/${csid}`, {
                
                method:"PUT",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify(body)
            });

            if (file !== null) {
                await handleUpload(csid, currimg);
            }

            setShowEditCSItem(false);
            setShowEditCS(false);
            
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
                portrait:w-[90%]
            '
            
            style={{
                transform:'translate(-50%,-50%)',
                overflowY:'scroll'
            }}
        >



            <form className='w-full flex gap-5 flex-col'>
            
                {/* Name */}
                <Field.Root invalid={isNameError} className='w-full'>
                    <Field.Label className='editText'>Location Name</Field.Label>
                    
                    <div className="relative w-full">
                        <Input
                            value={inputName}
                            onChange={(e) => setInputName(e.currentTarget.value.slice(0, 50))}
                            placeholder="New Location Name"
                            style={{ color: 'black', paddingRight: '4.5rem' }}
                            maxLength={50}
                            className="w-full"
                        />
                        <Span
                            color="fg.muted"
                            textStyle="xs"
                            className="absolute right-3 top-1/2"
                            style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                        >
                            {inputName.length}/50
                        </Span>
                    </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {nameErrorMessage}
                    </Field.ErrorText>
                </Field.Root>

                
                
                {/* Image */}
                <Field.Root className='w-full' invalid={isFileError}>
                    <Field.Label className='editText'>Location Image</Field.Label>
                    
                        <div className="App">
                            <label htmlFor="file">

                                <Button as='span' style={{color:'black', borderWidth:'2px', borderColor:'black'}}>
                                    {" "}
                                    Select File
                                </Button>
                                
                            </label>
                            {file && isFileChosen && <center style={{color:'black'}}> {file.name}</center>}
                            
                            <img src={fileImg}/>
                            
                            <input
                                id="file"
                                type="file"
                                onChange={handleSelectFile}
                                multiple={false}
                                style={{ display: 'none' }}
                                accept="image/png, image/jpeg" 
                            />
                            
                            {/* {file && (
                                <>
                                <button onClick={handleUpload} className="btn-green">
                                    {loading ? "uploading..." : "upload to cloudinary"}
                                </button>
                                </>
                            )} */}
                        </div>

                    <Field.ErrorText width="full">
                        <Field.ErrorIcon />
                        {imgErrorMessage}
                    </Field.ErrorText>
                </Field.Root>                
                
            </form>

            <Flex className='justify-end gap-3'>

                <Button className='editButton'  
                    onClick={() => updateCS(inputName)}>
                    Update
                </Button>

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(true)}>
                    Delete
                </Button>
            </Flex>

            <Button className='editButton' style={{background:'red', alignSelf:'end'}} onClick={() => setShowEditCSItem(false)}>
                Cancel
            </Button>



        </Flex>

        {showDelete && (<DeleteCS setShowDelete={setShowDelete} CSItem={CSItem} setShowEditCSItem={setShowEditCSItem} setShowEditCS={setShowEditCS} />)}




        
    </div>
  )
}

export default EditCSItem