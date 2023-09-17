import './App.css'

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from './Pages/AboutUs.js';
import Contact from './Pages/Contact';
import CourseDescription from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import CreateCourse from './Pages/Course/CreateCourse';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage.js';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Profile from './Pages/User/Profile';

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
      
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
         <Route path='/course/create' element={<CreateCourse />}> </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path='/user/profile' element={<Profile />}> </Route>
      </Route>
     
      <Route path='/courses' element={<CourseList />}> </Route>
      <Route path='/course/description' element={<CourseDescription />}> </Route>
      <Route path='*' element={<NotFound />}> </Route>
    </Routes> 
      </>
  )
}

export default App;
