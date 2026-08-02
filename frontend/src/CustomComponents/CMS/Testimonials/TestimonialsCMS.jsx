import React, { useEffect } from 'react'
import InfoBlock from '../InfoBlock'
import { useState } from 'react';
import TestimonialBlock from './TestimonialBlock';
import EditTestimonial from './EditTestimonial';
import AddTestimonial from './AddTestimonial';

const TestimonialsCMS = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState();

    const getTestimonials = async() => {
        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials`);

            const jsonData = await response.json();
            setTestimonials(jsonData);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const load = async() => {

            await getTestimonials();
            setLoading(false);

        }

        load();

    },[showEdit, showAdd]);

  return (
    <div
        className='
            w-full
            h-screen
            GDWrapperC
            flex
            flex-col
            bg-white
        '
    >

        <h1 className='CMSHead'>
            Testimonials
        </h1>

        <InfoBlock add={true} setShowAdd={setShowAdd} edit={false} label={"Testimonials"}/>


        {loading ? (

                <p style={{color:'black'}}>Loading...</p>
            )

            :

            (
                <>
                    {testimonials.map(testimonial => (

                        <TestimonialBlock key={testimonial.testimonialid} testimonial={testimonial} setTestimonial={setSelectedTestimonial} setShowEdit={setShowEdit}/>

                    ))}
                </>
            )
        }

        {showEdit && (<EditTestimonial testimonial={selectedTestimonial} setShowEdit={setShowEdit}/>)}
        {showAdd && (<AddTestimonial setShowAdd={setShowAdd} />)}
        
    </div>
  )
}

export default TestimonialsCMS