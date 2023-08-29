import { Router } from 'express';
import {removeCourse, updateCourse, createCourse, getAllCourses, getLecturesByCourseId, addLecturesByCourseId } from '../controllers/course.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'
const router=Router();


router.route('/')
        .get(getAllCourses)  //done
        .post(
                isLoggedIn,
                authorizedRoles('ADMIN'),
            upload.single('thumbnail'),
            createCourse  //done
            );
        
router.route('/:id')  
        .get(isLoggedIn,getLecturesByCourseId)  //done
        .put(isLoggedIn,
                authorizedRoles('ADMIN'),       //pending
                updateCourse) //pending
        .delete(
                isLoggedIn,
                authorizedRoles('ADMIN'),
                removeCourse
                ) 
        .post(                          //done
                isLoggedIn,
                authorizedRoles('ADMIN'),
                upload.single('lecture'),
                addLecturesByCourseId   
                );


export default router;