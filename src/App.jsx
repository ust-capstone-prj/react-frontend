import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login/Login'
import Landing from './Components/Landing'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
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
import ProjectTypeClient from './Components/ProjectTypeClient/ProjectTypeClient'
import ProjectTypeCategoryClient from './Components/ProjectTypeCategoryClient/ProjectTypeCategoryClient'
import ProjectTypeCategory1Client from './Components/ProjectTypeCategory1Client/ProjectTypeCategory1Client'
import Paints from './Components/InteriorTemplatesClient/Paints'
import Ceilings from './Components/InteriorTemplatesClient/Ceilings'
import Lighting from './Components/InteriorTemplatesClient/Lighting'
import NewHome from './Components/constructionTemplatesClient/NewHome'
import Renovation from './Components/constructionTemplatesClient/Renovation'

// Protected Route Component with role check
const ProtectedRoute = ({ children, allowedRoles }) => {
  const authToken = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');
  
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <>
    {/* <Landing /> */}
    {/* <Login /> */}
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      
      {/* Contractor Routes */}
      <Route path="/project-type" element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <ProjectType />
        </ProtectedRoute>
      } />
      <Route path="/project-category" element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <ProjectTypeCategory />
        </ProtectedRoute>
      } />
      <Route path='/project-category1' element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <ProjectTypeCategory1 />
        </ProtectedRoute>
      } />
      <Route path='/paint-templates' element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <Templates1 />
        </ProtectedRoute>
      } />
      <Route path='/ceiling-templates' element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <Templates2 />
        </ProtectedRoute>
      } />
      <Route path='/lighting-templates' element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <Templates3 />
        </ProtectedRoute>
      } />
      <Route path='/construction-template-1' element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <ConstructionTemplate1 />
        </ProtectedRoute>
      } />
      <Route path='/temp2' element={
        <ProtectedRoute allowedRoles={['CONTRACTOR']}>
          <Temp2 />
        </ProtectedRoute>
      } />

      {/* Client Routes */}
      <Route path="/project-type-client" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <ProjectTypeClient />
        </ProtectedRoute>
      } />
      <Route path="/interior-categories" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <ProjectTypeCategoryClient />
        </ProtectedRoute>
      } />
      <Route path="/construction-categories" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <ProjectTypeCategory1Client />
        </ProtectedRoute>
      } />
      <Route path="/interior/paints" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <Paints />
        </ProtectedRoute>
      } />
      <Route path="/interior/ceilings" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <Ceilings />
        </ProtectedRoute>
      } />
      <Route path="/interior/lighting" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <Lighting />
        </ProtectedRoute>
      } />

      {/* Construction Routes */}
      <Route path="/new-home" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <NewHome />
        </ProtectedRoute>
      } />
      <Route path="/renovation" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <Renovation />
        </ProtectedRoute>
      } />

      {/* Common Routes (accessible by both roles) */}
      <Route path="/about/*" element={
        <ProtectedRoute allowedRoles={['CONTRACTOR', 'CLIENT']}>
          <About />
        </ProtectedRoute>
      } />
      <Route path="/contact" element={
        <ProtectedRoute allowedRoles={['CONTRACTOR', 'CLIENT']}>
          <Contact />
        </ProtectedRoute>
      } />
    </Routes>
    </BrowserRouter>
    
    
      
    </>
  )
}

export default App
