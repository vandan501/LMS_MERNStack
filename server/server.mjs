//import http module 
import http from 'http';
import  app  from './app.mjs';
import connectionToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary';
const PORT= 5000 || process.env.PORT;
import Razorpay from 'razorpay';



// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
})


const server = http.Server(app);

server.listen(PORT, async () => {
    await connectionToDB();
    console.log(`App is running on http://localhost:${PORT}`);
       
});