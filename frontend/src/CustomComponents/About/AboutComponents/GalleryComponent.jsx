import React, { useState, useRef } from 'react'
import { Carousel, IconButton, Image, Flex, Box } from "@chakra-ui/react"
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
  const scrollRef = useRef(null)

  const scrollThumbs = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div
      className='bg-[#f2eeee] flex flex-col justify-center items-center w-full'
      style={{ gap: '24px', padding: '24px', overflowX: 'hidden' }}
    >

      {/* Main showcase carousel */}
      <Carousel.Root
        slideCount={items.length}
        page={page}
        onPageChange={(details) => setPage(details.page)}
        maxW="5xl"
        w="90%"
        gap="6"
      >
        <Carousel.Control justifyContent="center" gap={{ base: "2", md: "6" }} width="full">
          <Carousel.PrevTrigger asChild>
            <IconButton
              size={{ base: "sm", md: "lg" }}
              variant="outline"
              color="black"
              borderColor="black"
              _hover={{ bg: "black", color: "white" }}
              flexShrink={0}
            >
              <LuChevronLeft size={22} />
            </IconButton>
          </Carousel.PrevTrigger>

          <Box width="full" minW={0} overflow="hidden" borderRadius="lg">
            <Carousel.ItemGroup width="full" minW={0}>
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
          </Box>

          <Carousel.NextTrigger asChild>
            <IconButton
              size={{ base: "sm", md: "lg" }}
              variant="outline"
              color="black"
              borderColor="black"
              _hover={{ bg: "black", color: "white" }}
              flexShrink={0}
            >
              <LuChevronRight size={22} />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>

      {/* Thumbnail strip — capped to the SAME width as the carousel above,
          with the inner row scrolling horizontally instead of overflowing the page */}
      <Flex align="center" gap={{ base: "2", md: "5" }} maxW="5xl" w="90%">
        <IconButton
          size={{ base: "sm", md: "lg" }}
          variant="outline"
          color="black"
          borderColor="black"
          onClick={() => scrollThumbs(-1)}
          _hover={{ bg: "black", color: "white" }}
          flexShrink={0}
        >
          <LuChevronLeft size={20} />
        </IconButton>

        <Flex
          ref={scrollRef}
          gap={{ base: "2", md: "5" }}
          minW={0}
          overflowX="auto"
          scrollSnapType="x mandatory"
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {items.map((item, index) => {
            const isActive = index === page
            return (
              <Image
                key={index}
                onClick={() => setPage(index)}
                w={{ base: "20", sm: "28", md: "40" }}
                aspectRatio="16/9"
                src={item.url}
                alt={item.label}
                objectFit="cover"
                cursor="pointer"
                borderRadius="8px"
                outline={isActive ? "3px solid black" : "none"}
                outlineOffset="3px"
                flexShrink={0}
                scrollSnapAlign="start"
              />
            )
          })}
        </Flex>

        <IconButton
          size={{ base: "sm", md: "lg" }}
          variant="outline"
          color="black"
          borderColor="black"
          onClick={() => scrollThumbs(1)}
          _hover={{ bg: "black", color: "white" }}
          flexShrink={0}
        >
          <LuChevronRight size={20} />
        </IconButton>
      </Flex>
    </div>
  )
}

export default GalleryComponent