import { Flex, Field, Button, Input, Span } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'

const AddCS = ({setShowAddCS}) => {

    
    const [isNameError, setIsNameError] = useState("");
    const [inputName, setInputName] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [imgErrorMessage, setImgErrorMessage] = useState("");

    const [file, setFile] = useState(null);

    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileImg, setFileImg] = useState();

    const [isFileError, setIsFileError] = useState(false);

    const [buttonLoading, setButtonLoading] = useState(false);

    const handleSelectFile = (e) => {
        const selected = e.target.files[0];
        if (fileImg) URL.revokeObjectURL(fileImg);
        setFile(selected);
        setIsFileChosen(true);
        setFileImg(URL.createObjectURL(selected));
    };

    
    const handleUpload = async (itemid) => {
        try {
            const data = new FormData();
            data.append("my_file", file);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/comingsoon/image/${itemid}`, data);
        } catch (error) {
        alert(error.message);
        } 
    };

    const addCS = async(itemname) => {

        
        try {

            setButtonLoading(true);
            let end = false;

            if (itemname.trim().length == 0) {

                setIsNameError(true);
                setNameErrorMessage("Enter a value.");
                end = true;
            }

            if (file === null) {
                setIsFileError(true);
                setImgErrorMessage("Select an image");
                end = true;
            }

            if (end) {
                setButtonLoading(false);
                return;
            }

            const body = {

                "location": itemname,
                "imageURL": ""
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/locations/coming-soon`, {
                method:"POST",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(body)

            });

            const csitem = await response.json();

            const csid = csitem.csid;

            await handleUpload(csid);

            setShowAddCS(false);

            console.log(response);

            setShowAddCS(false);


            
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

            <h1 className='CMSHead'>
                Add Coming Soon Location 
            </h1>

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
                    style={{background:'#4BB543'}} 
                    onClick={() => addCS(inputName)}>
                    loading={buttonLoading}
                    Add
                </Button>

                <Button className='editButton' style={{background:'red'}} onClick={() => setShowAddCS(false)}>
                    Cancel
                </Button>
            </Flex>

        </Flex>
        
    </div>
  )
}

export default AddCS
