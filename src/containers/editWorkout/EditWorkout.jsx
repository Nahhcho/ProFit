import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import addButton from './add-icon.png'
import './editWorkout.css'
import { Context } from '../../components/contextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const EditWorkout = () => {

    const { workoutData } = useParams();
    const workout = JSON.parse(decodeURIComponent(workoutData));
    const [title, setTitle] = useState('')
    const [exercises, setExercises] = useState(workout.exercises)
    const [session, setSession] = useContext(Context)
    const navigate = useNavigate()

    const addExercise = () => {
        setExercises([...exercises, {title: '', sets:[]}])
      }
    
      const addSet = (exerciseIndex) => {
        const updatedExercises = exercises.map((exercise, index) => (
          exerciseIndex === index ? {...exercise, sets: [...exercise.sets, 0]} : exercise
        ))
        setExercises(updatedExercises)
      }
    
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
    
      const updateExercises = (e, exerciseIndex) => {
        const updatedExercises = exercises.map((exercise, index) => (
          exerciseIndex === index ? { ...exercise, title: e.target.value } : exercise
        ))
        setExercises(updatedExercises)
        console.log(updatedExercises)
      }
    
      const deleteExercise = (index) => {
        setExercises(exercises.slice(0, index).concat(exercises.slice(index + 1)))
      }
    
      const deleteSet = (exerciseIndex, setIndex) => {
        const updatedExercises = exercises.map((exercise, index) =>
          exerciseIndex === index
            ? {
                ...exercise,
                sets: exercise.sets.slice(0, setIndex).concat(exercise.sets.slice(setIndex + 1)
                ),
              }
            : exercise
        );
        setExercises(updatedExercises);
      }

      const saveEdit = () => {
        fetch(`${session.API_URL}/workout_detail/${workout.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            exercises: exercises,
            title: title,
            userId: session.user.id
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
    
      useEffect(() => {
        console.log(exercises)
      }, [exercises])

  return (
    <div className='create-container'>
        <Header title={'Edit'}></Header>
        <div className='workout-form-container'>
          <h1>Edit Workout</h1>
          <label for="workoutTitle" className="form-label">Title</label>
            <input type="text" id="workoutTitle" class="form-control" value={title} placeholder={workout.title}
            onChange={(e) => {setTitle(e.target.value)}}/>

            {
              exercises.map((exercise, exerciseIndex) => (
                <>
                <label for="workoutTitle" className="exercise-label">Exercise {exerciseIndex+1}<button onClick={() => {deleteExercise(exerciseIndex)}} type="button" class="close-button btn-close btn-close-white" aria-label="Close"></button></label>
                <input type="text" class="form-control" value={exercise.title} onChange={(e) => {updateExercises(e, exerciseIndex)}}/>
              
                {
                  exercise.sets.map((set, setIndex) => (
                    <div className='edit-set-container'>
                      <label for="workoutTitle" className="exercise-label">Set {setIndex+1}:</label>
                      <input type="number" class="edit-set-reps form-control" value={set.reps} onChange={(e) => {updateSetReps(e, exerciseIndex, setIndex)}}/>
                      <h5>x</h5>
                      <input type="number" class='edit-set-weight form-control' value={set.weight} onChange={(e) => {updateSetWeight(e, exerciseIndex, setIndex)}}/>
                      <h5 className='lbs'>lbs</h5>
                      <button onClick={() => {deleteSet(exerciseIndex, setIndex)}} type="button" class="close-button btn-close btn-close-white" aria-label="Close" ></button>
                    </div>
                  ))
                }
                <img src={addButton} className='set-button' onClick={() => {addSet(exerciseIndex)}}/>
                </>
              ))
            }
            <img src={addButton} className='add-button' onClick={addExercise}/>
            
            <button type="button" class="btn btn-outline-success" onClick={saveEdit}>Save Workout</button>
            
        </div>
        <Nav />
    </div>
  )
}

export default EditWorkout