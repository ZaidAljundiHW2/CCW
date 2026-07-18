import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './CustomComponents/Navbar/Navbar'
import Footer from './CustomComponents/Footer/Footer'

const Layout = () => {
  return (
    <>

        <Navbar />
        <Outlet />
        <Footer />

    
    </>
  )
}

export default Layout
