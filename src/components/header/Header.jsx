import React, { useContext, useEffect } from 'react'
import { Context } from '../contextProvider'
import './header.css'

const Header = ({ title }) => {

    return (
        <nav className='header'>{title}</nav>
    )
}

export default Header