import React, { useState } from 'react'
import { Carousel, IconButton, Image, Flex } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import groupdining from '@/assets/img/group-dining.png'
import familydining from '@/assets/img/family-dining.png'
import groupdining2 from '@/assets/img/group-dining-new.png'
import rest1 from '@/assets/img/restaurant-exterior.png'
import rest2 from '@/assets/img/restaurant-front.png'
import deliv1 from '@/assets/img/delivery-door.png'
import deliv2 from '@/assets/img/delivery-car.png'

const GalleryComponent = () => {
  const items = [
    { label: "groupdining", url: groupdining },
    { label: "familydining", url: familydining },
    { label: "groupdining2", url: groupdining2 },
    { label: 'rest1', url: rest1 },
    { label: "rest2", url: rest2 },
    { label: 'deliv1', url: deliv1 },
    { label: 'deliv2', url: deliv2 }
  ]

  const [page, setPage] = useState(0)
  const THUMBS_PER_VIEW = 5
  const [thumbStart, setThumbStart] = useState(0)

  const maxThumbStart = Math.max(0, items.length - THUMBS_PER_VIEW)
  const visibleThumbs = items.slice(thumbStart, thumbStart + THUMBS_PER_VIEW)

  return (
    <div className='min-h-[80vh] bg-[#f2eeee] flex flex-col justify-center items-center' style={{ gap: '40px', padding: '40px' }}>

      {/* Main showcase carousel */}
      <Carousel.Root
        slideCount={items.length}
        page={page}
        onPageChange={(details) => setPage(details.page)}
        maxW="5xl"
        w="90%"
        gap="6"
      >
        <Carousel.Control justifyContent="center" gap="6" width="full">
          <Carousel.PrevTrigger asChild>
            <IconButton size="lg" variant="outline" color="black" borderColor="black" _hover={{ bg: "black", color: "white" }}>
              <LuChevronLeft size={28} />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.ItemGroup width="full">
            {items.map((item, index) => (
              <Carousel.Item key={index} index={index}>
                <Image
                  aspectRatio="16/9"
                  src={item.url}
                  alt={item.label}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  className='rounded-lg'
                />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <Carousel.NextTrigger asChild>
            <IconButton size="lg" variant="outline" color="black" borderColor="black" _hover={{ bg: "black", color: "white" }}>
              <LuChevronRight size={28} />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>

      {/* Thumbnail strip */}
      <Flex align="center" gap="5">
        <IconButton
          size="lg"
          variant="outline"
          color="black"
          borderColor="black"
          onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
          disabled={thumbStart === 0}
          _hover={{ bg: "black", color: "white" }}
        >
          <LuChevronLeft size={24} />
        </IconButton>

        <Flex gap="5">
          {visibleThumbs.map((item, i) => {
            const realIndex = thumbStart + i
            const isActive = realIndex === page
            return (
              <Image
                key={realIndex}
                onClick={() => setPage(realIndex)}
                w="40"
                aspectRatio="16/9"
                src={item.url}
                alt={item.label}
                objectFit="cover"
                cursor="pointer"
                borderRadius="8px"
                outline={isActive ? "3px solid black" : "none"}
                outlineOffset="3px"
              />
            )
          })}
        </Flex>

        <IconButton
          size="lg"
          variant="outline"
          color="black"
          borderColor="black"
          onClick={() => setThumbStart((s) => Math.min(maxThumbStart, s + 1))}
          disabled={thumbStart >= maxThumbStart}
          _hover={{ bg: "black", color: "white" }}
        >
          <LuChevronRight size={24} />
        </IconButton>
      </Flex>
    </div>
  )
}

export default GalleryComponent