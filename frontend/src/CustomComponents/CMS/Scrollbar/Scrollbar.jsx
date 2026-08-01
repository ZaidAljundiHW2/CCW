import React, { useState } from 'react'
import './Scrollbar.css'
import { Link } from 'react-router-dom'
import { Menu, Portal, Box } from "@chakra-ui/react"


const Scrollbar = () => {


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



    return (

        <div

            className='
                w-[20vw]
                portrait:w-full
                bg-[#012447]
                landscape:h-screen
                landscape:overflow-y-scroll
                flex-col
                flex
                scrollbar
                landscape:items-center
                h-full
                z-50
            '

        >



            {/* DESKTOP SIDEBAR */}

            <div className='portrait:hidden'>


                <h1 className='text-center text-white'>

                    Captain's Crab Admin CMS

                </h1>



                <Link className='w-full' to={'Menu'}>

                    <button>

                        Menu

                    </button>

                </Link>



                <Link className='w-full' to={'Location'}>

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



                <Link className='w-full' to={'Contact'}>

                    <button>

                        Contact Queries

                    </button>

                </Link>



                <Link className='w-full' to={'Franchise'}>

                    <button>

                        Franchise Queries

                    </button>

                </Link>



                <Link className='w-full' to={'Book'}>

                    <button>

                        Booking Reservation Queries

                    </button>

                </Link>


            </div>







            {/* MOBILE DROPDOWN MENU */}


            <div

                className='
                    landscape:hidden
                    fixed
                    bg-[#012447]
                    flex
                    w-[20%]
                    justify-start
                    border-white
                '

                style={{

                    padding:'5px',
                    borderWidth:'2px'

                }}

            >



                <Menu.Root

                    open={mobileMenuOpen}

                    onOpenChange={(details) => 
                        setMobileMenuOpen(details.open)
                    }

                >



                    <Menu.Trigger asChild>


                        <Box

                            className='dropdown-trigger burger'

                            aria-label='Open menu'

                        >


                            <span 
                                className={
                                    mobileMenuOpen 
                                    ? 'burger-open' 
                                    : ''
                                }
                            ></span>


                            <span 
                                className={
                                    mobileMenuOpen 
                                    ? 'burger-open' 
                                    : ''
                                }
                            ></span>


                            <span 
                                className={
                                    mobileMenuOpen 
                                    ? 'burger-open' 
                                    : ''
                                }
                            ></span>


                        </Box>


                    </Menu.Trigger>





                    <Portal>


                        <Menu.Positioner>


                            <Menu.Content>



                                <Link to={'Menu'}>

                                    <Menu.Item>

                                        Menu

                                    </Menu.Item>

                                </Link>




                                <Link to={'Location'}>

                                    <Menu.Item>

                                        Locations

                                    </Menu.Item>

                                </Link>





                                <Link to={'General'}>

                                    <Menu.Item>

                                        General Details

                                    </Menu.Item>

                                </Link>





                                <Link to={'About'}>

                                    <Menu.Item>

                                        About

                                    </Menu.Item>

                                </Link>





                                <Link to={'Contact'}>

                                    <Menu.Item>

                                        Contact Queries

                                    </Menu.Item>

                                </Link>





                                <Link to={'Franchise'}>

                                    <Menu.Item>

                                        Franchise Queries

                                    </Menu.Item>

                                </Link>





                                <Link to={'Book'}>

                                    <Menu.Item>

                                        Booking Reservation Queries

                                    </Menu.Item>

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