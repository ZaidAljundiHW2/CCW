import React from 'react'
import ExistingLocation from './LocationsComponents/ExistingLocation'
import ComingSoon from './LocationsComponents/ComingSoon'
import { useState, useEffect } from 'react'
import OtherLocations from './LocationsComponents/OtherLocations'
import './Locations.css'

const Locations = () => {


  const API = import.meta.env.VITE_API_URL;

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLocations = async() => {

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`);
      const jsonData = await response.json();

      setLocations(jsonData);
      
    } catch (error) {

      console.error(error);
      
    }
  }

  const [comingSoonItems, setComingSoonItems] = useState([]);

  const getCS = async() => {

        try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/coming-soon`);
        const jsonData = await response.json();

        setComingSoonItems(jsonData);
        
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {

    const load = async() => {

      await getLocations();
      await getCS();
      setIsLoading(false);
    }

    load();

  },[])

  if (isLoading) {
    return (
      <p style={{color:'black'}}>Loading...</p>
    )
  }

  return (
    <div className='locationswrapper'>

        <ExistingLocation locationitem={locations.find(item => item.ismainbranch == true)}/>

        {locations.filter(item => item.ismainbranch == false) && (<OtherLocations items={locations.filter(item => item.ismainbranch == false)} />)}

        {(comingSoonItems.length > 0) && (<ComingSoon locations={comingSoonItems}/>)}

      
    </div>
  )
}

export default Locations
