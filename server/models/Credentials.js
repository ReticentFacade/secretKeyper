import mongoose from "mongoose";

const credentialsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    credentials: [
      {
        website: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    collection: "credentials",
  }
);

const Credentials = mongoose.model("Credentials", credentialsSchema);

export default Credentials;
