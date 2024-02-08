import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import './unfocused.css'
import { Context } from '../../components/contextProvider'
import { jwtDecode } from 'jwt-decode'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import WarningModal from '../../components/warningModal/WarningModal'
import CompleteModal from '../../components/completedModal/CompleteModal'

const Unfocused = ({ currentExercise, currentSet, setCurrentWorkout, workout, setFocus, setExerciseCount, setCurrentExercise, setCurrentSet, setSetCount, timerStart, completeWorkout, currentWorkout }) => {
    
    const [elapsedTime, setElapsedTime] = useState(Math.floor((new Date() - timerStart) / 1000))
    const [showWarning, setShowWarning] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
    const [session, setSession] = useContext(Context)

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date()
            const elapsedTimeInSeconds = Math.floor((currentTime - timerStart) / 1000)
            setElapsedTime(elapsedTimeInSeconds)
        }, 1000)
      }, [timerStart])
    
      const formatTime = (time) => {
        const seconds = (`0${time % 60}`).slice(-2)
        const minutes = (`0${Math.floor(time / 60)}`).slice(-2)
    
        return `${minutes}:${seconds}`
      }

    return (
        <>
        <CompleteModal workout={currentWorkout} showEnd={showEnd} workoutId={workout.id} completeWorkout={completeWorkout} setShowEnd={setShowEnd}/>
        <WarningModal showWarning={showWarning} setShowWarning={setShowWarning} />
        <Header title={workout.title} showProfileIcon={false} />
        <MdClose size={25} color='white' className='close-unfocus' onClick={() => {setShowWarning(true)}}/>
        <div className='unfocused-container'>
          <>
          <h1 className='total-timer'>{formatTime(elapsedTime)}</h1>
            {
            currentWorkout.exercises.map(exercise => (
                <div className='unfocused-exercise'>
                <h4 className='unfocused-exercise-header'>
                    {exercise.title}
                    
                </h4>
              
                {
                  exercise.sets.map((set, setIndex) => (
                    <div className='unf-edit-set-container'>
                      <h5>Set {set.set_num}:</h5>
                      <h5>{set.reps} x {set.weight} lbs</h5>
                      <button onClick={() => {
                        setFocus(true)
                        setExerciseCount(exercise.exercise_num)
                        setSetCount(set.set_num)
                        setCurrentExercise(workout.exercises[exercise.exercise_num-1])
                        setCurrentSet(workout.exercises[exercise.exercise_num-1].sets[set.set_num-1])
                        }}type="button" class="btn btn-outline-primary">Focus</button>
                    </div>
                  ))
                }
                <hr className='unfocused-line'/>
                </div>
                
            ))
            }
          </>
          <button type="button" class="complete-unfocus-button btn btn-outline-success"
          onClick={() => {setShowEnd(true)}}>Complete Workout</button>
        </div>
        </>
      )
}

export default Unfocused