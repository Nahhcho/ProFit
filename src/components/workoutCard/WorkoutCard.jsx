import React, { useEffect, useState } from 'react'
import './workoutCard.css'
import { Context } from '../contextProvider'

const WorkoutCard = () => {

  return (
    <div className='workout-card '>
        <h1 className='card-title'>Legs</h1>
        <div className='exercises-container'>
          <p>Squats</p>
          <p>Deadlifts</p>
          <p>Rdls</p>
          <p>Hi</p>
        </div>
    </div>
  )
}

export default WorkoutCard