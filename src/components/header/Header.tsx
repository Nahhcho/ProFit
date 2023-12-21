import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../contextProvider'
import userPic from './user.jpg'
import './header.css'
import ProfileModal from '../profileModal/ProfileModal'

interface HeaderProps {
    title: string,
    showProfileIcon: boolean
}

const Header: FC<HeaderProps> = ({ title, showProfileIcon }) => {
    const [showProfile, setShowProfile] = useState(false)

    return (
        <>
        <ProfileModal showProfile={showProfile} setShowProfile={setShowProfile}/>
        <nav className={showProfileIcon ? 'header' : 'header-center'}>
            {
                showProfileIcon ? (
                    <>
                    <img className='user-pic' src={userPic} onClick={() => {setShowProfile(true)}} alt="" />
                    <h4 className='header-title'>{title}</h4>
                    <img className='dummy' src={userPic}  />
                    </>
                ) : (
                    <h4 className='header-title'>{title}</h4>
                )
            }
            
            
        </nav>
        </>
    )
}

export default Header