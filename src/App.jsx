import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import { GameDashBoard } from './components/GameDashboard'
import { NavBar } from './nav/NavBar'
import { Welcome } from './Welcome/Welcome'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { Authorized } from './views/Authorized'
import { EditGameForm } from './forms/EditGameForm'
import { AddGameForm } from './forms/AddGames'
import { useEffect, useState } from 'react'

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("honey_user");
    const userObj = JSON.parse(storedUser);
    setCurrentUser(userObj);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    
      <Route 
        path="/" 
        element={
          <Authorized>
            <>
              <NavBar />
              <Outlet />
            </>
          </Authorized>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="Welcome" element={<Welcome />} />
        <Route path="GameDashboard" element={<GameDashBoard currentUser={currentUser}/>} />
        <Route path="gameEdit/:gameId" element={<EditGameForm currentUser={currentUser} />} />
        <Route path="games/add" element={<AddGameForm currentUser={currentUser} />} />
      </Route>
    </Routes>
  )
}

export default App