import User from "../models/user.model.js";
import { razorpay } from "../server.mjs";
import AppError from "../utils/error.util.js";

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "RazorPay API KEY",
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
      return next(new AppError("Auauthorized user please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("ADMIN CAN NOT PURCHASE SUBSCRIPTION", 400));
    }

    const subscription = await razorpay.subscription.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "subscribe successfully",
      subscription_id: subscription.id,
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
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

    const user = User.findById(id);
    if (!user) {
      return next(new AppError("Unauthorized, Please login", 400));
    }
    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not varified ,please try again", 400));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";
    await user.save();
    res.status(200).json({
      success: trur,
      message: "Payment created and verified successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 400));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Auauthorized user please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("ADMIN CAN NOT PURCHASE SUBSCRIPTION", 400));
    }

    const subscriptionId = user.subscription.id;
    const subscription = await razorpay.subscription.cancel({
      subscriptionId,
    });

    user.subscription.status = subscription.status;

    await user.save();
  } catch (e) {
    return next(new AppError(e.message, 400));
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
