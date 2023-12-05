import React from 'react'
import './nav.css'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate()

  return (
    <div className='nav-container'>
    <hr className='line'/>
    <nav className='navbar'>
        <p onClick={() => {navigate('/workouts')}}>Workouts</p>
        <p>Activity</p>
        <p>Profile</p>
        <p>Leaderboard</p>
    </nav>
    </div>
  )
}

export default Nav