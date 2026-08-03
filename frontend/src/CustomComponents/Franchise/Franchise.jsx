import FranchiseHeader from './FranchiseComponents/FranchiseHeader'
import WhyCC from './FranchiseComponents/WhyCC'
import Steps from './FranchiseComponents/Steps'
import RequestFranchise from './FranchiseComponents/RequestFranchise'
import SEO from '@/SEO'

const Franchise = () => {
  return (

    <>

      <SEO title={"Captain's Crab | Franchise"} description={"Interested in owning a Captain's Crab franchise? Discover franchise opportunities, investment details, and join our growing seafood restaurant brand."}/>

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
    
    </>
    
  )
}

export default Franchise
