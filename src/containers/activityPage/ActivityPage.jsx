import React, { useContext, useEffect, useState } from 'react'
import './activityPage.css'
import DateHeader from '../../components/dateHeader/DateHeader'
import Nav from '../../components/nav/Nav'
import WeekHeader from '../../components/weekHeader/WeekHeader'
import { Context } from '../../components/contextProvider'
import Progress from '../../components/progress/Progress'
import Summary from '../../components/summary/Summary'
import { useNavigate } from 'react-router-dom'
import LogModal from '../../logModal/LogModal'
import { jwtDecode } from 'jwt-decode'
import Loading from '../../components/loading/Loading'


const ActivityPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const dayNames= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName= dayNames[currentDate.getDay()]
    const [session, setSession] = useContext(Context)
    const [completedWorkout, setCompletedWorkout] = useState(null)
    const [projectedWorkout, setProjectedWorkout] = useState(null)
    const [showLog, setShowLog] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      if (session.user.current_split !== null) {
        setProjectedWorkout(session.user.current_split.schedule[dayName])
      }
      setCompletedWorkout(session.user.workouts.filter((workout) => workout.completed_date === formatDate(currentDate))[0])
      console.log(session.user.workouts)
    }, [currentDate])

    useEffect(() => {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate())
      setCurrentDate(newDate)
    }, [])
    
    const formatDate = (date) => {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      
      const completedDate = `${year}-${month}-${day}`
      return completedDate
    }

    const handleDateChange = (newDate) => {
        setCurrentDate(newDate)
      }
    
    const deleteLog = () => {
      setLoading(true)
      fetch(`${session.API_URL}/workout_detail/${completedWorkout?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
        window.location.reload()
      })
      }
    

  return (
    <>
    {
      loading ? <Loading /> : null
    }
    <LogModal completedWorkout={completedWorkout} deleteLog={deleteLog} setShowLog={setShowLog} showLog={showLog} date={formatDate(currentDate)} dateString={currentDate.toDateString()}/> 
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
            projectedWorkout || completedWorkout ? <Progress completedWorkout={completedWorkout} projectedWorkout={projectedWorkout}/> : null
          }
          
        </div>
        <Summary completedWorkout={completedWorkout} projectedWorkout={projectedWorkout} />
        <div className='activity-button-div'>
          {
            completedWorkout ? (
              <>
              <button type="button" className="activity-button btn btn-outline-success" onClick={() => {
                navigate(`/view/${encodeURIComponent(JSON.stringify(completedWorkout))}`)
              }}>View Workout</button>
              <button type="button" className="activity-button btn btn-outline-success" onClick={() => {
                    setShowLog(true)
                  }}>Log Different Workout</button> 
              </>
              ) : (
                projectedWorkout && currentDate.toDateString() === new Date().toDateString() ? (
                <button type="button" className="activity-button btn btn-outline-success" onClick={() => {
                  navigate(`/start/${encodeURIComponent(JSON.stringify(projectedWorkout))}/`)
                }}>Start Workout</button>
                ) : (
                  <button type="button" className="activity-button btn btn-outline-success" onClick={() => {
                    setShowLog(true)
                  }}>Log Workout</button>
                )
              )
          }
        </div>
        <Nav />
    </div>
    </>
  )
}

export default ActivityPage