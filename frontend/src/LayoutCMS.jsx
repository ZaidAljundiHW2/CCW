import React from 'react'
import { Outlet } from 'react-router-dom'
import Scrollbar from './CustomComponents/CMS/Scrollbar/Scrollbar'

const LayoutCMS = () => {
  return (
    <div className='flex h-screen'>
        

        <Scrollbar />

        <div className='flex-1 h-screen'>
          <Outlet />
        </div>
        
      
    </div>
  )
}

export default LayoutCMS
