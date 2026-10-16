import Payment from "../models/payment.model.js";
import { PLANS } from "../config/plans.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import axios from "axios";
export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.headers["x-user-id"];

    const selectedPlan = PLANS[plan];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user ID is missing",
      });
    }

    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected",
      });
    }

    const amountInPaise = selectedPlan.amount * 100;

    console.log("Plan:", plan);
    console.log("Expected amount:", amountInPaise);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${userId}_${Date.now()}`,
    });

    console.log("Razorpay order amount:", order.amount);
    console.log("Razorpay order ID:", order.id);

    await Payment.create({
      userId,
      orderId: order.id,
      amount: selectedPlan.amount,
      credits: selectedPlan.credits,
      plan: selectedPlan.name,
      status: "created",
      currency: order.currency,
      paymentId: null,
    });

    return res.status(201).json({
      success: true,
      order,
      plan: selectedPlan,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
};

export const verifyPayment = async (req, res) => {
    try {
           const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
           const generatedsignature = crypto
           .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
           .update(`${razorpay_order_id}|${razorpay_payment_id}`)
           .digest("hex");
           if (generatedsignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }
        const paymentRecord = await Payment.findOne({ orderId: razorpay_order_id });
        if (!paymentRecord) {
            return res.status(404).json({ message: "Payment record not found" });
        }
        paymentRecord.status = "paid";
        paymentRecord.paymentId = razorpay_payment_id;
        await paymentRecord.save();
        await axios.post(`${process.env.AUTH_SERVICE_URL}/update-plan`, {
            userId: paymentRecord.userId,
            plan: paymentRecord.plan,
            credits: paymentRecord.credits,
        });
     return   res.status(200).json({ message: "Payment verified successfully" });
    }catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: `Internal server error ${error}` });
    }
}