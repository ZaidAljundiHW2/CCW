import InfoBlock from '../InfoBlock'
import { useState, useEffect } from 'react';
import EditAbout from './EditAbout';

const AboutCMS = () => {

    const [aboutItems, setAboutItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAboutEdit, SetShowAboutEdit] = useState(false);
    const [currAboutItem, setCurrAboutItem] = useState();
    const [isError, setIsError] = useState(false);


    const getAbout = async() => {

        try {
            

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/about`, {
                method:"GET",
                credentials:'include',
            });


            if (!response.ok) {
                setIsError(true);
                return;
            }


            const jsonData = await response.json();
            setAboutItems(jsonData);
            setIsError(false);


            
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {

        const load = async() => {

            await getAbout();
            setIsLoading(false);
        }

        load();

    }, [showAboutEdit]);

  return (
    <div
        className='
            w-full
            h-screen
            GDWrapperC
            flex
            flex-col
            bg-white
        '
    >

        <h1 className='CMSHead'>
            About
        </h1>

        {isError && (
            <p style={{color:'black'}}>Something went wrong loading the About content. Please try again later.</p>
        )}

        {(

            isLoading ? (
                <p style={{color:'black'}}>Loading...</p>
            )

            :

            (
                <div className='w-full'>
                    <InfoBlock 
                        label={aboutItems[0].aboutsection} 
                        val={aboutItems[0].aboutcontent} 
                        key={aboutItems[0].aboutid} 
                        edit={true}
                        setEditedObj={setCurrAboutItem}
                        item={aboutItems[0]}
                        setShowEdit={SetShowAboutEdit}
                    />
                </div>
            )

        )}

        {(

            isLoading ? (
                <p style={{color:'black'}}>Loading...</p>
            )

            :

            (
                <div className='w-full'>
                    <InfoBlock 
                        label={aboutItems[1].aboutsection} 
                        val={aboutItems[1].aboutcontent} 
                        key={aboutItems[1].aboutid} 
                        edit={true}
                        setEditedObj={setCurrAboutItem}
                        item={aboutItems[1]}
                        setShowEdit={SetShowAboutEdit}
                    />
                </div>
            )

        )}

        
        
        {!isLoading && showAboutEdit && (<EditAbout SetShowAboutEdit={SetShowAboutEdit} aboutitem={currAboutItem}/>)}
    </div>
  )
}

export default AboutCMS
