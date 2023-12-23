import React, { useState, useRef, useEffect, useContext } from 'react'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav'
import derek from './derek.jpg'
import './chat.css'
import Message from '../../components/message/Message'
import { Context } from '../../components/contextProvider'


const Chat = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [session, setSession] = useContext(Context)
    const [loadingMessage, setLoadingMessage] = useState(false)
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
        setLoadingMessage(true)
        const newMessages = [...messages, { chatter: 'You', text: message }]
        setMessages(newMessages)
        setMessage('')
        scrollToBottom()

        fetch(`${session.API_URL}/ask_derek/${session.user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message    
            })
        })
        .then(response => response.json())
        .then(results => {
            console.log(results)
            const newerMessages = [...newMessages, { chatter: 'Derek', text: results.response}]
            setLoadingMessage(false)
            setMessages(newerMessages)
            scrollToBottom()
        })
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
                    {
                        loadingMessage ? (
                            <Message chatter={'Derek'} message={''} />
                        ) : null
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
