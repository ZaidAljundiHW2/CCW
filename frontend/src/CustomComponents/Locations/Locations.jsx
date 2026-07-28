import React from 'react'
import ExistingLocation from './LocationsComponents/ExistingLocation'
import FutureLocations from './LocationsComponents/FutureLocations'
import ComingSoon from './LocationsComponents/ComingSoon'
import { useState, useEffect } from 'react'

const Locations = () => {

  const API = import.meta.env.VITE_API_URL;

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLocations = async() => {

    try {

      const response = await fetch(API + '/locations');
      const jsonData = await response.json();

      setLocations(jsonData);
      
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

  },[])

  if (isLoading) {
    return (
      <p style={{color:'black'}}>Loading...</p>
    )
  }

  return (
    <div>

        <ExistingLocation locationitem={locations.find(item => item.ismainbranch == true)}/>

        {/* <FutureLocations /> */}

        <ComingSoon />

      
    </div>
  )
}

export default Locations
