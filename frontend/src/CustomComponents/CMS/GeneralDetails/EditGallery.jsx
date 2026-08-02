import { Flex, SimpleGrid, Field, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteGalleryImage from './DeleteGalleryImage';

const EditGallery = ({setShowEdit}) => {


  const [images, setImages] = useState();
  
  const [isLoading, setIsLoading] = useState(true);


  const [file, setFile] = useState(null);
  const [res, setRes] = useState({});

  const [isFileChosen, setIsFileChosen] = useState(false);
  const [fileImg, setFileImg] = useState();

  const [isImgError, setIsImgError] = useState(false);
  const [imgErrorMessage, setImgErrorMessage] = useState("");

  const [showDelete, setShowDelete] = useState(false);

  const [selectedImage, setSelectedImage] = useState();

  const [buttonLoading, setButtonLoading] = useState(false);
  


  const handleUpload = async () => {
    try {

      
      setButtonLoading(true)

      if (file === null) {
        setIsImgError(true);
        setImgErrorMessage("Select an image");
        setButtonLoading(false);
        return;
      }

      setIsLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/gallery/image`, data);
      setRes(res.data);
      setShowEdit(false);
      } catch (error) {
      alert(error.message);
      } finally {
        setIsLoading(false);
    }
  };

  const handleSelectFile = (e) => {
    const selected = e.target.files[0];
    if (fileImg) URL.revokeObjectURL(fileImg);
    setFile(selected);
    setIsFileChosen(true);
    setFileImg(URL.createObjectURL(selected));
  };



  const getImages = async() => {

    try {

      


      const response = await fetch(`${import.meta.env.VITE_API_URL}/gallery`, {
        credentials:'include',
      });
      const jsonData = await response.json();

      setImages(jsonData);
      console.log("FFF");
      
    } catch (error) {
      console.error(error);
    }
  }

  

  useEffect(() => {

    const load = async() => {

      await getImages();

      setIsLoading(false);
    }

    load();

  }, []);


  return (
    <div className='fixed inset-0 bg-black/70 z-40'>
      <Flex
        className='
            absolute top-[50%] left-[50%]
            landscape:w-[50%] portrait:w-[80%]
            rounded-lg shadow-lg flex-col GDWrapper bg-white max-h-[50%] gap-5
        '
        style={{ transform: 'translate(-50%,-50%)', overflowY: 'scroll' }}
      >

        <h1 className='CMSHead'>
          Gallery Images
        </h1>

        <h1 className='editText'>
          Click on a photo to delete it.
        </h1>

        {isLoading ? (
            <p style={{color:'black'}}>Loading...</p>
          )

          :

          (
            <SimpleGrid columns={3} gap={'5'}>

              {images.map((image,i) => (

                <img 
                  src={image.url} 
                  key={i} 
                  style={{height:'100px', aspectRatio:'1/1', cursor:'pointer'}}
                  onClick={() => {setSelectedImage(image); setShowDelete(true)}}
                />
              ))}

            </SimpleGrid>
          )
      
        }

        {/* Image */}
        <Field.Root className='w-full' invalid={isImgError}>
            <Field.Label className='editText'>Gallery Image</Field.Label>
            
                <div className="App">
                    <label htmlFor="file">

                        <Button as='span' style={{color:'black', borderWidth:'2px', borderColor:'black'}}>
                            {" "}
                            Select File
                        </Button>
                        
                    </label>
                    {file && isFileChosen && <center style={{color:'black'}}> {file.name}</center>}
                    {file && isFileChosen && (
                        <img src={fileImg} style={{height:'100px', aspectRatio:'1/1'}}/>
                    )}
                    <input
                        id="file"
                        type="file"
                        onChange={handleSelectFile}
                        multiple={false}
                        style={{ display: 'none' }}
                        accept="image/*" 
                    />
                    <code>
                        {Object.keys(res).length > 0
                        ? Object.keys(res).map((key) => (
                            <p className="output-item" key={key}>
                                <span>{key}:</span>
                                <span>
                                {typeof res[key] === "object" ? "object" : res[key]}
                                </span>
                            </p>
                            ))
                        : null}
                    </code>
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
        
        <Flex className='gap-4'>

          <Button 
            className='editButton' 
            style={{background:'#4BB543', alignSelf:'start'}}
            onClick={() => handleUpload()}
            loading={buttonLoading}
          >
            Add
          </Button>

          <Button 
            className='editButton' 
            style={{background:'red', alignSelf:'start'}}
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </Button>

        </Flex>
        



        
      

      </Flex>

      {showDelete && (<DeleteGalleryImage setShowEdit={setShowEdit} setShowDelete={setShowDelete} imageobj={selectedImage}/>)}
    </div>
  )
}

export default EditGallery