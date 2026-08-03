import Hero from './Hero'
import CallToAction from './CallToAction'
import OurMission from '../About/AboutComponents/OurMission'
import GalleryComponent from '../About/AboutComponents/GalleryComponent'
import HomeStory from './HomeStory'
import Testimonials from './Testimonials'
import SEO from '@/SEO'

const Home = () => {

    

    

  return (
    <>


        <SEO title={"Captain's Crab | Seafood Restaurant"} description={"Craving seafood boils? Captain's Crab on your mind? Get your favourite seafood meals and courses from your nearest location in Canada. Call us, order online!"}/>

        <section data-navbar-theme="dark">
            <Hero />
        </section>

        <section data-navbar-theme="dark">
            <CallToAction />
        </section>

        <section data-navbar-theme="light">
            <OurMission />
        </section>

        <section data-navbar-theme="dark">
            <HomeStory />
        </section>

        <section data-navbar-theme="light">
            <GalleryComponent />
        </section>

        <section data-navbar-theme="light">
            <Testimonials />
        </section>
      
    </>
  )
}

export default Home
