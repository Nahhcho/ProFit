import React, { useState, useRef, useEffect } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import derek from './derek.jpg'
import './chat.css'
import Message from '../../components/message/Message'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const chatContainerRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    };

    const sendMessage = () => {
        const newMessages = [...messages, { chatter: 'You', text: message }]
        setMessages(newMessages)
        setMessage('')
        scrollToBottom()
    };

    return (
        <>
            <Header showProfileIcon={true} title={'Chat'} />
            <div className='chat-container' ref={chatContainerRef}>

                <div className='derek-container'>
                    <img className='derek' src={derek} alt="broke" />
                </div>

                <div className='messages'>
                    {
                        messages?.length > 0 && messages.map((msg, index) => (
                            <Message key={index} chatter={msg.chatter} message={msg.text} />
                        ))
                    }
                </div>

            </div>
            <div className='send-chat-container'>

                <input
                    type="text"
                    className='chat-input'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="button" onClick={sendMessage} className="btn btn-outline-primary">Send</button>
            </div>
            <Nav />
        </>
    );
};

export default Chat;
