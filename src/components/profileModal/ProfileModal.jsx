import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import './profileModal.css'
import { Context } from '../contextProvider'

const ProfileModal = ({ showProfile, setShowProfile }) => {

    const [session, setSession] = useContext(Context)

    useEffect(() => {
        console.log(session.user)
    })

  return (
    <Modal show={showProfile} centered style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <Modal.Body className='profile-div'>
            <div className='profile-head'>
                <h6>Profile Settings</h6>
                <button type="button" class="btn-close btn-close-white" onClick={() => {setShowProfile(false)}} aria-label="Close"></button>
            </div>
            <div className='profile-edit-container'>

                <div className='setting-container'>
                <p className='setting-title'>Name:</p>
                <p className='setting-target'>{session.user.first_name}</p>
                </div>

                <hr className='line'/>

                <div className='setting-container'>
                <p className='setting-title'>Weight:</p>
                <p className='setting-target'>{session.user.weight}</p>
                </div>

                <hr className='line'/>

                <div className='setting-container'>
                <p className='setting-title'>Age:</p>
                <p className='setting-target'>{session.user.age}</p>
                </div>

                <hr className='line'/>
                
                <div className='setting-container'>
                <p className='setting-title'>Current Split:</p>
                <p className='setting-target'>
                {
                    session.user.current_split ? 
                        <>{session.user.current_split.title}</> : null
                }
                </p>
                </div>
                
                <hr className='line'/>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default ProfileModal