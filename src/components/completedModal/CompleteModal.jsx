import React, { useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Context } from '../contextProvider'

const CompleteModal = ({ showEnd, completeWorkout, workoutId, setShowEnd, workout }) => {

    const [session, setSession] = useContext(Context)

    useEffect(() => {
        console.log(workout)
    }, [showEnd])

    const askDerek = () => {
        fetch(`${session.API_URL}/ask_derek/${session.user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: JSON.stringify(workout),
              workoutId: workoutId
            })
        })
        .then(response => response.json())
        .then(results => {
            
        })
    }

    return (
        <Modal show={showEnd} centered style={{paddingLeft: '20px', paddingRight: '20px'}}>
            <Modal.Body className='warning-modal-div'>
                <button type="button" class="btn-close btn-close-white" onClick={() => {setShowEnd(false)}} aria-label="Close"></button>
                <h5>Would you like Derek to suggest your target sets for next time?</h5>
                <button type="button" class="btn btn-outline-success" onClick={askDerek}>Yes</button>
                <button type="button" class="btn btn-outline-danger" onClick={completeWorkout}>No</button>
            </Modal.Body>
        </Modal>
    )
}

export default CompleteModal