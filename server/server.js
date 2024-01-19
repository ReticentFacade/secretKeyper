import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";
import { connectToMongoDB } from "./config/connection.js";
import { sessionMiddleware } from "./middleware/sessionMiddleware.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware());
app.use(cookieParser());
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(router);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

connectToMongoDB();
