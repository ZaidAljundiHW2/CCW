import React, { useState, useRef, useEffect } from 'react'
import { Carousel, IconButton, Image, Flex, Box } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"


const GalleryComponent = () => {
  

  const [page, setPage] = useState(0);
  const scrollRef = useRef(null);

  const scrollThumbs = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const API = '';


  const getImages = async() => {

    try {

      const response = await fetch(API + '/gallery');
      const jsonData = await response.json();

      setImages(jsonData);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    const load = async() => {
      await getImages()
      setIsLoading(false);
    }

    load();

  }, []);

  if (isLoading) {
    return (
      <p style={{color:'black'}}>Loading...</p>
    )
  }

  return (
    <div
      className='bg-[#f2eeee] flex flex-col justify-center items-center w-full'
      style={{ gap: '24px', padding: '24px', overflowX: 'hidden' }}
    >

      {/* Main showcase carousel */}
      <Carousel.Root
        slideCount={images.length}
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
              {images.map((item, index) => (
                <Carousel.Item key={index} index={index}>
                  <Image
                    aspectRatio="16/9"
                    src={item.url}
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
          {images.map((item, index) => {
            const isActive = index === page
            return (
              <Image
                key={index}
                onClick={() => setPage(index)}
                w={{ base: "20", sm: "28", md: "40" }}
                aspectRatio="16/9"
                src={item.url}
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