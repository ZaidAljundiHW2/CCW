import React from 'react'
import Navbar from './CustomComponents/Navbar/Navbar'
import Hero from './CustomComponents/Hero/Hero'
import Separator from './CustomComponents/Separator/Separator'
import Menu from './CustomComponents/Menu/Menu'
import Locations from './CustomComponents/Locations/Locations'
import Contact from './CustomComponents/Contact/Contact'

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

      <Contact />

      
    </div>
  )
}

export default App
