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
    </Routes>
    </ContextProvider>
  );
}

export default App;
