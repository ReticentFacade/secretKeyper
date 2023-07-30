import mongoose from "mongoose";
import { connectToMongoDB } from "../config/connection.js";
import { User } from "../models/index.js";

(async () => {
  // Connect to MongoDB using Mongoose
  await connectToMongoDB();

  const user = new User({
    name: "Jaime Buckley",
    username: "jaime101",
    email: "jaime101@gmail.com",
    password: "nocturnal-bookworm",
  });

  const newUser = new User(user);

  try {
    const savedUser = await newUser.save({ timeout: 2000 });
    console.log("User saved successfully: ", savedUser);
    
    const users = await User.find({});
    console.log("All users:", users);
  } catch (err) {
    console.error("Error creating user: ", err.message);
  }

  // Close the MongoDB connection after the operation is done: 
  mongoose.connection.close();
})();
