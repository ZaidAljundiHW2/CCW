import React from 'react'
import InfoBlock from '../InfoBlock'
import AddCS from './AddCS'
import EditCS from './EditCS'
import { useState } from 'react'

const LocationCMS = () => {

    const [showAddCS, setShowAddCS] = useState(false);
    const [showEditCS, setShowEditCS] = useState(false);
    const [showEditCSItem, setShowEditCSItem] = useState(false);

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
        <InfoBlock 
            label={'Main Branch Details'}
        
        />



        {showAddCS && (<AddCS setShowAddCS={setShowAddCS}/>)}

        {showEditCS && (<EditCS setShowEdit={setShowEditCS}/>)}


        
    </div>
  )
}

export default LocationCMS