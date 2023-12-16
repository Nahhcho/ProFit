import React, { useEffect, useState } from 'react'
import './loading.css'
import loadingGif from './loading.gif'
import Modal from 'react-bootstrap/Modal'

const Loading = () => {


  return (
    <>
       <Modal show={true} centered>
            <Modal.Body>
                <img className='loading-gif' src={loadingGif} alt="loading..." />
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Loading