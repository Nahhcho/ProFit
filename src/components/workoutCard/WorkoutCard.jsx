import React, { useEffect, useState } from 'react'
import './workoutCard.css'
import { Context } from '../contextProvider'
import { useNavigate } from 'react-router-dom'
import settingsImage from './settings.png'

const WorkoutCard = ({ workout }) => {

  const navigate = useNavigate()

  return (
    <div className='workout-card-container'>
        <div class="card text-center">
          <div class="card-header">
            <h4 className='workout-title'>{workout.title}</h4>
            <img className='settings-image' src={settingsImage} 
            onClick={() => {navigate(`/edit/${encodeURIComponent(JSON.stringify(workout))}`)}} />
          </div>
        <div class="card-body">
          <h5 class="card-title">
            {
            workout.exercises?.length > 1 ? 
            (<>{workout.exercises.length} Exercises</>) : 
            (<>{workout.exercises.length} Exercise</>)
            } 
          </h5>
          <p class="card-text">
            {
              workout.exercises.map((exercise, index) => (
                  workout.exercises?.length === index+1 ? 
                  (<>{exercise.title}</>) : (<>{exercise.title}, </>)
              ))
            }
          </p>
          <button type="button" class="btn btn-outline-success" onClick={() => {
            navigate(`/start/${encodeURIComponent(JSON.stringify(workout))}`)
          }}>Start Workout</button>
        </div>
      <div class="card-footer text-body-secondary">
        2 days ago
      </div>
      </div>
    </div>
  )
}

export default WorkoutCard