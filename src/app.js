import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { authenticate } from "./middlewares/authMiddleware.js";

dotenv.config();
connectDB(); // Connect to database

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/v1/users", authenticate, userRoutes); // User routes
app.use("/api/v1/auth", authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
