import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/auth.routes.js";
import chatBotRouter from "./routes/chatbot.routes.js";
import vendorRouter from "./routes/vendor.routes.js";
import foodItemRouter from "./routes/foodItem.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";

dotenv.config();
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "https://zesty-app.vercel.app";

// ----- CORS -----
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

// ----- Middlewares -----
app.use(express.json());
app.use(cookieParser());

// ----- Routes -----
app.get("/", (req, res) => res.send("Zesty Backend is running!"));

app.use("/api/auth", userRouter);
app.use("/api", chatBotRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/food", foodItemRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/delivery", deliveryRoutes);

// ----- Error Handler -----
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// ----- MongoDB Connection + Start Server -----
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully!");

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
