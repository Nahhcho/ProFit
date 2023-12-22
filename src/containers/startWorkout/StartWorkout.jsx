import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import { useNavigate, useParams } from 'react-router-dom'
import './startWorkout.css'
import { Context } from '../../components/contextProvider'
import { jwtDecode } from 'jwt-decode'
import Loading from '../../components/loading/Loading'
import { MdClose } from 'react-icons/md'
import Unfocused from '../unfocused/Unfocused'

const StartWorkout = () => {

    const { workoutData } = useParams();
    const workout = JSON.parse(decodeURIComponent(workoutData))
    const [timerStart] = useState(new Date())
    const [currentWorkout, setCurrentWorkout] = useState(null) 
    const [focus, setFocus] = useState(true)
    const [newTime, setNewTime] = useState(90)
    const [editTimer, setEditTimer] = useState(false)
    const [session, setSession] = useContext(Context)
    const [exerciseCount, setExerciseCount] = useState(1)
    const [setCount, setSetCount] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [intervalId, setIntervalId] = useState(null)
    const [startTime, setStartTime] = useState(0)
    const [timeSet, setTimeSet] = useState(false)
    const [timeDiff, setTimeDiff] = useState(0)
    const [displayCount, setDisplayCount] = useState(90)
    const [currentExercise, setCurrentExercise] = useState(workout.exercises.filter(exercise => exercise.exercise_num === exerciseCount)[0])
    const [currentSet, setCurrentSet] = useState(currentExercise.sets.filter(set => set.set_num === setCount)[0])
    const navigate= useNavigate()
    const [loading, setLoading] = useState(false)
    const [newSet, setNewSet] = useState({
      newWeight: '',
      newReps: ''
    })

    useEffect(() => {
      const wipedWorkout = {
        ...workout, 
        exercises: workout.exercises.map(exercise => ({
          ...exercise, 
          sets: exercise.sets.map(set => ({
            ...set, 
            reps: 0,
            weight: 0
          }))
        }))
      }

      setCurrentWorkout(wipedWorkout)
    }, [])

    useEffect(() => {
      console.log(exerciseCount)
      console.log(setCount)
    }, [exerciseCount])
    
    useEffect(() => {
      return () => {
        clearInterval(intervalId);
      };
    }, [intervalId]);

    useEffect(() => {
      if(timeSet === true) {
        const currentDate = new Date()
        const hoursToSeconds = currentDate.getHours() * 3600;
        const minutesToSeconds = currentDate.getMinutes() * 60;
        const timeSeconds = currentDate.getSeconds();
        const nowTime = timeSeconds+minutesToSeconds+hoursToSeconds

        setTimeDiff(nowTime-startTime)
        if(displayCount-timeDiff <= 0) {
          stopCounting()
        }
      }
      }
    , [seconds]);

    const startCounting = () => {
      if(timeSet === false) {
        const currentDate = new Date()
        const hoursToSeconds = currentDate.getHours() * 3600;
        const minutesToSeconds = currentDate.getMinutes() * 60;
        const timeSeconds = currentDate.getSeconds();
        const totalSeconds = timeSeconds+minutesToSeconds+hoursToSeconds
        setStartTime(totalSeconds)
        setTimeSet(true)
      }
        
        const id = setInterval(() => {
            setSeconds((prevCount) => prevCount + 1);
          }, 1000);
        setIntervalId(id)
    }

    const stopCounting = () => {
        clearInterval(intervalId)
        setTimeSet(false)
        setDisplayCount(displayCount-timeDiff)
        setTimeDiff(0)
      };

    const nextSet = () => {
        console.log(setCount)
        console.log(currentExercise.sets.length)
        console.log(exerciseCount)
        if(setCount === currentExercise.sets.length) {
          if(exerciseCount === workout.exercises.length) {
            stopCounting()
            setFocus(false)
          }
          else {
            let exercise = workout.exercises.filter(exercise => exercise.exercise_num === exerciseCount+1)[0]
            console.log(exercise)
            setCurrentSet(exercise.sets.filter(set => set.set_num === 1)[0])
            setExerciseCount(exerciseCount+1)
            setCurrentExercise(exercise)
            setSetCount(1)
          }
        }
        else {
            setCurrentSet(currentExercise.sets.filter(set => set.set_num === setCount+1)[0])
            setSetCount(setCount+1)
        }
        stopCounting()
        setDisplayCount(newTime)
        
    }

    const completeWorkout = () => {
      setLoading(true)
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
      const day = currentDate.getDate().toString().padStart(2, '0')
      const completedDate = `${year}-${month}-${day}`

      fetch(`${session.API_URL}/complete_workout/${workout.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session.user.id,
          completed_date: completedDate
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

    const updateSet = () => {
      nextSet()
      const weight = newSet.newWeight
      const reps = newSet.newReps
      setNewSet({newWeight: '', newReps: ''})

      const wipedWorkout = {
        ...currentWorkout,
        exercises: currentWorkout.exercises.map(exercise =>
          exercise.exercise_num === currentExercise.exercise_num
            ? {
                ...exercise,
                sets: exercise.sets.map(set =>
                  set.set_num === currentSet.set_num
                    ? { ...set, weight: weight, reps: reps }
                    : set
                )
              }
            : exercise
        )
      }
      setCurrentWorkout(wipedWorkout)

      fetch(`${session.API_URL}/set_detail/${currentSet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          weight: weight,
          reps: reps,
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
        
      })  
    }

    const changeTime = () => {
      setDisplayCount(newTime)
      setEditTimer(false)
      console.log(newTime)
    }

    const formatTime = (time) => {
      const seconds = (`0${time % 60}`).slice(-2);
      const minutes = (`0${Math.floor(time / 60)}`).slice(-2)
  
      return `${minutes}:${seconds}`
    }

    const updateNewWeight = (e) => {
      setNewSet({...newSet, newWeight: e.target.value})
    }

    const updateNewReps = (e) => {
      setNewSet({...newSet, newReps: e.target.value})
    }

      

    return (
      <> 
      {
        loading ? (<Loading />) : null
      }
      {
        focus ? (
          <>
          <Header showProfileIcon={false} title={workout.title}/>
          <div className='exercise-container'>
            <div className='start-exercise-header'>
              <h1>Exercise {currentExercise.exercise_num}: {currentExercise.title}</h1>
            </div>
              
              <div className='counter-container' >
                  {
                      editTimer === false ? (
                          <>
                              <p className='counter' onClick={() => {
                                setEditTimer(true)
                                stopCounting()
                                }}>
                                  {displayCount - timeDiff <= 0 ? (formatTime(0)) : (formatTime(displayCount - timeDiff))}
                              </p>
                              <div className='button-container'>
                                  <button
                                      type="button"
                                      className={
                                          displayCount - timeDiff <= 0 ?
                                              "btn btn-outline-success disabled btn-lg" :
                                              "btn btn-outline-success btn-lg"
                                      }
                                      onClick={
                                          displayCount - timeDiff <= 0 ?
                                              null :
                                              startCounting
                                      }
                                  >
                                      Start
                                  </button>
                                  <button
                                      type="button"
                                      className="btn btn-outline-danger btn-lg"
                                      onClick={stopCounting}
                                  >
                                      Stop
                                  </button>
                              </div>
                          </>
                      ) : (
                        <div className='edit-timer-container'>
                        <input className='edit-timer' type='number' value={newTime} onChange={(e) => {setNewTime(e.target.value)}}/>
                        <button type="button" class="edit-timer-button btn btn-outline-primary" onClick={(e) => {changeTime(e)}}>Edit</button>
                        </div>
                      )
                  }
              </div>
              <div className='sets-container'>
                  <div className='old-set-container'>
                      <h5>Previous Set: {currentSet.reps} x {currentSet.weight}</h5>
                  </div>
                  <div className='set-container'>
                      <h3>Set {currentSet.set_num}:</h3>
                      <input type="number" className='rep-input' value={newSet.newReps} onChange={(e) => updateNewReps(e)}/>
                      <h3>x</h3>
                      <input type="number" className='weight-input' value={newSet.newWeight} onChange={(e) => updateNewWeight(e)}/>
                      <h3>lbs</h3>
                      <button
                          type="button"
                          className={
                              newSet.newWeight === 0 || newSet.newWeight === '' ?
                                  "next-button btn btn-outline-primary btn-lg disabled" :
                                  "next-button btn btn-outline-primary btn-lg"
                          }
                          onClick={
                              newSet.newWeight !== 0 || newSet.newWeight !== '' ?
                                  () => {
                                      updateSet();
                                  } : null
                          }
                      >
                          Next
                      </button>
                  </div>
                  <button onClick={() => {setFocus(false)}} type="button" class="overview-button btn btn-outline-primary">Overview</button>
              </div>
          </div>
          </>
        ) : (
          <Unfocused workout={workout} setFocus={setFocus} setSetCount={setSetCount} setExerciseCount={setExerciseCount}
          setCurrentExercise={setCurrentExercise} setCurrentSet={setCurrentSet} timerStart={timerStart}
          completeWorkout={completeWorkout} currentWorkout={currentWorkout} setCurrentWorkout={setCurrentWorkout}
          currentExercise={currentExercise} currentSet={currentSet}/>
        )
      }
      </>
          
  )
}

export default StartWorkout