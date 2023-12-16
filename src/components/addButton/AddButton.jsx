import React from 'react'
import './addButton.css'
import icon from './add-icon.png'
import { useNavigate } from 'react-router-dom'

const AddButton = ({endpoint}) => {

    const navigate = useNavigate()

  return (
    <img className='add-image' src={icon} alt='image' onClick={() => {navigate(endpoint)}}/>
  )
}

export default AddButton