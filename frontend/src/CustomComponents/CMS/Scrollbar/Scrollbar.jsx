import React, { useState } from 'react'
import './Scrollbar.css'
import { Link } from 'react-router-dom'
import { Menu, Portal, Box, Button } from "@chakra-ui/react"


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

                <Link className='w-full' to={'Testimonials'}>

                    <button>

                        Testimonials

                    </button>

                </Link>


            </div>







            {/* MOBILE DROPDOWN MENU */}


            <div className='landscape:hidden fixed top-3 left-3 flex'>
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button
                            bg={'black'}
                            color={'white'}
                            px={'20px'}
                            py={'10px'}
                            borderRadius={'md'}
                            fontWeight={'medium'}
                            width={'fit-content'}
                        >
                            Open Menu
                        </Button>
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

                                <Link to={'Testimonials'}>

                                    <Menu.Item>

                                        Testimonials

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