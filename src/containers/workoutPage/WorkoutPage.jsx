import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import WorkoutCard from '../../components/workoutCard/WorkoutCard'
import Nav from '../../components/nav/Nav'
import AddButton from '../../components/addButton/AddButton'
import './workoutPage.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../components/contextProvider'
import Loading from '../../components/loading/Loading'

const WorkoutPage = () => {

    const navigate = useNavigate()
    const [session] = useContext(Context)
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
      console.log(workouts)
      if(session.user === null) {
        navigate('/signin')
      }
      else {
        setWorkouts(session.user.workouts.filter(workout => workout.completed_date === null))
      }
    }, [])

  return (
    <>
    {
      session.user === null || workouts === null ? (navigate('/signin')) : (
        <div>
          
    <Header showProfileIcon={true} title='Workouts'/>
    <ul class="tab-nav nav nav-tabs">
      <li class="nav-item">
        <p class="current-tab nav-link active" aria-current="page">Workouts</p>
      </li>
      <li class="nav-item">
        <p class="nav-link" onClick={() => {navigate('/splits')}}>Workout Splits</p>
      </li>
    </ul>
    <div className='workouts-container'>
    <AddButton endpoint={'/create'}/>
    
    {
      workouts.map(workout => (
        <WorkoutCard workout={workout}/>
      ))
    }
    </div>
    <Nav />
    </div>
      )
    }
    </>
    
  )
}

export default WorkoutPage