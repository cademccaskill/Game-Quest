import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import { GameDashBoard } from './components/GameDashboard'
import { NavBar } from './nav/NavBar'
import { Welcome } from './Welcome/Welcome'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { Authorized } from './views/Authorized'

export const App = () => {
  return (
    <Routes>
      {/* Public routes - no NavBar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes - with NavBar */}
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
        <Route path="GameDashboard" element={<GameDashBoard />} />
      </Route>
    </Routes>
  )
}

export default App