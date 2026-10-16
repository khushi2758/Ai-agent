import crypto from "crypto";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import { app } from "../config/firebase.js";
import redis from "../../../shared/redis/redis.js";
export const login = async (req, res) => {
  try {
    const { token } = req.body;
     if (!token) {
  return res.status(400).json({
    success: false,
    message: "Firebase ID token is required",
  });
}
    // Verify Firebase ID Token
    const decoded = await getAuth(app).verifyIdToken(token);

    // Find existing user
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    // Create user if not found
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture,

      });
    }

    // Generate a session ID
    const sessionId = crypto.randomUUID();
    await redis.set(
      `user-session-${user._id}`,
      sessionId,
      "EX",
      60 * 60 * 24 * 7,
    );
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        email: user.email,
        avatar: user.avatar,
        name: user.name,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt
      }),
      "EX",
      60 * 60 * 24 * 7,
    );
    res.cookie(
      "session",
      sessionId,
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    );

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
  console.error("Login error:", error);

  const isAuthError =
    error.code === "auth/argument-error" ||
    error.code === "auth/invalid-id-token" ||
    error.code === "auth/id-token-expired";

  return res.status(isAuthError ? 401 : 500).json({
    success: false,
    message: isAuthError
      ? "Invalid or expired authentication token"
      : "Internal server error",
  });
}
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }
    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUserPayment   = async (req, res) => {
  try {
    const { userId, plan, credits} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.plan = plan;
    user.credits += credits;
    user.totalCredits += credits;
    user.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Set plan expiration to 30 days from now
    await user.save();
   const sessionId = await redis.get(
      `user-session-${user?._id}`
    );

if (sessionId) {
  await redis.set(
    `session:${sessionId}`,
    JSON.stringify({
      userId: user._id.toString(),
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      plan: user.plan,
      credits: user.credits,
      totalCredits: user.totalCredits,
      planExpiresAt: user.planExpiresAt,
    }),
    "EX",
    60 * 60 * 24 * 7
  );
}
    return res.status(200).json({
      success: true,
      credits: user.credits,
      message: "Payment updated successfully",
    });
  }catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}

export const deductCredits = async (req, res) => {
  try{
    const {userId, agent} = req.body;
    const COST = {
      chat: 1,
      search: 2,
      coding: 3,
      pdf:10,
      ppt:10,
      vision:10,
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const requiredCredits = COST[agent] || 1;
    if (user.credits < requiredCredits) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits",
      });
    }
    user.credits -= requiredCredits;
    await user.save();
       const sessionId = await redis.get(
      `user-session-${user?._id}`
    );

if (sessionId) {
  await redis.set(
    `session:${sessionId}`,
    JSON.stringify({
      userId: user._id.toString(),
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      plan: user.plan,
      credits: user.credits,
      totalCredits: user.totalCredits,
      planExpiresAt: user.planExpiresAt,
    }),
    "EX",
    60 * 60 * 24 * 7
  );
}
    return res.status(200).json({
      success: true,
      credits: user.credits,
      message: "Credits deducted successfully",
    });

  }catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

