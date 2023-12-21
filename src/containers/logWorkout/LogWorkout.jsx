import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import { Context } from '../../components/contextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import './logWorkout.css'
import { jwtDecode } from 'jwt-decode'
import Loading from '../../components/loading/Loading'

const LogWorkout = () => {
    const { workoutData, date, dateString } = useParams();
    const workout = JSON.parse(decodeURIComponent(workoutData))
    const [exercises, setExercises] = useState(workout.exercises)
    const [session, setSession] = useContext(Context)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const updateSetReps = (e, exerciseIndex, setIndex) => {
        const updatedExercises = exercises.map((exercise, index) =>
          exerciseIndex === index
            ? {
                ...exercise,
                sets: exercise.sets.map((set, index) =>
                  index === setIndex ? {...set, reps: e.target.value} : set
                ),
              }
            : exercise
        );
        setExercises(updatedExercises);
      };

      const updateSetWeight = (e, exerciseIndex, setIndex) => {
        const updatedExercises = exercises.map((exercise, index) =>
          exerciseIndex === index
            ? {
                ...exercise,
                sets: exercise.sets.map((set, index) =>
                  index === setIndex ? {...set, weight: e.target.value} : set
                ),
              }
            : exercise
        );
        setExercises(updatedExercises);
      };

    const logWorkout = () => {
      setLoading(true)

      fetch(`${session.API_URL}/log_workout/${workout.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session.user.id,
          exercises: exercises,
          completed_date: date
        })
      })
      .then(response => response.json())
      .then(data => {
        setSession({
          ...session,
          authTokens: data,
          user: jwtDecode(JSON.stringify(data)).user
        })
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate('/activity')
      })
    }

  return (
    <div>
        <div className='create-container'>
      {
        loading ? (
          <Loading />
        ) : null
      }
        <Header title={dateString}></Header>
        <div className='workout-form-container'>
          <h1>Log Workout</h1>
          <h4>{workout.title}</h4>

            {
              exercises.map((exercise, exerciseIndex) => (
                <>
                <label for="workoutTitle" className="exercise-label">Exercise {exerciseIndex+1} </label>
                <h6>{exercise.title}</h6>
              
                {
                  exercise.sets.map((set, setIndex) => (
                    <div className='edit-set-container'>
                      <label for="workoutTitle" className="exercise-label">Set {setIndex+1}:</label>
                      <input type="number" class="edit-set-reps form-control" value={set.reps} onChange={(e) => {updateSetReps(e, exerciseIndex, setIndex)}}/>
                      <h5>x</h5>
                      <input type="number" class='edit-set-weight form-control' value={set.weight} onChange={(e) => {updateSetWeight(e, exerciseIndex, setIndex)}}/>
                      <h5 className='lbs'>lbs</h5>
                    </div>
                  ))
                }
                </>
              ))
            }
            
            <div className='log-button-container'>
            <button type="button" class="edit-workout-button btn btn-outline-success" onClick={logWorkout}>Log Workout</button>
            </div>
            
        </div>
        <Nav />
    </div>
    </div>
  )
}

export default LogWorkout