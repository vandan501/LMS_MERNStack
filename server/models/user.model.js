import { Schema ,model} from "mongoose";
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';



const userSchema=new Schema({
fullName:{
    type:'String',
    required:[true,"Name is Required"],
    minLength:[5,"Name must be atleast 5 charchter"],
    maxLength:[50,"Name should be less than 50 charchter"],
    lowercase:true,
    trim:true,
    
},
email:{
    type:'String',
    required:[true,"Email Required"],
    lowercase:true,
    trim:true,
    unique:true,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
    ],
   
},
password:{
    type:'String',
    required:[true,"Password is Required"],
    minLength:[8,"Password must be atleast 8 charchter"],
    select:false
},
avatar:{
    public_id:{
        type:'String'
    },
    secure_url:{
        type:'String'
    }
},
role:{
        type:'String',
        enum:['USER','ADMIN'],
        default:'USER'
},
forgotPasswordToken:String,
forgotPasswordExpiry:Date,
subscription:{
    id:String,
    status:String
}
},
{
    timestamps:true
}
);

// Hashes password before saving to the database
userSchema.pre('save', async function (next) {
    // If password is not modified then do not hash it
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
  });

userSchema.methods = {

        // method which will help us compare plain password with hashed password and returns true or false
        comparePassword: async function (plainPassword) {
          return await bcrypt.compare(plainPassword, this.password);
        },
      

    generateJWTToken: async function() {
        return await jwt.sign(
            {
                 id: this._id, 
                email: this.email, 
                subscription: this.subscription, 
                role: this.role 
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    
    generatePasswordResetToken:async function(){
        const resetToken=crypto.randomBytes(20).toString('hex');


        this.forgotPasswordToken=crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
            ;
        this.forgotPasswordExpiry=Date.now() + 15 * 60 *1000;//15 min from now
        return resetToken;
    }
}

const User=model('User',userSchema);

export default User;