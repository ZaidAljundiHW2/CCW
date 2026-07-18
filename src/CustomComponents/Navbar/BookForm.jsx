import React from 'react'
import { Flex, Input, Textarea } from '@chakra-ui/react'
import { IoIosCloseCircle } from "react-icons/io";

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

const BookForm = ({setShowBook}) => {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const nextMonthFormatted = nextMonth.toISOString().split("T")[0];



  return (
    <div className='w-full rounded-lg shadow-lg flex flex-col gap-5 bg-[#f2eeee]/90' style={{padding:'20px'}}>

        <Flex
          className='md:gap-5 gap-2' 
        >
          <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='First Name*' required/>
            
          <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Last Name*' required/>

        </Flex>

        <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Email Address*'/>
        
        <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Phone Number*'/>

        <Flex
          className='md:gap-5 gap-2 md:flex-row flex-col' 
        >
          <DatePicker.Root
            min={parseDate(today)}
            max={parseDate(nextMonthFormatted)}
            size={{base:'xs', md:'md'}}
            className='CFText'
          >
            <DatePicker.Control>
              <DatePicker.Input />
              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                  </DatePicker.View>
                  <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                  </DatePicker.View>
                  <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                  </DatePicker.View>
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
            
          <Input className='CFText' size={{base:'xs', md:'md'}} placeholder='Num. Guests*' required/>

        </Flex>

        <Textarea className='CFText' size={{base:'xs', md:'md'}} placeholder='Special Requests...*' required 
          
        />

        <button className='restbutton w-[30%]' style={{background:'#f2eeee', color:'black'}}>

          Submit Reservation
        </button>


        <div className='absolute top-[10px] right-[10px] hover:cursor-pointer' onClick={() => setShowBook(false)}>
          <IoIosCloseCircle className='PPClose'/>
        </div>

        
      
    </div>
  )
}

export default BookForm
