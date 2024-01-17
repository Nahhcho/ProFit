import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/contextProvider';
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import addButton from './add-icon.png'

const DerekWorkout = () => {

    const { workoutData } = useParams();
    const workout = JSON.parse(decodeURIComponent(workoutData))
    const [title, setTitle] = useState(workout.workout_title)
    const [exercises, setExercises] = useState(workout.exercises)
    const [session, setSession] = useContext(Context)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const newExercises = exercises.map((exercise, index) => ({
            ...exercise,
            title: exercise.exercise_title,
            exercise_num: index,
            sets: exercise.sets.map((set, index) => ({
                ...set,
                set_num: index,
                weight: 0
            }))
        }));
        setExercises(newExercises);
    }, [])

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

      const saveWorkout = () => {
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
          setLoading(false)
          navigate('/')
        })
      }

  return (
    <div className='create-container'>
      {
        loading ? (
          <Loading />
        ) : null
      }
        <Header title={'Edit'}></Header>
        <div className='workout-form-container'>
          <h1>Edit Workout</h1>
          <label for="workoutTitle" className="form-label">Title</label>
            <input type="text" id="workoutTitle" class="form-control" value={title} 
            onChange={(e) => {setTitle(e.target.value)}}/>

            {
              exercises.map((exercise, exerciseIndex) => (
                <>
                <label for="workoutTitle" className="exercise-label">Exercise {exerciseIndex+1}<button onClick={() => {deleteExercise(exerciseIndex)}} type="button" class="close-button btn-close btn-close-white" aria-label="Close"></button></label>
                <input type="text" class="form-control" value={exercise.exercise_title} onChange={(e) => {updateExercises(e, exerciseIndex)}}/>
              
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
            
            <button type="button" class="btn btn-outline-success" onClick={() => {
              saveWorkout()
              setLoading(true)
              }}>Save Workout</button>
            
            
        </div>
        <Nav />
    </div>
  )
}

export default DerekWorkout