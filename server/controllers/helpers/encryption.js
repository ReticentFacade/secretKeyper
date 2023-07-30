import crypto from "crypto";
import { SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } from "./config.js";

if (!SECRET_KEY || !SECRET_IV || !ENCRYPTION_METHOD) {
  throw new Error("Encryption config not found");
}

// Generating secret hash (using crypto-module & secret key and secret iv)
const key = crypto
  .createHash("sha512")
  .update(SECRET_KEY)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(SECRET_IV)
  .digest("hex")
  .substring(0, 16);

// Encrypt data:
export function aesEncrypt(data) {
  try {
    const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV);

    return Buffer.from(
      cipher.update(data, "utf8", "hex") + cipher.final("hex")
    ).toString("base64");
  } catch (err) {
    console.error("Error encrypting data: ", err.message);
    throw new Error(err.message);
  }
}

// Decrypt data:
export function aesDecrypt(encryptedData) {
  try {
    const buff = Buffer.from(encryptedData, "base64");
    const decipher = crypto.createDecipheriv(
      ENCRYPTION_METHOD,
      key,
      encryptionIV
    );

    return (
      decipher.update(buff.toString("utf8"), "hex", "utf8") +
      decipher.final("utf8")
    ); // Decrypts data and converts to utf8
  } catch (err) {
    console.log("Error decrypting data: ", err.message);
    throw new Error(err.message);
  }
}
