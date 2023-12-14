import React, { useEffect, useState } from 'react'
import './dateHeader.css'
import arrowButton from './arrow.png'

const DateHeader = ({ currentDate, setCurrentDate }) => {

    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const monthName = monthNames[currentDate.getMonth()]

    const prevDate = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() - 1)
        setCurrentDate(newDate)
    }

    const nextDate = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + 1)
        setCurrentDate(newDate)
    }


  return (
    <>

    <nav className='date-header'>
        <img className='backward-arrow-button' onClick={prevDate} src={arrowButton} alt="" />
        <div className='date-div'>
            <h4>{`${monthName} ${currentDate.getDate()}`}</h4>
        </div>
        <img className='forward-arrow-button' onClick={nextDate} src={arrowButton} alt="" />
    </nav>
    
    </>
    
  )
}

export default DateHeader