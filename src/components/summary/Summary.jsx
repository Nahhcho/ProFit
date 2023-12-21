import React from 'react'
import './summary.css'

const Summary = ({ completedWorkout, projectedWorkout }) => {
  return (
    <div className='summary-container'>
        <h4>Summary</h4>
        {
            completedWorkout ? (
            <p>
                Today's total volume was {completedWorkout.volume} lbs, 
                {
                    projectedWorkout ? (
                    completedWorkout.volume > projectedWorkout.volume ? 
                    <> {completedWorkout.volume - projectedWorkout.volume} lbs greater than your best.</> :
                    <> {projectedWorkout.volume - completedWorkout.volume} lbs less than your best.</>
                    ) : <> set your current split to compare workouts.</>
                }
            </p>
            ) : (
                <p>No workout logged today</p>        
            )
        }
    </div>
  )
}

export default Summary