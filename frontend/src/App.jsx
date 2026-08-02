// App.jsx
import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Layout from "./Layout"
import LayoutCMS from "./LayoutCMS"
import LayoutLogin from "./LayoutLogin"
import Home from "./CustomComponents/Home/Home"
import Menu from "./CustomComponents/Menu/Menu"
import Franchise from "./CustomComponents/Franchise/Franchise"
import Locations from "./CustomComponents/Locations/Locations"
import About from "./CustomComponents/About/About"
import Contact from "./CustomComponents/Contact/Contact"
import Book from "./CustomComponents/Book/Book"
import GeneralDetails from "./CustomComponents/CMS/GeneralDetails/GeneralDetails"
import MenuCMS from "./CustomComponents/CMS/Menu/MenuCMS"
import AboutCMS from "./CustomComponents/CMS/About/AboutCMS"
import ContactCMS from "./CustomComponents/CMS/Contact/ContactCMS"
import BookingCMS from "./CustomComponents/CMS/Bookings/BookingCMS"
import FranchiseCMS from "./CustomComponents/CMS/Franchise/FranchiseCMS"
import LocationCMS from "./CustomComponents/CMS/Locations/LocationCMS"
import Login from "./CustomComponents/Login/Login"
import NotFound from "./CustomComponents/Login/NotFound"
import Loader from "./CustomComponents/Loader/Loader"
import { Navigate } from "react-router-dom"
import TestimonialsCMS from "./CustomComponents/CMS/Testimonials/TestimonialsCMS"

axios.defaults.withCredentials = true

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`)
        setUser(res.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "*", element: <NotFound /> },
          { index: true, element: <Home /> },
          { path: "Menu", element: <Menu /> },
          { path: "Locations", element: <Locations /> },
          { path: "Franchise", element: <Franchise /> },
          { path: "About", element: <About /> },
          { path: "Contact", element: <Contact /> },
          { path: "Book", element: <Book /> },
        ],
      },
      {
        path: "/admin",
        element: user ? <LayoutCMS /> : <Navigate to="/login" replace />,
        children: [
          { path: "*", element: <NotFound /> },
          { path: "General", element: <GeneralDetails /> },
          { path: "Menu", element: <MenuCMS /> },
          { path: "About", element: <AboutCMS /> },
          { path: "Contact", element: <ContactCMS /> },
          { path: "Book", element: <BookingCMS /> },
          { path: "Franchise", element: <FranchiseCMS /> },
          { path: "Location", element: <LocationCMS /> },
          { path: "Testimonials", element: <TestimonialsCMS />}
        ],
      },
      {
        path: "/login",
        element: <LayoutLogin />,
        children: [
          { path: "*", element: <NotFound /> },
          { index: true, element: user ? <Navigate to="/admin/General" replace /> : <Login setUser={setUser} /> },
        ],
      },
    ]) // basename removed
  }, [user])

  if (loading) return <Loader />

  return <RouterProvider router={router} />
}

export default App