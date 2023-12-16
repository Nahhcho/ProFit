import React, { useEffect, useState } from 'react'

const Progress = ({ projectedWorkout, completedWorkout }) => {

    const [projectedVolume, setProjectedVolume] = useState(0)
    const [completedVolume, setCompletedVolume] = useState(0)

    useEffect(() => {
        if(completedWorkout !== null && completedWorkout !== undefined) {
            if(completedWorkout.volume !== null && completedWorkout.volume !== undefined) {
              setCompletedVolume(completedWorkout.volume)
            }
          }
          if(projectedWorkout !== null && projectedWorkout !== undefined) {
            if(projectedWorkout.volume !== null && completedWorkout.volume !== undefined) {
              setProjectedVolume(projectedWorkout.volume)
            }
          }
    }, [])

    const calcultePercentage = (max, min) => {
        return (100/max) * min
      }

  return (
    <>
              {
              completedWorkout ? (
                <div className='progress-container'>
                  <h6>Today's Volume: {completedWorkout.volume}</h6>
                  <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style=
                    {
                      projectedVolume > completedVolume ? {width: `${calcultePercentage(projectedVolume, completedVolume)}%`} : {width: '100%'} 
                    }></div>
                  </div>
                </div>
              ) : null
              }
              <div className='progress-container'>
                <h6>Previous Best: {projectedWorkout.volume === null ? 0 : projectedWorkout.volume}</h6>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style=
                  {
                    projectedVolume > completedVolume ? {width: '100%'} : {width: `${calcultePercentage(completedVolume, projectedVolume)}%`}
                  }></div>
                </div>
              </div>
          </>
  )
}

export default Progress