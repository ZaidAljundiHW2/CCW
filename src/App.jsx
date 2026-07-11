import React from 'react'
import Navbar from './CustomComponents/Navbar/Navbar'
import Hero from './CustomComponents/Hero/Hero'
import Separator from './CustomComponents/Separator/Separator'
import Menu from './CustomComponents/Menu/Menu'
import Locations from './CustomComponents/Locations/Locations'
import Contact from './CustomComponents/Contact/Contact'
import Footer from './CustomComponents/Footer/Footer'
import About from './CustomComponents/About/About'

const App = () => {
  return (
    <div>

      <Navbar />
      
      <Hero />

      <Separator />

      <Menu />

      <Separator />

      <Locations />

      <Separator />

      <About />

      <Separator />

      <Contact />

      <Footer />

      
    </div>
  )
}

export default App
