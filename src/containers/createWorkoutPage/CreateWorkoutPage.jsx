import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import Header from '../../components/header/Header'
import './createWorkoutPage.css'
import addButton from './add-icon.png'
import { Context } from '../../components/contextProvider'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const CreateWorkoutPage = () => {

  const [title, setTitle] = useState('')
  const [exercises, setExercises] = useState([])
  const [session, setSession] = useContext(Context)
  const navigate = useNavigate()

  const saveWorkout = async () => {
    fetch(`${session.API_URL}/user/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        exercises: exercises
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
      console.log(data)
      navigate('/')
    })
  }

  const addExercise = () => {
    setExercises([...exercises, {title: '', sets:[]}])
  }

  const addSet = (exerciseIndex) => {
    const updatedExercises = exercises.map((exercise, index) => (
      exerciseIndex === index ? {...exercise, sets: [...exercise.sets, 0]} : exercise
    ))
    setExercises(updatedExercises)
  }

  const updateSet = (e, exerciseIndex, setIndex) => {
    const updatedExercises = exercises.map((exercise, index) =>
      exerciseIndex === index
        ? {
            ...exercise,
            sets: exercise.sets.map((reps, index) =>
              index === setIndex ? e.target.value : reps
            ),
          }
        : exercise
    );
    setExercises(updatedExercises);
  };

  const updateExercises = (e, exerciseIndex) => {
    const updatedExercises = exercises.map((exercise, index) => (
      exerciseIndex === index ? { ...exercise, title: e.target.value } : exercise
    ))
    setExercises(updatedExercises)
    console.log(updatedExercises)
  }

  return (
    <div className='create-container'>
        <Header title={'Workouts'}></Header>
        <div className='workout-form-container'>
          <h1>New Workout</h1>
          <label for="workoutTitle" className="form-label">Title</label>
            <input type="text" id="workoutTitle" class="form-control" value={title} onChange={(e) => {setTitle(e.target.value)}}/>

            {
              exercises.map((exercise, exerciseIndex) => (
                <>
                <label for="workoutTitle" className="exercise-label">Exercise {exerciseIndex+1}</label>
                <input type="text" class="form-control" value={exercise.title} onChange={(e) => {updateExercises(e, exerciseIndex)}}/>
                {
                  exercise.sets.map((set, setIndex) => (
                    <div>
                      <label for="workoutTitle" className="exercise-label">Set {setIndex+1}</label>
                      <input type="number" class="form-control" value={set} onChange={(e) => {updateSet(e, exerciseIndex, setIndex)}}/>
                    </div>
                  ))
                }
                <img src={addButton} className='set-button' onClick={() => {addSet(exerciseIndex)}}/>
                </>
              ))
            }
            <img src={addButton} className='add-button' onClick={addExercise}/>
            <button type="button" class="btn btn-outline-success" onClick={saveWorkout}>Save Workout</button>
        </div>
        <Nav />
    </div>
  )
}

export default CreateWorkoutPage