import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import settingsImage from './settings.png'
import { Context } from '../contextProvider'
import { jwtDecode } from 'jwt-decode'
import Loading from '../loading/Loading'

const SplitCard = ({ split }) => {

    const navigate = useNavigate()
    const splitArr = Object.entries(split.schedule)
    const [session, setSession] = useContext(Context)
    const [workoutCount, setWorkoutCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        let count = 0
        splitArr.map(([day, workout]) => {
            if(workout !== null) {
                count += 1
            }
        })
        setWorkoutCount(count)
    }, [])

    const setCurrentSplit = () => {
        setLoading(true)
        fetch(`${session.API_URL}/set_split/${session.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                splitId: split.id
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
              console.log(session)
              setLoading(false)
        })
    }

  return (
    <>
    {
        loading ? (
            <Loading />
        ) : null
    }
    <div className='workout-card-container'>
    <div class="card text-center">
      <div class="card-header">
        <h4 className='workout-title'>{split.title}</h4>
        <img className='settings-image' src={settingsImage} />
      </div>
    <div class="card-body">
      <h5 class="card-title">
        {workoutCount} Workouts 
      </h5>
      <p class="card-text">
        {
          splitArr.map(([day, workout]) => (
            workout !== null ? (
               <>{workout.title}, </>
            ) : null
          ))
        }
      </p>
      <button type="button" className={
        split.id === session.user.current_split.id ? (
            'btn btn-outline-success disabled'
        ) : ("btn btn-outline-success")
      } onClick={setCurrentSplit}> Set Current Split </button>
    </div>
  <div class="card-footer text-body-secondary">
    2 days ago
  </div>
  </div>
</div>
</>
  )
}

export default SplitCard