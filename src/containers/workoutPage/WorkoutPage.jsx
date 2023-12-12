import React, { useContext, useEffect } from 'react'
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

    useEffect(() => {
      if(session.user === null) {
        navigate('/signin')
      }
    }, [])

  return (
    <>
    {
      session.user === null ? (navigate('/signin')) : (
        <div>
          
    <Header title='Workouts'/>
    <div className='workouts-container'>
    <AddButton />
    
    {
      session.user.workouts.map(workout => (
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