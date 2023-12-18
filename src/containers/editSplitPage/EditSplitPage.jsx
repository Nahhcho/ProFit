import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../components/contextProvider'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import Loading from '../../components/loading/Loading'
import { jwtDecode } from 'jwt-decode'

const EditSplitPage = () => {
    
    const [session, setSession] = useContext(Context)
    const { splitId } = useParams()
    const [split, setSplit] = useState(null)
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const [workouts] = useState(session.user.workouts.filter(workout => workout.completed_date === null))
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const userSplit = session.user.splits.filter(split => split.id == splitId)[0]
        const userSchedule = userSplit.schedule
        console.log(userSchedule)
        let idSplit = {}
        Object.keys(userSchedule).map(key => (
            userSchedule[key] === null || userSchedule[key] == undefined ? 
            idSplit[key] = null :
            idSplit[key] = userSchedule[key].id.toString()
        )) 
       console.log(idSplit)
       setTitle(userSplit.title)
       setSplit(idSplit)
    }, [])

    useEffect(() => {
        console.log(split)
    }, [split])

    const editSplit = () => {
        setLoading(true)
        fetch(`${session.API_URL}/split_detail/${splitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                schedule: split,
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
            setLoading(false)
            navigate('/')
        })
    }

    const deleteSplit = () => {
        setLoading(true)
        fetch(`${session.API_URL}/split_detail/${splitId}`, {
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
          console.log(data)
          setLoading(false)
          navigate('/')
          })
    }

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

  return (
    <>
     {
        loading ? <Loading /> : null
     }
     {
        split ? (
            <>
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
                                split[key] == workout.id ? 
                                <option className='option' value={workout.id} selected>{workout.title}</option> 
                                :
                                <option className='option' value={workout.id}>{workout.title}</option>
                            ))
                        }
                    </select>
                    </div>
                ))
            }
            </div>
        
            <div className='edit-button-container'>
            <button type="button" class="edit-workout-button btn btn-outline-success" onClick={editSplit}>Save Split</button>
            <button type="button" class="edit-workout-button btn btn-outline-danger" onClick={deleteSplit}>Delete Split</button>
            </div>
    </div>
    <Nav />
    </>
        ) : null
     }
    
    </>
  )
}

export default EditSplitPage