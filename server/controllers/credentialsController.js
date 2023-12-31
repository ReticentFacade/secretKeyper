import Credentials from "../models/Credentials.js";
import { checkUsername } from "../middleware/checkUsername.js";
import { aesEncrypt, aesDecrypt } from "./helpers/encryption.js";

// TO-DO:
// addCredentials
// getCredentials
// updateCredentials
// deleteCredentials

const addCredentials = async (req, res) => {
  try {
    // Rn we're checking if username exists, but later on perhaps session-handling would get that username via `getUsername`?
    const { username, credentials } = req.body;
    const usernameExists = await checkUsername(username);
    if (!usernameExists) {
      res.status(400).json({ message: "Username doesn't exist" });
    } else {
      // If the user exists, findOneAndUpdate() will update their existing document and add the new credentials.
      // If the user is new and doesn't exist, findOneAndUpdate() (because of `upsert: true`) will create a new document with the provided credentials.

      const newCredentials = await Credentials.findOneAndUpdate(
        { username },
        {
          $push: {
            credentials: {
              website: credentials.website,
              password: aesEncrypt(credentials.password),
            },
          },
        },
        { new: true, upsert: true }, // `Upsert` is used to create a new document if the user doesn't exist.
      );
      if (newCredentials) {
        console.log("Credentials saved successfully :) \n", newCredentials);
        res.status(201).json({ message: "Credentials saved successfully" });
      } else {
        console.log("Error saving credentials :(");
        res.status(500).json({ message: "Error saving credentials" });
      }
    }
  } catch (err) {
    console.log("Error adding credentials: ", err);
    res.status(500).json({ message: "Error adding credentials" });
  }
};

const getCredentials = async (req, res) => {
  try {
    console.log("getCredentials running...");
    const { username, website } = req.query;

    // Not too sure if username should AGAIN be checked here: Check & fix later
    const usernameExists = await checkUsername(username);
    if (!usernameExists) {
      console.log("Username doesn't exist -_-");
      res.status(400).json({ message: "Username doesn't exist" });
    }

    const user = await Credentials.findOne({ username });

    if (!user) {
      console.log("User doesn't exist :(");
      res.status(400).json({ message: "User doesn't exist" });
    } else {
      const credentials = user.credentials.find(
        (cred) => cred.website === website
      );

      if (!credentials) {
        console.log("Credentials not found :(");
        return res.status(400).json({ message: "Credentials not found" });
      }

      console.log("Credentials found :)");
      const decryptedPassword = aesDecrypt(credentials.password);

      console.log(`For '${website}', the password is: '${decryptedPassword}'`);
      res.status(200).json({ password: decryptedPassword });
    }
  } catch (err) {
    console.log("Error getting credentials: ", err);
    res.status(500).json({ message: "Error getting credentials" });
  }
};

const updateCredentials = async (req, res) => {
  try {
    const { username, website, newPassword } = req.body;

    console.log(`Username you entered is: ${username}`);
    const usernameExists = await Credentials.exists({ username });
    console.log(`Username ${usernameExists} exists:`);

    if (!usernameExists) {
      console.log("Username doesn't exist -_-");
      res.status(400).json({ message: "Username doesn't exist" });
    }

    const credentials = await Credentials.findOneAndUpdate(
      {
        username,
        "credentials.website": website,
      },
      {
        $set: { "credentials.$.password": aesEncrypt(newPassword) },
      },
      { new: true }
    );

    if (credentials) {
      console.log("Credentials updated successfully :)", credentials);
      res.status(200).json({ message: "Credentials updated successfully" });
    } else {
      console.log("Error updating credentials :(");
      res.status(500).json({ message: "Error updating credentials" });
    }
  } catch (err) {
    console.log("Error updating credentials: ", err);
    res.status(500).json({ message: "Error updating credentials" });
  }
};

const deleteCredentials = async (req, res) => {
  try {
    const { username, website } = req.query;
    console.log(`Username you entered is: ${username}`);
    const usernameExists = await Credentials.exists({ username });
    if (!usernameExists) {
      console.log(`Username ${username} doesn't exist -_-`);
      res.status(400).json({ message: "Username doesn't exist" });
    }

    const deletedCredentials = await Credentials.findOneAndDelete(
      {
        username,
      },
      {
        $pull: { credentials: { website } },
      },
      { new: true }
    );

    if (deletedCredentials) {
      console.log("Credentials deleted successfully: 🥳 ", deletedCredentials);
      res.status(200).json({ message: "Credentials deleted successfully" });
    } else {
      console.log("Error deleting credentials :(");
      res.status(500).json({ message: "Error deleting credentials" });
    }
  } catch (err) {
    console.log("Error deleting credentials: ", err);
    res.status(500).json({ message: "Error deleting credentials" });
  }
};

export { getCredentials, addCredentials, updateCredentials, deleteCredentials };
