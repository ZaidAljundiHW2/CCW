import React from 'react'
import { Flex, Input, Textarea, Button } from '@chakra-ui/react'
import '@/CustomComponents/Contact/ContactForm.css'
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { motion } from 'motion/react'

const ReqFrForm = () => {
    const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

  return (
    <motion.div className='flex-col flex md:gap-5 gap-2 rounded-lg shadow-lg' style={{background:'#f2f0ef', padding:'20px'}}
        initial={{opacity:0, x:-50}}

        whileInView={{opacity:1, x:0}}

        transition={{duration:.5, ease:'easeOut', delay:.1}}
    >
    

        <Flex
            className='md:gap-5 gap-2'
        >
            <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Full Name*' required/>
            
            <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Email Address*' required/>

        </Flex>

        <Flex
            className='gap-5'
        >
            <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='City*' required/>
            
            <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Phone Number*' required/>

        </Flex>
        

        <Select.Root collection={frameworks} size={{base:'xs', md:'md'}} width="100%">
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                <Select.ValueText className='CFText'  placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                <Select.Content>
                    {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                    </Select.Item>
                    ))}
                </Select.Content>
                </Select.Positioner>
            </Portal>
            </Select.Root>
        

        

        <Textarea className='CFText' size={{base:'xs', md:'md'}} placeholder='Message...*' required style={{
            height:'103px'
        }} />

        <Button bg={'#ef571b'} color={'white'}>
            REQUEST FRANCHISE INFO
        </Button>
        
        
    </motion.div>
  )
}

export default ReqFrForm
