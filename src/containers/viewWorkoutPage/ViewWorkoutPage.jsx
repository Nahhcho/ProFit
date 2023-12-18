import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import { useParams } from 'react-router-dom'

const ViewWorkoutPage = () => {

    const { workoutData } = useParams()
    const workout = JSON.parse(decodeURIComponent(workoutData))
    const [exercises, setExercises] = useState(workout.exercises)

  return (
    <div className='create-container'>
        <Header title={'View Workout'} />
        <div className='workout-form-container'>
          <h1>Completed Workout</h1>
            <h4>{workout.title}</h4>

            {
              exercises.map((exercise, exerciseIndex) => (
                <>
                <label for="workoutTitle" className="exercise-label">Exercise {exerciseIndex+1} </label>
                <h6>{exercise.title}</h6>
              
                {
                  exercise.sets.map((set, setIndex) => (
                    <div className='edit-set-container'>
                      <label for="workoutTitle" className="exercise-label">Set {setIndex+1}: {set.reps} x {set.weight} lbs</label>
                    </div>
                  ))
                }
                </>
              ))
            }   
        </div>
        <Nav />
    </div>
  )
}

export default ViewWorkoutPage