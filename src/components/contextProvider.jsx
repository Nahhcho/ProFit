import { jwtDecode } from 'jwt-decode'
import React, { createContext, useState } from 'react'

const Context = createContext()

const ContextProvider = ({ children }) => {
    const [session, setSession] = useState({
        header: 'Workouts',
        API_URL: 'web-production-cffd.up.railway.app',
        user: localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')).user : null,
        authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    })

    return (
        <Context.Provider value={[ session, setSession ]}>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}