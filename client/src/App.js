import './App.css'

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutUs from './Pages/AboutUs.js';
import Contact from './Pages/Contact';
import CourseList from './Pages/Course/CourseList';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage.js';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';

function App() {
  return(
    <>
    <Routes>
      <Route path='/' element={<HomePage />}> </Route>
      <Route path='/about' element={<AboutUs />}> </Route>
      <Route path='/signup' element={<SignUp />}> </Route>
      <Route path='/login' element={<Login />}> </Route>
      <Route path='/contact' element={<Contact />}> </Route>
      <Route path='/denied' element={<Denied />}> </Route>
      <Route path='/courses' element={<CourseList />}> </Route>
      <Route path='*' element={<NotFound />}> </Route>
    </Routes> 
      </>
  )
}

export default App;
