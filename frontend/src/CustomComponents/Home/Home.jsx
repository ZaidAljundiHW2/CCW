import Hero from './Hero'
import CallToAction from './CallToAction'
import OurMission from '../About/AboutComponents/OurMission'
import GalleryComponent from '../About/AboutComponents/GalleryComponent'
import HomeStory from './HomeStory'
import Testimonials from './Testimonials'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <>

        <Helmet>
            <title>Captain's Crab a</title>
            <meta name='description' content='Captain&#39;s Crab Homepage'/>
        </Helmet>

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
