import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './CustomComponents/Navbar/Navbar'
import Footer from './CustomComponents/Footer/Footer'
import { Helmet } from 'react-helmet-async'

const Layout = () => {

  const navRef = useRef(null)
  const footerRef = useRef(null)
  const { pathname } = useLocation()

  const [mainBranch, setMainBranch] = useState(null)

  useEffect(() => {
    const getMainBranch = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`)
        const jsonData = await response.json()

        setMainBranch(jsonData.find(item => item.ismainbranch === true))

      } catch (error) {
        console.error(error)
      }
    }

    getMainBranch()

  }, [])

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

      if (footerNode) {
        setVar('--footer-height', footerNode.offsetHeight)
      }
    }

    const images = navNode.querySelectorAll('img')

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', recheck, { once: true })
      }
    })

    if (document.fonts?.ready) {
      document.fonts.ready.then(recheck)
    }

    window.addEventListener('resize', recheck)

    return () => {
      navObserver.disconnect()
      footerObserver?.disconnect()
      window.removeEventListener('resize', recheck)

      images.forEach((img) => {
        img.removeEventListener('load', recheck)
      })
    }

  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

const openDays = allDays.filter(
  day => !mainBranch?.closeddays?.includes(day)
)


  return (
    <>
      {mainBranch && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",

              "name": "Captain's Crab",

              "description": "Seafood restaurant specializing in seafood boils and fresh seafood meals.",

              "servesCuisine": "Seafood",

              "telephone": mainBranch.phonenumber,

              "email": "Captainscrab@gmail.com",

              "address": {
                "@type": "PostalAddress",
                "streetAddress": mainBranch.address,
                "addressCountry": "CA"
              },

              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": openDays,
                  ...(mainBranch.is24hrs
                    ? {
                        "opens": "00:00",
                        "closes": "00:00"
                      }
                    : {
                        "opens": mainBranch.opentime,
                        "closes": mainBranch.closetime
                      }
                  )
                }
              ]
            })}
          </script>
        </Helmet>
      )}

      <Navbar ref={navRef} />

      <Outlet />

      <Footer ref={footerRef} />
    </>
  )
}

export default Layout