import AppError from "../utils/error.util.js";
import  jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    try {
          
        const { token } = req.cookies;


        console.log("Token cookie set:", token);
        console.log("req.cookies:", req.cookies);
        console.log("req.headers:", req.headers); // Corrected from req.Headers
        console.log("req.headers.cookies:", req.headers.cookies); // Corrected from req.Headers.cookies

        
        if (!token) {
            return next(new AppError('Unauthenticated, please login again', 400));
        }

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = userDetails;

        next();
    } catch (e) {
        return next(new AppError(e.message, 400));
    }
}

const authorizedRoles = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
        return next(
            new AppError('You do not have permission to access this route', 400)
        )
    }
    next();
}

const authorizeSubscriber = async (req, res, next) => {
    try {
        const subscription = req.user.subscription;
        const currentUserRole = req.user.role;
        if (currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
            return next(
                new AppError('Please subscribe to access this route!', 403)
            )
        }

        next();
    } catch (e) {
        return next(new AppError(e.message, 400));
    }
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}