import './App.css'

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from './Pages/AboutUs.js';
import Contact from './Pages/Contact';
import CourseDescription from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import CreateCourse from './Pages/Course/CreateCourse';
import Addlecture from './Pages/Dashboard/Addlecture.js';
import Admindashboard from './Pages/Dashboard/Admindashboard.js';
import Displaylectures from './Pages/Dashboard/Displaylectures.js';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage.js';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Checkout from './Pages/Payment/Checkout';
import CheckoutFail from './Pages/Payment/CheckoutFail.js';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.js';
import SignUp from './Pages/SignUp';
import Editprofile from './Pages/User/Editprofile';
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
      <Route path='/course/addlecture' element={<Addlecture />}> </Route> 
      <Route path='admin/dashboard' element={<Admindashboard />}> </Route> 
         <Route path='/course/create' element={<CreateCourse />}> </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path='/user/profile' element={<Profile />}> </Route>
        <Route path='/checkout/success' element={<CheckoutSuccess />}> </Route>
        <Route path='/checkout' element={<Checkout />}> </Route>
        <Route path='/course/displaylectures' element={<Displaylectures />}> </Route>
        <Route path='/checkout/fail' element={<CheckoutFail />}> </Route>
        <Route path='/user/editprofile' element={<Editprofile />}> </Route>
      </Route>
     
      <Route path='/courses' element={<CourseList />}> </Route>
      <Route path='/course/description' element={<CourseDescription />}> </Route>
      <Route path='*' element={<NotFound />}> </Route>
    </Routes> 
      </>
  )
}

export default App;
