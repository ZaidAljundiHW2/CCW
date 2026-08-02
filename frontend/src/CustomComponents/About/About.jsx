import './About.css'
import OurStory from './AboutComponents/OurStory'
import OurValues from './AboutComponents/OurValues'
import OurMission from './AboutComponents/OurMission'
const About = () => {
  return (
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
  )
}

export default About
