import React from 'react'
import FranchiseHeader from './FranchiseComponents/FranchiseHeader'
import WhyCC from './FranchiseComponents/WhyCC'
import YNA from './FranchiseComponents/YNA'
import Steps from './FranchiseComponents/Steps'
import RequestFranchise from './FranchiseComponents/RequestFranchise'

const Franchise = () => {
  return (
    <div id='franchise'>


      <FranchiseHeader />

      <WhyCC />

      <YNA />

      <Steps />

      <RequestFranchise />

    </div>
  )
}

export default Franchise
