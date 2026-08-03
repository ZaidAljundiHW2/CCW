import ExistingLocation from './LocationsComponents/ExistingLocation'
import ComingSoon from './LocationsComponents/ComingSoon'
import { useState, useEffect } from 'react'
import OtherLocations from './LocationsComponents/OtherLocations'
import './Locations.css'
import SEO from '@/SEO'

const Locations = () => {


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

    <>

      <SEO title={"Captain's Crab | Locations"} description={"Looking for a specific Captain's Crab branch near you? Check out all of our locations and stay tuned for upcoming locations we plan to open."}/>

      <div className='locationswrapper'>

          <section data-navbar-theme="light">
            <ExistingLocation locationitem={locations.find(item => item.ismainbranch == true)}/>
          </section>

          <section data-navbar-theme="dark">
            {locations.filter(item => item.ismainbranch == false) && (<OtherLocations items={locations.filter(item => item.ismainbranch == false)} />)}
          </section>

          <section data-navbar-theme="light">
            {(comingSoonItems.length > 0) && (<ComingSoon locations={comingSoonItems}/>)}
          </section>
        
      </div>
    </>
    
  )
}

export default Locations
