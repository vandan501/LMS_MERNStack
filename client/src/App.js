import './App.css'

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutUs from './Pages/AboutUs.js';
import HomePage from './Pages/HomePage.js';

function App() {
  return(
    <>
    <Routes>
      <Route path='/' element={<HomePage />}> </Route>
      <Route path='/about' element={<AboutUs />}> </Route>
    </Routes> 
      </>
  )
}

export default App;
