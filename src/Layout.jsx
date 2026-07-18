import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './CustomComponents/Navbar/Navbar'
import Footer from './CustomComponents/Footer/Footer'
import { useRef, useState, useLayoutEffect } from 'react'

const Layout = () => {

  const navRef = useRef(null)
  const footerRef = useRef(null)

   useLayoutEffect(() => {
    const node = navRef.current
    const nodefooter = footerRef.current;
    if (!nodefooter) return
    if (!node) return

    const updateHeight = () => {
      document.documentElement.style.setProperty('--nav-height', `${node.offsetHeight}px`)
    }

    const updateNegFooterSpace = () => {
      document.documentElement.style.setProperty('--footer-height', `${nodefooter.offsetHeight}px`)
    }

    updateHeight()
    updateNegFooterSpace()

    const observer = new ResizeObserver(updateHeight)
    const observer2 = new ResizeObserver(updateNegFooterSpace)
    observer.observe(node)
    observer2.observe(nodefooter)

    return () => {observer.disconnect(); observer2.disconnect()}
  }, [])

  return (
    <>

        <Navbar ref={navRef}/>
        <Outlet />
        <Footer ref={footerRef}/>

    
    </>
  )
}

export default Layout
