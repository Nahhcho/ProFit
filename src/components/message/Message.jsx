import React from 'react'
import chatLoad from './chat-loading.gif'
import './message.css'

const Message = ({ message, chatter, loading}) => {
    
  return (
    <div class="message-container">
        <h5 className='chatter'>{chatter}:</h5>
        {
          message === '' ? 
            <img className='chat-loading' src={chatLoad} alt="loading" /> :
            <p className='chat-text'>{message}</p>
        }
    </div>
  )
}

export default Message