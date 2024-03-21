import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}> </Route>
          <Route path='/signup' element={<Signup/>}> </Route>
          <Route path='/home' element={<Home/>}> </Route>
          <Route path='/spinning' element={<SpinningPage />} />
          <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
function SpinningPage(){
  return(
  <iframe title="Spinning" src="/spinning.html" width="100%" height="750px"/>
  );
}
export default App