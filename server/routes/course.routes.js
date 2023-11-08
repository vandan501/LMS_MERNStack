import { Router } from 'express';
import {removeCourse, updateCourse, createCourse, getAllCourses, getLecturesByCourseId, removeLectureFromCourse , addLecturesByCourseId } from '../controllers/course.controller.js';
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
            )
        .delete 
                (
                isLoggedIn ,
                authorizedRoles('ADMIN'),
                removeLectureFromCourse
                 );

router.route('/:id')  
        .get(isLoggedIn,getLecturesByCourseId)  //done
        .put(isLoggedIn,
                authorizedRoles('ADMIN'),       //done
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