import React, { useContext, useEffect, useState } from 'react'
import './activityPage.css'
import DateHeader from '../../components/dateHeader/DateHeader'
import Nav from '../../components/nav/Nav'
import WeekHeader from '../../components/weekHeader/WeekHeader'
import { Context } from '../../components/contextProvider'
import Progress from '../../components/progress/Progress'
import Summary from '../../components/summary/Summary'
import { useNavigate } from 'react-router-dom'

interface Workout {
  id: number,
  title: string,
  exercises: Exercise[],
  completed_date?: string,
  volume?: number
}

interface Exercise {
  id: number,
  title: string,
  exercise_num: number,
  sets: Set[]
}

interface Set {
  id: number,
  reps: number,
  set_num: number,
  weight: string
}

const ActivityPage = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const dayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName: string = dayNames[currentDate.getDay()]
    const [session] = useContext(Context)
    const [completedWorkout, setCompletedWorkout] = useState<Workout | null>(null)
    const [projectedWorkout, setProjectedWorkout] = useState<Workout | null>(null)
    const [projectedVolume, setProjectedVolume] = useState<number>(0)
    const [completedVolume, setCompletedVolume] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
      if (session.user.current_split !== null) {
        setProjectedWorkout(session.user.current_split.schedule[dayName])
      }
      setCompletedWorkout(session.user.workouts.filter((workout: Workout) => workout.completed_date === formatDate(currentDate))[0])
      console.log(session.user.workouts)
    }, [currentDate])

    useEffect(() => {
      const newDate: Date = new Date(currentDate)
      newDate.setDate(newDate.getDate())
      setCurrentDate(newDate)
    }, [])
    
    useEffect(() => {
      if(completedWorkout !== null && completedWorkout !== undefined) {
        if(completedWorkout.volume !== null && completedWorkout.volume !== undefined) {
          setCompletedVolume(completedWorkout.volume)
        }
      }
      if(projectedWorkout !== null && projectedWorkout !== undefined) {
        if(projectedWorkout.volume !== null && projectedWorkout.volume !== undefined) {
          setProjectedVolume(projectedWorkout.volume)
        }
      }
    }, [completedWorkout])

    useEffect(() => {
      console.log(completedVolume)
      console.log(projectedVolume)
    }, [completedVolume])

    const formatDate = (date: Date): string => {
      const year: number = date.getFullYear()
      const month: string = (date.getMonth() + 1).toString().padStart(2, '0')
      const day: string = date.getDate().toString().padStart(2, '0')
      
      const completedDate: string = `${year}-${month}-${day}`
      return completedDate
    }

    const handleDateChange = (newDate: Date): void => {
        setCurrentDate(newDate)
      }

  return (
    <div className='activity-container'>
        <DateHeader currentDate={currentDate} setCurrentDate={handleDateChange}/>
        <WeekHeader currentDay={dayName} currentDate={currentDate} />
        
        <div className='completed-workout-div'>
          {
            completedWorkout ?
            (
              <h4>Workout Completed: {completedWorkout.title}</h4>
            ) 
            :
            (
              
              projectedWorkout ? (
                <h4>Projected Workout: {projectedWorkout.title}</h4>
              ) : (
                session.user.current_split ? (<h4>Rest Day</h4>) : (<h4>No Current Split Set</h4>)
              
              )
            )
          }
          {
            projectedWorkout ? <Progress completedWorkout={completedWorkout} projectedWorkout={projectedWorkout}/> : null
          }
          
        </div>
        <Summary completedWorkout={completedWorkout} projectedWorkout={projectedWorkout} />
        <div className='activity-button-div'>
          {
            completedWorkout ? (
              <button type="button" className="activity-button btn btn-outline-success" onClick={() => {
                navigate(`/view/${encodeURIComponent(JSON.stringify(completedWorkout))}`)
              }}>View Workout</button> 
              ) : (
                projectedWorkout && currentDate.toDateString() === new Date().toDateString() ? (
                <button type="button" className="activity-button btn btn-outline-success" onClick={() => {
                  navigate(`/start/${encodeURIComponent(JSON.stringify(projectedWorkout))}`)
                }}>Start Workout</button>
                ) : null
              )
          }
        
        </div>
        <Nav />
    </div>
  )
}

export default ActivityPage