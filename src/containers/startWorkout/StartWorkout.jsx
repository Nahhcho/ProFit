import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import { useParams } from 'react-router-dom'
import './startWorkout.css'

const StartWorkout = () => {

    const { workoutData } = useParams();
    const workout = JSON.parse(decodeURIComponent(workoutData));
    const [exerciseCount, setExerciseCount] = useState(1)
    const [setCount, setSetCount] = useState(1)
    const [seconds, setSeconds] = useState(5)
    const [intervalId, setIntervalId] = useState(null)

    const startCounting = () => {
        const id = setInterval(() => {
            setSeconds((prevCount) => prevCount - 1);
          }, 1000);
        setIntervalId(id)
    }

    const stopCounting = () => {
        // Clear the interval when the button is clicked
        clearInterval(intervalId)
      };

    const nextSet = () => {
        if(workout.exercises[exerciseCount-1].sets[setCount] === undefined) {
            setExerciseCount(exerciseCount+1)
            setSetCount(1)
            stopCounting()
        }
        else {
            setSetCount(setCount+1)
            startCounting()
        }
        setSeconds(5)
        
    }

      useEffect(() => {
        // Cleanup function to clear the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };
      }, [intervalId]);

      useEffect(() => {
        if(seconds === 0) {
            clearInterval(intervalId)
        }
      }, [seconds]);

  return (
    <div>
        <Header title={workout.title}/>
        <div className='exercise-container'>
            <h2>Exercise {exerciseCount}: {workout.exercises[exerciseCount-1].title}</h2>
            <div className='counter-container'>
                <p className='counter'>{seconds}</p>
                <div className='button-container'>
                    <button type="button" class="btn btn-outline-success" onClick={startCounting}>Start</button>
                    <button type="button" class="btn btn-outline-danger" onClick={stopCounting}>Stop</button>
                </div>
            </div>
            <div className='set-container'>
                <h5>Set {setCount}: {workout.exercises[exerciseCount-1].sets[setCount-1].reps} x </h5>
                <input type="number" className='weight-input'/> 
                <p>lbs</p>
                <button type="button" class="next-button btn btn-outline-primary btn-sm" onClick={() => {nextSet()}}>Next</button>
            </div>
            
        </div>
        <Nav />
    </div>
  )
}

export default StartWorkout