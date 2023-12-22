import React from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './warningModal.css'

const WarningModal = ({showWarning, setShowWarning}) => {

    const navigate = useNavigate()

  return (
    <Modal show={showWarning} centered style={{paddingLeft: '20px', paddingRight: '20px'}}>
        <Modal.Body className='warning-modal-div'>
            <button type="button" class="btn-close btn-close-white" onClick={() => {setShowWarning(false)}} aria-label="Close"></button>
            <h4>Are you sure you want to end your workout?</h4>
            <button type="button" class="btn btn-outline-danger" onClick={() => {navigate('/')}}>End Workout</button>
        </Modal.Body>
    </Modal>
  )
}

export default WarningModal