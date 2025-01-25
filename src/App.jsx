import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login/Login'
import Landing from './Components/Landing'
import { Routes, Route, BrowserRouter } from'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Landing /> */}
    {/* <Login /> */}
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
    
    
      
    </>
  )
}

export default App
