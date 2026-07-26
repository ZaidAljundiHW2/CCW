import React from 'react'
import InfoBlock from '../InfoBlock'
import AddCS from './AddCS'
import { useState } from 'react'

const LocationCMS = () => {

    const [showAddCS, setShowAddCS] = useState(false);

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

        <InfoBlock 
            label={'Locations Coming Soon'} 
            edit={true} 
            add={true} 
            setShowAdd={setShowAddCS}
        />



        {showAddCS && (<AddCS setShowAddCS={setShowAddCS}/>)}


        
    </div>
  )
}

export default LocationCMS