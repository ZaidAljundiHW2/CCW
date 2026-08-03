import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const LayoutLogin = () => {
  return (
    <>
      <Helmet>
        <meta 
          name="robots" 
          content="noindex, nofollow"
        />
      </Helmet>
        <Outlet />  
    </>
  )
}

export default LayoutLogin