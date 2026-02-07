import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
import chatBotRouter from "./routes/chatbot.routes.js";
import vendorRouter from "./routes/vendor.routes.js";
import foodItemRouter from "./routes/foodItem.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js"
import cors from "cors";
const app = express();


await connectDb();

app.use(
  cors({
    origin: "https://zesty-app.vercel.app",
    credentials: true,
  })
);

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api", chatBotRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/food", foodItemRouter);

app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.use("/api/customer", customerRoutes);
app.use("/api/delivery", deliveryRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

// app.listen(port, async () => {
//   await connectDb();
//   console.log(`Server running at http://localhost:${port}`);
// });

export default app;
