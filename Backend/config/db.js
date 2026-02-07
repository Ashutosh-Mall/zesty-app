import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected successfully!");
    } catch (err) {
         console.error("DB connection failed", err);
    }
}
export default connectDb;
