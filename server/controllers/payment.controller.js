import User from "../models/user.model.js";
import { razorpay } from "../server.mjs";
import Payment from '../models/Payment.model.js';
import AppError from "../utils/error.util.js";
import crypto from 'crypto';

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Razorpay API key',
      key: process.env.RAZORPAY_KEY_ID,
    });
    
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};


export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorize, please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase subscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 6,
      quantity: 1,
    });
    console.log(subscription);
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    console.log(subscription.status);

    res.status(200).json({
      success: true,
      message: "Subscribe successfully",
      subscription_id: subscription.id,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};


export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorize, please login", 400));
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";
    console.log(user);
    const u = await user.save();
    console.log(u);

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};


export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorize, please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase subscription", 400));
    }

    const subscriptionId = user.subscription.id;
    // Attempt to cancel the subscription
    let subscription;
    try {
      subscription = razorpay.subscriptions.cancel({
        subscriptionId,
      });

      user.subscription.status = subscription.status;
      await user.save();

      // Respond with a success message or status code
      return res
        .status(200)
        .json({ message: "Subscription canceled successfully" });
    } catch (e) {
      // Handle errors from Razorpay or other issues
      return next(
        new AppError(`Failed to cancel subscription: ${e.message}`, 500)
      );
    }
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};



export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      subscriptions,
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};
