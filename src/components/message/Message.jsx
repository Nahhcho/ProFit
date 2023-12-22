import React from 'react'
import './message.css'

const Message = ({ message, chatter}) => {
    
  return (
    <div class="message-container">
        <h5 className='chatter'>{chatter}:</h5>
        <p className='chat-text'>{message}</p>
        
    </div>
  )
}

export default Message