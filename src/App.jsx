import React from 'react'
import Navbar from './CustomComponents/Navbar/Navbar'
import Hero from './CustomComponents/Hero/Hero'
import Separator from './CustomComponents/Separator/Separator'
import Menu from './CustomComponents/Menu/Menu'
import Locations from './CustomComponents/Locations/Locations'
import Contact from './CustomComponents/Contact/Contact'
import Footer from './CustomComponents/Footer/Footer'
import About from './CustomComponents/About/About'
import Loader from './CustomComponents/Loader/Loader'
import Franchise from './CustomComponents/Franchise/Franchise'
import { useState, useEffect } from 'react'

const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => setIsLoading(false)

    if (document.readyState === 'complete') {
      // page already fully loaded (images, fonts, etc.)
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>

      <Navbar />
      
      <Hero />

      <Menu />

      <Locations />

      <Franchise />

      <About />

      <Contact />

      {/* <Footer /> */}

      
    </div>
  )
}

export default App
