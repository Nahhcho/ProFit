import React, { useEffect, useState } from 'react'
import './weekHeader.css'

const WeekHeader = ({ currentDay, currentDate }) => {

  const weekDate = new Date(currentDate)

  useEffect(() => {
    weekDate.setDate(weekDate.getDate() - weekDate.getDay())
    console.log(`week start: ${weekDate}`)
  }, [currentDate])

  return (
    <nav className='week-header'>

        <p 
        className={currentDay === 'Sunday' ? 'current-day-icon' : 'day-icon'}>
          S
        </p>
        <p 
        className={currentDay === 'Monday' ? 'current-day-icon' : 'day-icon'}>
          M
        </p>
        <p 
        className={currentDay === 'Tuesday' ? 'current-day-icon' : 'day-icon'}>
          T
        </p>
        <p 
        className={currentDay === 'Wednesday' ? 'current-day-icon' : 'day-icon'}>
          W
        </p>
        <p 
        className={currentDay === 'Thursday' ? 'current-day-icon' : 'day-icon'}>
          Th
        </p>
        <p 
        className={currentDay === 'Friday' ? 'current-day-icon' : 'day-icon'}>
          F
        </p>
        <p 
        className={currentDay === 'Saturday' ? 'current-day-icon' : 'day-icon'}>
          S
        </p>
        
    </nav>
  )
}

export default WeekHeader