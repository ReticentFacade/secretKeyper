import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";
import { connectToMongoDB } from "./config/connection.js";
import { sessionMiddleware } from "./middleware/sessionMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware());
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

connectToMongoDB();
