import { Provider } from "./components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './CustomComponents/Navbar/Navbar'
import Footer from './CustomComponents/Footer/Footer'
import Menu from "./CustomComponents/Menu/Menu"
import Franchise from "./CustomComponents/Franchise/Franchise"
import Locations from "./CustomComponents/Locations/Locations"
import About from "./CustomComponents/About/About"
import Contact from "./CustomComponents/Contact/Contact"
import Layout from "./Layout"
import Book from "./CustomComponents/Book/Book"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'Menu', element: <Menu /> },
      { path: 'Locations', element: <Locations /> },
      { path: 'Franchise', element: <Franchise /> },
      { path: 'About', element: <About /> },
      { path: 'Contact', element: <Contact /> },
      { path: 'Book', element: <Book />}
    ]
  }
], { basename: '/CCW' });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>

      <RouterProvider router={router} />
      
    </Provider>
  </StrictMode>,
)
