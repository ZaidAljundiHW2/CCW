import { Outlet } from 'react-router-dom'
import Scrollbar from './CustomComponents/CMS/Scrollbar/Scrollbar'
import { Helmet } from 'react-helmet-async'

const LayoutCMS = () => {  
  
  return (

    <>

      <Helmet>
        <meta 
          name="robots" 
          content="noindex, nofollow"
        />
      </Helmet>

      <div className='flex landscape:flex-row portrait:flex-col'>
          

          <Scrollbar />

          <div className='flex-1 h-screen'>
            <Outlet />
          </div>
          
        
      </div>
    
    </>
    
  )
}

export default LayoutCMS
