import React, { useContext, useEffect } from 'react'
import { Context } from '../contextProvider'
import './header.css'

const Header = ({ title }) => {

    const [session, setSession] = useContext(Context)

    useEffect(() => {
        console.log(session)
    })

    return (
        <nav className='header'>{title}</nav>
    )
}

export default Header