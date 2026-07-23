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
    const nodefooter = footerRef.current

    if (!node) return

    const updateHeight = () => {
        document.documentElement.style.setProperty(
            '--nav-height',
            `${node.offsetHeight}px`
        )
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(node)


    let observer2;

    if (nodefooter) {
        const updateFooterHeight = () => {
            document.documentElement.style.setProperty(
                '--footer-height',
                `${nodefooter.offsetHeight}px`
            )
        }

        updateFooterHeight()

        observer2 = new ResizeObserver(updateFooterHeight)
        observer2.observe(nodefooter)
    }


    return () => {
        observer.disconnect()
        observer2?.disconnect()
    }

  }, []);

  return (
    <>

        <Navbar ref={navRef}/>
        <Outlet />
        <Footer ref={footerRef}/>

    
    </>
  )
}

export default Layout
