import React from 'react'
import chatLoad from './chat-loading.gif'
import './message.css'
import { useNavigate } from 'react-router-dom'

const Message = ({ message, chatter, modelWorkout}) => {

  const navigate = useNavigate()
    
  return (
    <div class="message-container">
        <h5 className='chatter'>{chatter}:</h5>
        {
          message === '' ? 
            <img className='chat-loading' src={chatLoad} alt="loading" /> :
            <>
            <p className='chat-text'>{message}</p>
            {
              modelWorkout !== '' ? (
                <button type="button" class="btn btn-outline-success" onClick={() => {
                  navigate(`/recommended/${encodeURIComponent(JSON.stringify(modelWorkout))}`)
                }}>View Workout</button>
              ) : (null)
            }
            </>
        }
    </div>
  )
}

export default Message