import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
export const SECRET_IV = process.env.SECRET_IV;
export const ENCRYPTION_METHOD = process.env.ENCRYPTION_METHOD;
