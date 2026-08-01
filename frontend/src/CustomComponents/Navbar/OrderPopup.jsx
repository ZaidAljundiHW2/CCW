import React, { useEffect, useState } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { IoIosCloseCircle } from "react-icons/io"
import { SiDoordash } from "react-icons/si"
import { SiUbereats } from "react-icons/si"
import { FaPhoneAlt } from "react-icons/fa"

import './OrderPopup.css'


const OrderPopup = ({ setShowOrderPopup }) => {


    const [genDetails, setGenDetails] = useState([]);



    const getGeneralDetails = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/CMS/general-details/social-media`
            );


            const jsonData = await response.json();


            setGenDetails(jsonData);


        } catch(error) {

            console.error("Failed to get general details:", error);

        }

    };



    useEffect(() => {


        document.body.style.overflow = 'hidden';


        getGeneralDetails();



        return () => {

            document.body.style.overflow = "auto";

        }


    }, []);




    const doordashLink = genDetails.find(
        item => item.label === "DoorDash"
    )?.val;



    const uberEatsLink = genDetails.find(
        item => item.label === "Uber Eats"
    )?.val;



    const phoneNumber = genDetails.find(
        item => item.label === "Phone Number"
    )?.val;



    return (

        <div

            className="
                bg-black/70
                fixed
                inset-0
                z-40
            "

            onClick={() => setShowOrderPopup(false)}

        >



            <Flex

                className="
                    top-[50%]
                    left-[50%]
                    absolute
                    bg-[#f2eeee]
                    w-[50%]
                    portrait:w-[80%]
                    flex
                    flex-col
                    orderwrapper
                    rounded-lg
                    shadow-lg
                    gap-5
                    z-50
                "

                onClick={(e) => e.stopPropagation()}

                style={{

                    transform:'translate(-50%,-50%)',
                    padding:'20px'

                }}

            >



                <Flex className="flex-col">


                    <h1

                        className="heroheader"

                        style={{

                            color:'#012447'

                        }}

                    >

                        Order Now!

                    </h1>




                    <p

                        className="WhyCCText"

                        style={{

                            color:'#012447'

                        }}

                    >

                        Choose a delivery partner or start a pickup request.

                    </p>


                </Flex>






                <Flex

                    className="
                        flex-col
                        w-full
                        justify-center
                        items-center
                        landscape:flex-row
                        landscape:gap-5
                        gap-5
                    "

                >




                    {/* DOORDASH */}

                    <a

                        href={doordashLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"

                        className="flex-1 w-full"

                    >


                        <Button


                            className="
                                restbutton
                                min-w-0
                                flex
                                items-center
                                justify-center
                                gap-3
                                w-full
                            "


                            style={{

                                background:'#e41601',
                                borderColor:'white',
                                color:'white'

                            }}

                        >


                            Doordash
                            <SiDoordash />


                        </Button>


                    </a>







                    {/* UBER EATS */}


                    <a


                        href={uberEatsLink || "#"}

                        target="_blank"

                        rel="noopener noreferrer"


                        className="flex-1 w-full"


                    >


                        <Button


                            className="
                                restbutton
                                min-w-0
                                flex
                                items-center
                                justify-center
                                gap-3
                                w-full
                            "


                            style={{


                                color:'white',

                                background:'black'


                            }}


                        >


                            Uber Eats

                            <SiUbereats />


                        </Button>


                    </a>







                    {/* PHONE PICKUP */}


                    <a


                        href={
                            phoneNumber
                                ? `tel:${phoneNumber.replace(/\s/g,'')}`
                                : "#"
                        }


                        className="flex-1 w-full"


                    >



                        <Button


                            className="
                                restbutton
                                min-w-0
                                flex
                                items-center
                                justify-center
                                gap-3
                                w-full
                            "


                            style={{


                                color:'black',

                                background:'#f2eeee',

                                borderColor:'black'


                            }}


                        >


                            Call Pickup

                            <FaPhoneAlt />


                        </Button>



                    </a>



                </Flex>







                {/* CLOSE BUTTON */}


                <div


                    className="
                        absolute
                        top-[10px]
                        right-[10px]
                        hover:cursor-pointer
                    "


                    onClick={() => setShowOrderPopup(false)}


                >


                    <IoIosCloseCircle


                        className="PPClose"


                        color="#012447"


                    />


                </div>




            </Flex>



        </div>

    )

}


export default OrderPopup;