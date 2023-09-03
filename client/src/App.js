import './App.css'

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage.js';

function App() {
  return(
    <>
    <Routes>
      <Route path='/' element={<HomePage />}> </Route>
    </Routes> 
      </>
  )
}

export default App;
