import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: false, //true
  secure: false, //true
};

const register = async (req, res, next) => {
  const { fullName, email, password, avatar } = req.body;

  // Check if all required fields are provided
  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  // Check if user with provided email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already exists", 400));
  }

  // Create new user with provided data
  let user;
  try {
    user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
      },
    });
  } catch (error) {
    return next(
      new AppError("User registration failed. Please try again later.", 500)
    );
  }

  if (!user) {
    return next(
      new AppError("User registration failed. Please try again later.", 500)
    );
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      // Upload file to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "uploads",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        // Set avatar details from Cloudinary upload result
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // Remove file from server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(new AppError("File upload failed. Please try again.", 500));
    }
  }

  // Save user changes
  try {
    await user.save();
  } catch (error) {
    return next(
      new AppError("User registration failed. Please try again later.", 500)
    );
  }

  // Clear password before sending response
  user.password = undefined;

  // Generate JWT token
  const token = await user.generateJWTToken();

  // Set token in cookie
  res.cookie("token", token, cookieOptions);

  // Send success response
  res.status(200).json({
    success: true,
    message: "User registration successful",
    user,
  });
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("all fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    // If no user or sent password do not match then send generic response
    if (!(user && (await user.comparePassword(password)))) {
      return next(
        new AppError(
          "Email or Password do not match or user does not exist",
          401
        )
      );
    }

    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "user login successfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const getProfileDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Email is required", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Email not registered", 400));
  }
  const resetToken = await user.generatePasswordResetToken();

  await user.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password/${resetToken}`;
  console.log(resetPasswordUrl);
  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset Password Token has been sent to ${email} successfully`,
    });
  } catch (e) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();
    return next(new AppError(e.message, 500));
  }
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new AppError("Token is invalid or expired, please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.save();

  res.status(200).json({
    success: true,
    message: "Password Change successfully",
  });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are mandatory", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError("Invalid old password", 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully!",
  });
};

const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { email } = req.user.email;

  const user = await User.findById(email);

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  if (req.fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "uploads",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // Remove file from server
        fs.rm(`uploads/${req.file.filename}`);
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "User details updated successfully!",
      });
    } catch (e) {
      return next(
        new AppError(e || "File not uploaded, please try again", 500)
      );
    }
  }
};

export {
  register,
  login,
  logout,
  getProfileDetails,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
};
