import './About.css'
import OurStory from './AboutComponents/OurStory'
import OurValues from './AboutComponents/OurValues'
import OurMission from './AboutComponents/OurMission'
import SEO from '@/SEO'

const About = () => {
  return (

    <>

      <SEO title={"Captain's Crab | About"} description={"Discover Captain's Crab's origins. Find out why we are the right choice for you. Learn our values."}/>

      <div
          id='about'
          
          style={{
            overflowX:'hidden'
          }}
      >

          <section data-navbar-theme="dark">
            <OurStory />
          </section>

          <section data-navbar-theme="light">
            <OurValues />
          </section>

          <section data-navbar-theme="dark">
            <OurMission />
          </section>
          
          {/* <GalleryComponent /> */}

          
        
      </div>
    
    </>
    
  )
}

export default About
