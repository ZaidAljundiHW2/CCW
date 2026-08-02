import { useState, useRef, useEffect } from 'react'
import { Carousel } from "@chakra-ui/react"
import OtherCard from './OtherCard'
import Back2 from '@/assets/img/back2.png'

const OtherLocations = ({ items = [] }) => {
    const [page, setPage] = useState(0)
    const navItemRefs = useRef([])
    const prevPage = useRef(0)

    const handleNavClick = (index) => {
        setPage(index)
    }

    useEffect(() => {
        if (prevPage.current === page) return
        prevPage.current = page

        const navItem = navItemRefs.current[page]
        if (!navItem) return

        navItem.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        })

    }, [page])

    if (items.length === 0) return null

    return (
        <div 
            className='w-full flex flex-col items-center bg-red-500' 
            style={{ 
                padding: '20px', 
                gap: '16px',
                backgroundImage: `url(${Back2})`,
                backgroundSize:'cover',
                width:'100%',
            }}
        
        >

            <style>{`
                .other-locations-nav::-webkit-scrollbar { display: none; }
                .other-locations-nav-item {
                    background-color: transparent;
                    transition: background-color 0.15s ease;
                }
                .other-locations-nav-item:hover {
                    background-color: rgba(255, 255, 255, 0.15);
                }
            `}</style>

            <h1 className='ELH2' style={{color:'white'}}>
                Our Other Locations
            </h1>

            <Carousel.Root
                slideCount={items.length}
                page={page}
                onPageChange={(details) => setPage(details.page)}
                className='w-full'
            >
                <Carousel.ItemGroup className='h-full'>
                    {items.map((item, i) => (
                        <Carousel.Item className='h-full justify-center items-center flex' key={item.locationid ?? i} index={i}>
                            <OtherCard item={item} />
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>
            </Carousel.Root>

            {/* Custom nav / indicator controls, replacing Carousel.Indicators */}
            <div
                className='other-locations-nav flex overflow-x-auto justify-center'
                style={{
                    width: '70%',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {items.map((item, i) => (
                    <div
                        key={item.locationid ?? i}
                        ref={(el) => (navItemRefs.current[i] = el)}
                        onClick={() => handleNavClick(i)}
                        className='other-locations-nav-item flex items-center justify-center flex-shrink-0 cursor-pointer'
                        style={{
                            padding: '10px 20px',
                            borderLeft: '1px solid rgba(255,255,255,0.3)',
                            borderRight: '1px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            fontWeight: '400',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                        }}
                    >
                        {item.locationname}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OtherLocations