import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc Get all users
// @route GET /api/users
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

export const homePage = (req, res) => res.send("Home page 🏠");
