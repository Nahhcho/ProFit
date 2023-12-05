import './App.css';
import { ContextProvider } from './components/contextProvider';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import { Route, Routes } from "react-router-dom";
import WorkoutCard from './components/workoutCard/WorkoutCard';
import Signin from './components/signin/Signin';
import Register from './components/register/Register'
import PrivateRoute from './components/privateRoute/PrivateRoute';
import WorkoutPage from './containers/workoutPage/WorkoutPage';
import CreateWorkoutPage from './containers/createWorkoutPage/CreateWorkoutPage';
import StartWorkout from './containers/startWorkout/StartWorkout';

function App() {
  return (
    <ContextProvider>
    <Routes>
    <Route path='/signin' element={<Signin />} />
    <Route path='/register' element={<Register />} />
    <Route path='/' element={<WorkoutPage />} />
    <Route path='/create' element={<CreateWorkoutPage />} />
    <Route path='/start/:workoutData' element={<StartWorkout />} />
    </Routes>
    </ContextProvider>
  );
}

export default App;
