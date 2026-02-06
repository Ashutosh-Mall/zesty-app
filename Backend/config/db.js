import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000,   
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1); 
  }
};

export default connectDb;
