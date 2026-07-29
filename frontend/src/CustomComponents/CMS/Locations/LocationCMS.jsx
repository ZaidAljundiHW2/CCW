import React, { useEffect } from 'react'
import InfoBlock from '../InfoBlock'
import AddCS from './AddCS'
import EditCS from './EditCS'
import { useState } from 'react'
import LocationBlock from './LocationBlock'
import EditLocation from './EditLocation'
import AddLocation from './AddLocation'
import { Flex } from '@chakra-ui/react'

const LocationCMS = () => {

    const [showAddCS, setShowAddCS] = useState(false);
    const [showEditCS, setShowEditCS] = useState(false);
    const [showEditCSItem, setShowEditCSItem] = useState(false);
    const [showEditLocation, setShowEditLocation] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const [mainBranch, setMainBranch] = useState([]);
    const [locations, setLocations] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const API = import.meta.env.VITE_API_URL;

    const getLocations = async() => {

        try {

            const response = await fetch(API + '/locations');
            const jsonData = await response.json();

            setLocations(jsonData);
            setMainBranch(jsonData.find(item => item.ismainbranch === true));
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const load = async() => {

            await getLocations();
            setIsLoading(false);
        }

        load();

    },[showEditLocation, showAddCS, showEditCS, showAdd])

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
            Locations
        </h1>

        {/* coming soon locations */}
        <InfoBlock 
            label={'Locations Coming Soon'} 
            edit={true} 
            add={true} 
            setShowAdd={setShowAddCS}
            setShowEdit={setShowEditCS}
        />


        {/* main branch details */}
        <h1 className='CMSHead'>
            Main branch details:
        </h1>

        {isLoading ? (

                <p style={{color:'black'}}>Loading...</p>

            )

            :

            
            <LocationBlock 
                item={mainBranch}
                setEditedObj={setSelectedLocation}
                setShowEdit={setShowEditLocation}

            />
        }

        <InfoBlock add={true} edit={false} setShowAdd={setShowAdd} label='Other locations:'/>

        <Flex className='rounded-lg shadow-lg flex-col'>

            {locations.filter(item => item.ismainbranch !== true).map((item,i) => (

                <LocationBlock edit={true} item={item} key={i} setShowEdit={setShowEditLocation} setEditedObj={item}/>
            ))}

        </Flex>
        



        {showAddCS && (<AddCS setShowAddCS={setShowAddCS}/>)}

        {showEditCS && (<EditCS setShowEdit={setShowEditCS}/>)}

        {showEditLocation && (<EditLocation item={selectedLocation} setShowEdit={setShowEditLocation}/>)}

        {showAdd && (<AddLocation setShowAdd={setShowAdd}/>)}
        
    </div>
  )
}

export default LocationCMS