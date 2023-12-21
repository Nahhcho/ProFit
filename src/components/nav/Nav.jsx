import React, { useContext } from 'react'
import './nav.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../contextProvider'

const Nav = () => {

  const navigate = useNavigate()
  const [session, setSession] = useContext(Context)

  return (
    <div className='nav-container'>
    <hr className='nav-line'/>
    <nav className='navbar'>
        <p onClick={() => {navigate('/')}}>Workouts</p>
        <p onClick={() => {navigate('/activity')}}>Activity</p>
        <p onClick={() => {navigate('/leaderboard')}}>Leaderboard</p>
        <p onClick={() => {
          localStorage.removeItem('authTokens');
          setSession({
            ...session,
            user: null,
            authTokens: null
          })
          navigate('/signin')
        }}>Sign Out</p>
    </nav>
    </div>
  )
}

export default Nav