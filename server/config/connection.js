import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongooseURI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongooseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 secs
            user: process.env.DB_USER, 
            pass: process.env.DB_PASS,
        });
        console.log("Successfully connected to MongoDB...");
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err.message);
    };
};

connectToMongoDB();
export { connectToMongoDB };
