import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login/Login'
import Landing from './Components/Landing'
import { Routes, Route, BrowserRouter } from'react-router-dom'
import Register from './Components/Register/Register'
import About from './Components/About'
import Contact from './Components/Contact'
import ProjectType from './Components/ProjectType/ProjectType'
import ProjectTypeCategory from './Components/ProjectTypeCategory/ProjectTypeCategory'
import Templates1 from './Components/Templates/Templates1'

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
      <Route exact path="/register" element={<Register />} />
      <Route path="/about/*" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/project-type" element={<ProjectType />} />
      <Route path="/project-category" element={<ProjectTypeCategory />} />
      <Route path="/paint-templates" element={<Templates1 />} />
    </Routes>
    </BrowserRouter>
    
    
      
    </>
  )
}

export default App
