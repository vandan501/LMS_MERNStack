import mongoose from 'mongoose';
mongoose.set('strictQuery',false); //if we write any wrong details dont show error just ignore it 

const connectionToDB= async() =>
{
    try 
    {
        
            const { connection } = await mongoose.connect(
                process.env.MONGO_URI || 'mongodb://127.0.0.0:27017/lms');
            
                if(connection)
                {   
                    console.log(`connected to MONGODB : ${connection.host}`);
                }
    } 
    catch (e) 
    {
    console.log(e);
    process.exit(1);    
    }
}

export default connectionToDB;