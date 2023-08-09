//import http module 
import http from 'http';
import { app } from './app.mjs';
import connectionToDB from './config/dbConnection.js';

const PORT= 5000 || process.env.PORT;

const server = http.Server(app);

server.listen(PORT, async () => {
    await connectionToDB();
    console.log(`App is running on http://localhost:${PORT}`);
       
});