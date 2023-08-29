import { Router } from "express";
import { register,login,logout,getProfileDetails, forgotPassword ,resetPassword ,changePassword ,updateUser} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import  {isLoggedIn} from "../middlewares/auth.middleware.js";
const router=Router()

router.post('/register',upload.single("avatar"),register);  //DONE
router.post('/login',login);  //DONE
router.get('/logout',logout);  //DONE
router.get('/profile', isLoggedIn ,getProfileDetails); //done
router.post('/reset',forgotPassword); //done
router.post('/reset/:resetToken',resetPassword); //to be check
router.post('/change-password', isLoggedIn, changePassword);//done
router.put('/update', isLoggedIn, upload.single("avatar"), updateUser) // pending






export default router;