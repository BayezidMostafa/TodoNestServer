// src/app.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import connectToDB from "./config/db";

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectToDB();

// Routes
app.use("/api/users", userRoutes);

export default app;
