import React from 'react'
import ExistingLocation from './ExistingLocation'
import FutureLocations from './FutureLocations'
import ComingSoon from './ComingSoon'

const Locations = () => {
  return (
    <div style={{
        marginTop:'-5%'
    }}>

        <ExistingLocation />

        <FutureLocations />

        <ComingSoon />

      
    </div>
  )
}

export default Locations
