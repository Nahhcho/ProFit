import './App.css';
import { Context, ContextProvider } from './components/contextProvider';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import { Route, Routes } from "react-router-dom";
import WorkoutCard from './components/workoutCard/WorkoutCard';
import Signin from './components/signin/Signin';
import Register from './components/register/Register'
import WorkoutPage from './containers/workoutPage/WorkoutPage';
import CreateWorkoutPage from './containers/createWorkoutPage/CreateWorkoutPage';
import StartWorkout from './containers/startWorkout/StartWorkout';
import { useContext, useEffect } from 'react';
import EditWorkout from './containers/editWorkout/EditWorkout';
import ActivityPage from './containers/activityPage/ActivityPage';
import WorkoutSplit from './containers/workoutSplit/WorkoutSplit';
import CreateSplit from './containers/createSplit/CreateSplit';
import ViewWorkoutPage from './containers/viewWorkoutPage/ViewWorkoutPage';
import EditSplitPage from './containers/editSplitPage/EditSplitPage';
import LeaderBoardPage from './containers/leaderBoardPage/LeaderBoardPage';
import LogWorkout from './containers/logWorkout/LogWorkout';
import Chat from './containers/chat/Chat';

function App() {


  return (
    <ContextProvider>
    <Routes>
    <Route path='/signin' element={<Signin />} />
    <Route path='/register' element={<Register />} />
    <Route path='/' element={<WorkoutPage />} />
    <Route path='/create' element={<CreateWorkoutPage />} />
    <Route path='/activity' element={<ActivityPage />} />
    <Route path='/start/:workoutData' element={<StartWorkout />} />
    <Route path='/edit/:workoutData' element={<EditWorkout />} />
    <Route path='/splits' element={<WorkoutSplit />} />
    <Route path='/createSplit' element={<CreateSplit />} />
    <Route path='/view/:workoutData' element={<ViewWorkoutPage />} />
    <Route path='/editSplit/:splitId' element={<EditSplitPage />} />
    <Route path='/leaderboard' element={<LeaderBoardPage />} />
    <Route path='/log/:workoutData/:date/:dateString' element={<LogWorkout />} />
    <Route path='/chat' element={<Chat />} />
    </Routes>
    </ContextProvider>
  );
}

export default App;
