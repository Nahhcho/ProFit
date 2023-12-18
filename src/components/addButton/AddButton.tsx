import React, { FC } from 'react'
import './addButton.css'
import icon from './add-icon.png'
import { useNavigate } from 'react-router-dom'

interface AddButtonProps {
  endpoint: string
}

const AddButton:FC<AddButtonProps> = ({endpoint}) => {

    const navigate = useNavigate()

  return (
    <img className='add-image' src={icon} alt='image' onClick={() => {navigate(endpoint)}}/>
  )
}

export default AddButton