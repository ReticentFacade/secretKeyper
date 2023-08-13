import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true, // mongoose doesn't have `allowNull`; `required` does the same thing
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    is_2fa_enabled: { 
        type: Boolean, 
        default: false,
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
