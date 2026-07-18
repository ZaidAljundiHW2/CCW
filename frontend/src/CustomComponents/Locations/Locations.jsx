import React from 'react'
import ExistingLocation from './LocationsComponents/ExistingLocation'
import FutureLocations from './LocationsComponents/FutureLocations'
import ComingSoon from './LocationsComponents/ComingSoon'

const Locations = () => {
  return (
    <div>

        <ExistingLocation />

        {/* <FutureLocations /> */}

        <ComingSoon />

      
    </div>
  )
}

export default Locations
