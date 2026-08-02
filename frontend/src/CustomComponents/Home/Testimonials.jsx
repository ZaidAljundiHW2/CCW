import React, { useEffect, useState } from 'react'
import { Carousel, IconButton, Box, RatingGroup, Flex, Text } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

const Testimonials = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTestimonials = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials`);
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();

    }, []);

    if (loading || testimonials.length === 0) {
        return null;
    }

  return (
    <Box style={{ background: '#f5f5f5' }} className='w-full py-16'>

        <h1 className='testheader text-center mb-10'>
            Testimonials
        </h1>

        <Carousel.Root
            autoplay={{ delay: 5000 }}
            loop
            slideCount={testimonials.length}
            mx="auto"
            maxW="xl"
        >
            <Carousel.ItemGroup>
                {testimonials.map((item, index) => (
                    <Carousel.Item key={item.testimonialid} index={index}>
                        <Flex direction="column" align="center" gap="4" px="6" py="4">

                            <Box
                                as="img"
                                src={item.image}
                                alt={item.username}
                                borderRadius="full"
                                boxSize="100px"
                                objectFit="cover"
                            />

                            <Text fontStyle="italic" textAlign="center" maxW="lg" color={'gray'}>
                                "{item.testimonial}"
                            </Text>

                            <Text fontWeight="semibold" color={'gray'}>
                                – {item.username}
                            </Text>

                            <RatingGroup.Root
                                count={5}
                                value={Number(item.rating)}
                                readOnly
                                colorPalette="yellow"
                                size="sm"
                            >
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>

                        </Flex>
                    </Carousel.Item>
                ))}
            </Carousel.ItemGroup>

            <Carousel.Control justifyContent="center" gap="4" mt="6">
                <Carousel.PrevTrigger asChild>
                    <IconButton size="xs" variant="ghost" color="black" _hover={{ bg: 'blackAlpha.100' }}>
                        <LuChevronLeft />
                    </IconButton>
                </Carousel.PrevTrigger>

                <Carousel.NextTrigger asChild>
                    <IconButton size="xs" variant="ghost" color="black" _hover={{ bg: 'blackAlpha.100' }}>
                        <LuChevronRight />
                    </IconButton>
                </Carousel.NextTrigger>
            </Carousel.Control>
        </Carousel.Root>

    </Box>
  )
}

export default Testimonials