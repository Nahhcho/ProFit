import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import './createSplit.css'
import { Context } from '../../components/contextProvider'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/Loading'

const CreateSplit = () => {
    const [title, setTitle] = useState('')
    const [session, setSession] = useContext(Context)
    const navigate = useNavigate()
    const [workouts] = useState(session.user.workouts.filter(workout => workout.completed_date === null))
    const [loading, setLoading] = useState(false)
    const [split, setSplit] = useState({
        Sunday: null,
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: null
    })

    useEffect(() => {
        console.log(split)
    }, [split])

    const updateSplit = (e, key) => {
        const newSplit = split
        if(e.target.value === 'Rest') {
            newSplit[key] = null
        }
        else {
            newSplit[key] = e.target.value
        }
        console.log(newSplit)
        setSplit(newSplit)
    }

    const createSplit = () => {
        setLoading(true)
        fetch(`${session.API_URL}/create_split`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: session.user.id,
                title: title,
                split: split
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
            setLoading(false)
            navigate('/')
        })
        
    }


  return (
    <>
    {
        loading ? <Loading /> : null
        
    }
    <Header title={'Workout Splits'} />
    <div className='workout-form-container'>
        <h1>New Split</h1>
        <label for="workoutTitle" className="form-label">Title</label>
        <input type="text" id="workoutTitle" class="form-control" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
        <div className='split-days-container' >
        {
            Object.keys(split).map(key => (
                <div className='day-div'>
                <h4>{key}</h4>
                <select className='menu' onChange={(e) => {updateSplit(e, key)}}>
                <option className='option' value='Rest'>Rest</option>
                    {
                        workouts.map(workout => (
                            <option className='option' value={workout.id}>{workout.title}</option>
                        ))
                    }
                </select>
                </div>
            ))
        }
        </div>

        <button type="button" class="btn btn-outline-success" onClick={createSplit}>Save Workout Split</button>

    </div>
    <Nav />
    </>
  )
}

export default CreateSplit