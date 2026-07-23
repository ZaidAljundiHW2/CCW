import React from 'react'
import './Scrollbar.css'
import { Link } from 'react-router-dom'

const Scrollbar = () => {

    const getGeneralDetails = async() => {
        
    }

  return (
    <div
        className='
            w-[20vw]
            bg-[#012447]
            flex-col
            flex
            scrollbar
            items-center
            h-full
        '
    >

        <h1 className='text-center'>

            Captain's Crab Admin CMS

        </h1>

        <Link className='w-full' to={'Menu'}>
            <button>
                Menu
            </button>
        </Link>

        <Link className='w-full'>
            <button>
                Locations
            </button>
        </Link>

        <Link className='w-full' to={'General'}>
            <button>
                General Details
            </button>
        </Link>

        <Link className='w-full' to={'About'}>
            <button>
                About
            </button>
        </Link>

        <Link className='w-full'>
            <button>
                Contact Queries
            </button>
        </Link>

        <Link className='w-full'>
            <button>
                Franchise Queries
            </button>
        </Link>

        <Link className='w-full'>
            <button>
                Booking Reservation Queries
            </button>
        </Link>

        <Link className='w-full'>
            <button>
                Deleted Items
            </button>
        </Link>


      
    </div>
  )
}

export default Scrollbar
