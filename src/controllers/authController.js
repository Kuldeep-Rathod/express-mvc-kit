import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { sendCookie } from "../utils/features.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please provide all required fields.");
    }
    const user = await User.create({ name, email, password });

    sendCookie(user, res, `Welcome, ${user.name}`, 201);
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
});

export const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.json({ success: true, message: "Logged out successfully" });
};
