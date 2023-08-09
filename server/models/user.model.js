import { Schema ,model} from "mongoose";
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
   
},
password:{
    type:'String',
    required:[true,"Password is Required"],
    minLength:[8,"Password must be atleast 8 charchter"],
    maxLength:[50,"Password should be less than 50 charchter"],
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
forgotPasswordExpiry:Date
},
{
    timestamps:true
}
);

userSchema.pre('save',async function(save){
    if(!this.isModified('password')){
        next();
        this.password=await bcrypt.hash(this.password,10)
    }
})


userSchema.methods= {
genereteJWTToken: async function()
{
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
confirmPassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
}
}


const User=model('User',userSchema);

export default User;