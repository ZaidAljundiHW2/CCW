import React from 'react'
import './GeneralDetails.css'
import { Flex } from '@chakra-ui/react'
import '../CMS.css'
import InfoBlock from '../InfoBlock'
import { useEffect, useState } from 'react'
import EditGenDet from './EditGenDet'

const GeneralDetails = () => {

    const API = 'http://localhost:5000'

    const [socialMediaObjs, setSocialMediaObjs] = useState([]);
    const [footeritems, setFooterItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedObj, setEditedObj] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const [legal, setLegal] = useState();
    const [isLegal, setIsLegal] = useState(false);

    const getSocialMedia = async () => {

        try {

            const res = await fetch(API + '/admin/CMS/general-details/social-media');
            const socialmediaitems = await res.json();

            setSocialMediaObjs(socialmediaitems);
            
        } catch (error) {
            console.error(error);
        }

        

    };

    const getFooterItems = async () => {

        try {

            const res = await fetch(API + '/admin/CMS/general-details/footer');
            const items = await res.json();

            setFooterItems(items);
            
        } catch (error) {
            console.error(error);
        }

        

    }

    const getLegal = async() => {

        try {
            const res = await fetch(API + '/admin/CMS/general-details/legal');
            const items = await res.json();

            setLegal(items);
            
        } catch (error) {
            console.error(error);
        }

        



    }

    const fetchAll = async () => {

        await getSocialMedia();
        await getFooterItems();
        await getLegal();
    }


    useEffect(()=> {

        const load = async () => {

            await fetchAll();

            setIsLoading(false);

            
        };

        load();

    },[]);

  return (
    <div
        className='
            w-full
            h-full
            GDWrapperC
            flex
            flex-col
            bg-white
        '
    >

        <h1 className='CMSHead'>General Details</h1>

        {/* Social Media */}
        <Flex 
            className='
                GDWrapper 
                rounded-lg 
                shadow-lg
                flex-col
            '
        >

            <h1 className='CMSHead'>
                Social Media Links
            </h1>

            {(

                isLoading ? (
                    <p style={{color:'black'}}>Loading...</p>
                )

                :

                (
                    <div>
                        {socialMediaObjs.map((item,i) => (

                            <InfoBlock 
                                key={i} 
                                setShowEdit={setShowEdit}
                                setEditedObj={setEditedObj}
                                item={item}
                            />
                        ))}
                    </div>
                )

            )}

            

        </Flex>

        {/* Footer Details */}
        <Flex 
            className='
                GDWrapper 
                rounded-lg 
                shadow-lg
                flex-col
            '
        >

            <h1 className='CMSHead'>
                Footer Information
            </h1>

            {(

                isLoading ? (
                    <p style={{color:'black'}}>Loading...</p>
                )

                :

                (
                    <div>
                        {footeritems.map((item,i) => (

                            <InfoBlock 
                                item={item} 
                                key={i}
                                setShowEdit={setShowEdit}
                                setEditedObj={setEditedObj}
                            
                            />
                        ))}
                    </div>
                )

            )}
            

        </Flex>

        {/* Legal Information */}
        <Flex 
            className='
                GDWrapper 
                rounded-lg 
                shadow-lg
                flex-col
            '
        >

            <h1 className='CMSHead'>
                Legal Information
            </h1>

            {(

                isLoading ? (
                    <p style={{color:'black'}}>Loading...</p>
                )

                :

                (
                    <div>
                        {legal.map((item,i) => (

                            <InfoBlock 
                                key={i} 
                                setShowEdit={setShowEdit}
                                setEditedObj={setEditedObj}
                                item={item}
                            />
                        ))}
                    </div>
                )

            )}

            

        </Flex>

        {/* Logo */}
        {/* <Flex 
            className='
                GDWrapper 
                rounded-lg 
                shadow-lg
                flex-col
            '
        >

            <h1 className='CMSHead'>
                Logo
            </h1>

            <InfoBlock label={'Logo'} curr={'asdjak'}/>
            
            

        </Flex> */}

        {showEdit && 
            (<EditGenDet 
                editedItem={editedObj} 
                setShowEdit={setShowEdit} 
                fetchAll={fetchAll}
            />)}
      
    </div>
  )
}

export default GeneralDetails
