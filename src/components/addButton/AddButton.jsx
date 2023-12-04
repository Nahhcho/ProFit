import React from 'react'
import './addButton.css'
import icon from './add-icon.png'
import { useNavigate } from 'react-router-dom'

const AddButton = () => {

    const navigate = useNavigate()

  return (
    <img className='add-image' src={icon} alt='image' onClick={() => {navigate('/create')}}/>
  )
}

export default AddButton