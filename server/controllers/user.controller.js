import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
  secure: true,
};

const register = async (req, res,next) => {
  try {
    const { fullName, email, password } = req.body;
    if ((!fullName, !email, !password)) {
      return next(new AppError("All fields are required", 400));
    }

    const userExiest = await User.findOne({ email });

    if (userExiest) {
      return next(new AppError("Email Already exiest", 400));
    }
    const user = await User.create({
      funnName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "data:image/png;base64,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",
      },
    });
    if (!user) {
      return next(
        new AppError("User registration failed Please try again", 400)
      );
    }

    // ToDO :File Upload
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User registration Successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("all fields are required"), 400);
    }

    const user = await User.findOne({
      email,
    }).select("+password");
    if (!user || !user.comparePassword(password)) {
      return next(new AppError("email or password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "user login successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const logout = (req, res,next) => {
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
};

const getProfileDetails =async (req, res,next) => {
   try {
    
    const userId=req.user.id;
    const user=await User.findById(userId);
    res.status(200).json({
        success:true,
        message:"user details",
        user
    })
} catch (error) {
    return next(new AppError("Failed to fetch user profile details",500))
}

};

export { register, login, logout, getProfileDetails };
