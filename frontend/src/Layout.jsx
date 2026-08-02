import { useRef, useLayoutEffect, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './CustomComponents/Navbar/Navbar'
import Footer from './CustomComponents/Footer/Footer'

const Layout = () => {

  const navRef = useRef(null)
  const footerRef = useRef(null)
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const navNode = navRef.current
    const footerNode = footerRef.current
    if (!navNode) return

    const setVar = (name, px) => {
      document.documentElement.style.setProperty(name, `${px}px`)
    }

    const navObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.offsetHeight
        setVar('--nav-height', height)
      }
    })
    navObserver.observe(navNode, { box: 'border-box' })

    let footerObserver
    if (footerNode) {
      footerObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.offsetHeight
          setVar('--footer-height', height)
        }
      })
      footerObserver.observe(footerNode, { box: 'border-box' })
    }

    const recheck = () => {
      setVar('--nav-height', navNode.offsetHeight)
      if (footerNode) setVar('--footer-height', footerNode.offsetHeight)
    }

    const images = navNode.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', recheck, { once: true })
    })

    if (document.fonts?.ready) {
      document.fonts.ready.then(recheck)
    }

    window.addEventListener('resize', recheck)

    return () => {
      navObserver.disconnect()
      footerObserver?.disconnect()
      window.removeEventListener('resize', recheck)
      images.forEach((img) => img.removeEventListener('load', recheck))
    }

  }, [])

  // Scroll the page back to the top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Navbar ref={navRef} />
      <Outlet />

      <Footer ref={footerRef} />
    </>
  )
}

export default Layout