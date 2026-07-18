import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './CustomComponents/Navbar/Navbar'
import Footer from './CustomComponents/Footer/Footer'
import { useRef, useState, useLayoutEffect } from 'react'

const Layout = () => {

  const navRef = useRef(null)

   useLayoutEffect(() => {
    const node = navRef.current
    if (!node) return

    const updateHeight = () => {
      document.documentElement.style.setProperty('--nav-height', `${node.offsetHeight}px`)
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <>

        <Navbar ref={navRef}/>
        <Outlet />
        <Footer />

    
    </>
  )
}

export default Layout
