import Hero from './Hero'
import CallToAction from './CallToAction'
import OurMission from '../About/AboutComponents/OurMission'
import GalleryComponent from '../About/AboutComponents/GalleryComponent'
import HomeStory from './HomeStory'
import Testimonials from './Testimonials'

const Home = () => {
  return (
    <>

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
