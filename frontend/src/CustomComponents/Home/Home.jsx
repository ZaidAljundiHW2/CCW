import React from 'react'
import Hero from './Hero'
import CallToAction from './CallToAction'
import OurMission from '../About/AboutComponents/OurMission'
import GalleryComponent from '../About/AboutComponents/GalleryComponent'

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

        <section data-navbar-theme="light">
            <GalleryComponent />
        </section>
      
    </>
  )
}

export default Home
