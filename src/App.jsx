import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login/Login'
import Landing from './Components/Landing'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './Components/Register/Register'
import About from './Components/About'
import Contact from './Components/Contact'
import ProjectType from './Components/ProjectType/ProjectType'
import ProjectTypeCategory1 from './Components/ProjectTypeCategory1/ProjectTypeCategory1'
import ProjectTypeCategory from './Components/ProjectTypeCategory/ProjectTypeCategory'
import Templates1 from './Components/InteriorTemplates/Templates1'
import Templates2 from './Components/InteriorTemplates/Templates2'
import Templates3 from './Components/InteriorTemplates/Templates3'
import ConstructionTemplate1 from './Components/constructionTemplates/temp1'
import Temp2 from './Components/constructionTemplates/temp2'
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
      <Route path='/paint-templates' element={<Templates1 />} />
      <Route path='/ceiling-templates' element={<Templates2 />} />
      <Route path='/lighting-templates' element={<Templates3 />} />
      <Route path='/temp2' element={<Temp2 />} />
      <Route path='/construction-template-1' element={<ConstructionTemplate1 />} />
      <Route path="/project-category" element={<ProjectTypeCategory />} />
      <Route path='/project-category1' element={<ProjectTypeCategory1 />} />
    </Routes>
    </BrowserRouter>
    
    
      
    </>
  )
}

export default App
