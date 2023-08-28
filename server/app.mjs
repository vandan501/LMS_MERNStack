import dotenv from 'dotenv'; // Import dotenv package
dotenv.config(); // Load environment variables from .env file
import userRoutes from './routes/user.routes.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.routes.js';

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true
}));



app.use('/ping',(req,res)=>{
res.send('Pong');
})

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/course',courseRoutes);




// three modules

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !  404 Page Not Found ')
})

app.use(errorMiddleware);

export { app };