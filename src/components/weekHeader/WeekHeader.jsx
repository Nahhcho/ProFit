import React, { useEffect, useState } from 'react'
import './weekHeader.css'

const WeekHeader = ({ currentDay, currentDate, setCurrentDate, today }) => {

  const weekDate = new Date(currentDate)

  useEffect(() => {
    weekDate.setDate(weekDate.getDate() - weekDate.getDay())
    console.log(`week start: ${weekDate}`)
  }, [currentDate])

  const changeCurrentDay = (daysAwayFromSun) => {
    const newDate = new Date(weekDate)
    newDate.setDate(weekDate.getDate() + daysAwayFromSun)
    setCurrentDate(newDate)
  }


  return (
    <nav className='week-header'>

        <p 
        className={currentDay === 'Sunday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(0)}>
          S
        </p>
        <p 
        className={currentDay === 'Monday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(1)}>
          M
        </p>
        <p 
        className={currentDay === 'Tuesday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(2)}>
          T
        </p>
        <p 
        className={currentDay === 'Wednesday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(3)}>
          W
        </p>
        <p 
        className={currentDay === 'Thursday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(4)}>
          Th
        </p>
        <p 
        className={currentDay === 'Friday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(5)}>
          F
        </p>
        <p 
        className={currentDay === 'Saturday' ? 'current-day-icon' : 'day-icon'}
        onClick={() => changeCurrentDay(6)}>
          S
        </p>
        
    </nav>
  )
}

export default WeekHeader