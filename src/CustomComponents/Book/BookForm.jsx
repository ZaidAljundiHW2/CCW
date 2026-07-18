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
    <div className='landscape:w-full w-[80%] gap-5 rounded-lg shadow-lg flex flex-col bg-[#f2eeee]/90' style={{padding:'20px'}}>

        <Flex
          className='landscape:flex-row flex-col gap-5' 
        >
          <Input className='CFText' size={{base:'xs', landscape:'md'}} placeholder='First Name*' required/>
            
          <Input className='CFText' size={{base:'xs', landscape:'md'}} placeholder='Last Name*' required/>

        </Flex>

        <Input className='CFText' size={{base:'xs', landscape:'md'}} placeholder='Email Address*'/>
        
        <Input className='CFText' size={{base:'xs', landscape:'md'}} placeholder='Phone Number*'/>

        <Flex
          className='landscape:flex-row flex-col gap-5' 
        >
          <DatePicker.Root
            min={parseDate(today)}
            max={parseDate(nextMonthFormatted)}
            size={{base:'xs', landscape:'md'}}
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
            
          <Input className='CFText' size={{base:'xs', landscape:'md'}} placeholder='Num. Guests*' required/>

        </Flex>

        <Textarea className='CFText' size={{base:'xs', landscape:'md'}} placeholder='Special Requests...*' required />

        <button className='restbutton' style={{background:'#f2eeee', color:'black'}}>

          Submit Reservation
        </button>


        

        
      
    </div>
  )
}

export default BookForm
