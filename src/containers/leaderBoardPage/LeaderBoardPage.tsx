import React, { FC } from 'react'
import Nav from '../../components/nav/Nav'
import Header from '../../components/header/Header'

const LeaderBoardPage: FC = () => {
  return (
    <div className='leaderboard-container'>
        <Header title={'Leaderboard'}/>
            
        <Nav />
    </div>
  )
}

export default LeaderBoardPage