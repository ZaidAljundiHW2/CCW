import React, { useEffect } from 'react'
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import ContactBlock from './ContactBlock';
import DeleteQuery from './DeleteQuery';

const ContactCMS = () => {



    const [newItems, setNewItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [showDelete, setShowDelete] = useState(false);
    
    const [selectedQuery, setSelectedQuery] = useState();

    const [refresh, setRefresh] = useState(false);

    const getNewQueries = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/contact/new`, {
                credentials:'include',
            });
            const jsonData = await response.json();
            setNewItems(jsonData);
            
            
        } catch (error) {
            console.error(error);
        }
    }

    const getCompletedQueries = async() => {

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/contact/complete`, {
                credentials:'include',
            });
            const jsonData = await response.json();
            setCompletedItems(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {

        const load = async() => {
            await getNewQueries();
            await getCompletedQueries();
            setIsLoading(false);

        }

        load();
    }, [showDelete, refresh]);

    


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

        {isLoading ? (

                <p style={{color:'black'}}>Loading...</p>

            )

            :

            (

                <div>
                    <h1 className='CMSHead'>
                        Contact
                    </h1>

                    <Flex 
                        className='
                            GDWrapper 
                            rounded-lg 
                            shadow-lg
                            flex-col
                        '
                    >

                        <h1 className='CMSHead'>
                            New Queries
                        </h1>

                        {newItems.map((item,i) => (

                            <ContactBlock 
                                mark={true}
                                key={i}
                                contactItem={item}
                                setShowDelete={setShowDelete}
                                setContactItem={setSelectedQuery}
                                setRefresh={setRefresh}
                            />

                        ))}

                        
                    </Flex>

                    <Flex 
                        className='
                            GDWrapper 
                            rounded-lg 
                            shadow-lg
                            flex-col
                        '
                    >

                        <h1 className='CMSHead'>
                            Completed Queries
                        </h1>

                        {completedItems.map((item) => (

                            <ContactBlock 
                                mark={false} 
                                contactItem={item} 
                                setShowDelete={setShowDelete} 
                                setContactItem={setSelectedQuery}
                                setRefresh={setRefresh}
                            />

                        ))}

                        
                    </Flex>

                    {showDelete && (<DeleteQuery item={selectedQuery} setShowDelete={setShowDelete}/>)}
                </div>

            )
        
        }
        
      
    </div>
  )
}

export default ContactCMS
