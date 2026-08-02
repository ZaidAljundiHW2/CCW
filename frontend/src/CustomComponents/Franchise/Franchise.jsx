import FranchiseHeader from './FranchiseComponents/FranchiseHeader'
import WhyCC from './FranchiseComponents/WhyCC'
import Steps from './FranchiseComponents/Steps'
import RequestFranchise from './FranchiseComponents/RequestFranchise'

const Franchise = () => {
  return (
    <div id='franchise'>

      <section data-navbar-theme="dark">
        <FranchiseHeader />
      </section>

      <section data-navbar-theme="light">
        <WhyCC />
      </section>

      <section data-navbar-theme="dark">
        <Steps />
      </section>


      
      <RequestFranchise />

    </div>
  )
}

export default Franchise
