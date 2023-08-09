import { Router } from "express";
import { register,login,logout,getProfileDetails } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router=Router()

router.post('/register',register);
router.post('/login',login);
router.get('./logout',logout);
router.get('/me',isLoggedIn,getProfileDetails);





export default router;