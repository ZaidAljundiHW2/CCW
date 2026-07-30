import React, { useEffect } from 'react'
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import FranchiseBlock from './FranchiseBlock';
import DeleteQuery from './DeleteQuery';

const FranchiseCMS = () => {

    const API = 'http://localhost:5000';
    
    const [newItems, setNewItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    const [franchiseItem, setFranchiseItem] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const [showDelete, setShowDelete] = useState(false);
    
    const [selectedQuery, setSelectedQuery] = useState();

    const [refresh, setRefresh] = useState(false);

    const getNewFranchiseRequests = async() => {

        try {

            const response = await fetch(API + '/admin/CMS/franchise/new');
            const jsonData = await response.json();
            setNewItems(jsonData);
            
            
        } catch (error) {
            console.error(error);
        }
    }

    const getCompletedFranchiseRequests = async() => {

        try {

            const response = await fetch(API + '/admin/CMS/franchise/complete');
            const jsonData = await response.json();
            setCompletedItems(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {

        const load = async() => {
            await getNewFranchiseRequests();
            await getCompletedFranchiseRequests();
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
                        Franchise
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
                            New Requests
                        </h1>

                        {newItems.map((item) => (

                            <FranchiseBlock 
                                mark={true}
                                franchiseItem={item}
                                key={item.franchiseid}
                                setShowDelete={setShowDelete}
                                setFranchiseItem={setFranchiseItem}
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
                            Completed Requests
                        </h1>

                        {completedItems.map((item) => (

                            <FranchiseBlock 
                                mark={false} 
                                franchiseItem={item} 
                                key={item.franchiseid}
                                setShowDelete={setShowDelete} 
                                setFranchiseItem={setFranchiseItem}
                                setRefresh={setRefresh}
                            />

                        ))}

                        
                    </Flex>

                    {showDelete && (<DeleteQuery item={franchiseItem} setShowDelete={setShowDelete}/>)}
                </div>

            )
        
        }
        
      
    </div>
  )
}

export default FranchiseCMS
