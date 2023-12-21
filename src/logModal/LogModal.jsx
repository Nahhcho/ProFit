import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { MdClose } from "react-icons/md"
import { Context } from '../components/contextProvider'
import { useNavigate } from 'react-router-dom'
import './logModal.css'

const LogModal = ({ completedWorkout, setShowLog, showLog, date, dateString, deleteLog }) => {

    const [session, setSession] = useContext(Context)
    const navigate = useNavigate()
    
  return (
    <Modal show={showLog} centered style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <Modal.Body className='profile-div'>
            <div className='profile-head'>
                <h6>Workouts: </h6>
                <MdClose size={20} color='white' onClick={() => {setShowLog(false)}}/>
            </div>
            <div className='profile-edit-container'>
            {
                
                session.user.workouts.filter(workout => workout.completed_date === null).map(workout => (
                <>
                <div className='setting-container'>
                    <p className='setting-title'>{workout.title}</p>
                    <button className='setting-target btn btn-outline-success btn-sm' onClick={() => {
                        navigate(`/log/${encodeURIComponent(JSON.stringify(workout))}/${date}/${dateString}`)
                    }}>Log Workout</button>
                </div>
                <hr className='line'/>
                </>
                ))
               
            }
            {
                completedWorkout ? (
                    <button className='delete-log-button btn btn-outline-danger' onClick={deleteLog}>Delete Log</button>
                ) : null
            }
            
            </div>

        </Modal.Body>
    </Modal>
  )
}

export default LogModal