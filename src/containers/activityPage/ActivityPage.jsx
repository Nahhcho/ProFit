import React, { useState } from 'react'
import './activityPage.css'
import DateHeader from '../../components/dateHeader/DateHeader'
import Nav from '../../components/nav/Nav'

const ActivityPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = dayNames[currentDate.getDay()]

    const handleDateChange = (newDate) => {
        setCurrentDate(newDate);
      }

  return (
    <div className='activity-container'>
        <DateHeader currentDate={currentDate} setCurrentDate={handleDateChange}/>
        <Nav />
    </div>
  )
}

export default ActivityPage