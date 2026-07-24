import React from 'react'
import './Scrollbar.css'
import { Link } from 'react-router-dom'
import { Button, Menu, Portal } from "@chakra-ui/react"
import { CiMenuBurger } from "react-icons/ci";
import { color } from 'motion';
import { useState } from 'react';

const Scrollbar = () => {

    const [openmenu, setopenmenu] = useState(false);


  return (
    <div
        className='
            w-[20vw]
            portrait:w-full
            bg-[#012447]
            portrait:bg-white
            landscape:h-screen
            landscape:overflow-y-scroll
            flex-col
            flex
            scrollbar
            lanscape:items-center
            h-full
            z-50
        '

        
    >   

        <div className='portrait:hidden'>

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

        </div>

        <div className='landscape:hidden fixed bg-white flex w-[20%] justify-start border-black' style={{padding:'5px', borderWidth:'2px'}}>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button
                    variant="ghost"
                    bg="transparent"
                    _active={{ bg: 'transparent' }}
                    _hover={{ bg: 'transparent' }}
                    p={0}
                    className="menu-trigger-btn"
                    >
                    <span style={{ display: 'inline-flex', fontSize: '2.5rem' }}>
                        <CiMenuBurger style={{ width: '1em', height: '1em' }} />
                    </span>
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                    <Menu.Content>
                        <Link to={'Menu'}>
                            <Menu.Item>Menu</Menu.Item>
                        </Link>

                        <Link>
                            <Menu.Item>Locations</Menu.Item>
                        </Link>

                        <Link to={'General'}>
                            <Menu.Item>General Details</Menu.Item>
                        </Link>

                        <Link to={'About'}>
                            <Menu.Item>About</Menu.Item>
                        </Link>

                        <Link>
                            <Menu.Item>Contact Queries</Menu.Item>
                        </Link>

                        <Link>
                            <Menu.Item>Franchise Queries</Menu.Item>
                        </Link>

                        <Link>
                            <Menu.Item>Booking Reservation Queries</Menu.Item>
                        </Link>
                    </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </div>


      
    </div>
  )
}

export default Scrollbar
