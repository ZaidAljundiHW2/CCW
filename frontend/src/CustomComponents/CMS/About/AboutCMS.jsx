import React from 'react'
import InfoBlock from '../InfoBlock'
import { useState, useEffect } from 'react';
import EditAbout from './EditAbout';

const AboutCMS = () => {

    const API = 'http://localhost:5000'
    const [aboutItems, setAboutItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAboutEdit, SetShowAboutEdit] = useState(false);
    const [currAboutItem, setCurrAboutItem] = useState();

    const getAbout = async() => {

        try {
            

            const response = await fetch(API + '/admin/CMS/about', {
                method:"GET"
            });

            console.log(response);


            const jsonData = await response.json();

            
            setAboutItems(jsonData);

            
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
            h-full
            GDWrapperC
            flex
            flex-col
            bg-white
        '
    >

        <h1 className='CMSHead'>
            About
        </h1>

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
