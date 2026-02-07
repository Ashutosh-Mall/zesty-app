import mongoose from "mongoose";
let isConnected = false;
const connectDb = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("DB connected successfully!");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDb;
