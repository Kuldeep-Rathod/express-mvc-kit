import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "10m" });

    // console.log(jwtSecret);
    // console.log(token);

    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Improve CORS handling
            secure: process.env.NODE_ENV === "production", // Force secure cookies in production
        })
        .json({
            success: true,
            message,
            token,
        });
};
