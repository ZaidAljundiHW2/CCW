import React from 'react'
import { Outlet } from 'react-router-dom'
import Scrollbar from './CustomComponents/CMS/Scrollbar/Scrollbar'

const LayoutCMS = () => {
  return (
    <div className='flex landscape:flex-row portrait:flex-col'>
        

        <Scrollbar />

        <div className='flex-1 h-screen'>
          <Outlet />
        </div>
        
      
    </div>
  )
}

export default LayoutCMS
