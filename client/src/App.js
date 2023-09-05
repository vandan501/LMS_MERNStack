import './App.css'

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutUs from './Pages/AboutUs.js';
import HomePage from './Pages/HomePage.js';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';

function App() {
  return(
    <>
    <Routes>
      <Route path='/' element={<HomePage />}> </Route>
      <Route path='/about' element={<AboutUs />}> </Route>
      <Route path='/signup' element={<SignUp />}> </Route>
      <Route path='*' element={<NotFound />}> </Route>
    </Routes> 
      </>
  )
}

export default App;
