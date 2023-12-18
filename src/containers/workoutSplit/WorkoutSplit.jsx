import React, { useContext, useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import { useNavigate } from 'react-router-dom'
import AddButton from '../../components/addButton/AddButton'
import WorkoutCard from '../../components/workoutCard/WorkoutCard'
import { Context } from '../../components/contextProvider'
import SplitCard from '../../components/splitCard/SplitCard'

const WorkoutSplit = () => {

    const navigate = useNavigate()
    const [session] = useContext(Context)
    

  return (
    <>
    <Header title='Workouts'/>
    <ul class="tab-nav nav nav-tabs">
      <li class="nav-item">
        <p class="nav-link" onClick={() => {navigate('/')}}>Workouts</p>
      </li>
      <li class="nav-item">
        <p class="nav-link active" aria-current="page" >Workout Splits</p>
      </li>
    </ul>
    <div className='workouts-container'>
    <AddButton endpoint={'/createSplit'}/>
      {session.user.splits.map(split => (
        <SplitCard split={split}/>
      ))}
    </div>
    <Nav />
    </>
  )
}

export default WorkoutSplit