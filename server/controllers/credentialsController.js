import Credentials from "../models/Credentials.js";

// TO-DO:
// addCredentials
// getCredentials 
// updateCredentials
// deleteCredentials

const addCredentials = async (req, res) => {
  try {
    // Access the credentials schema 
    // Since you're able to access this route, it's a given that you're already registered and logged in
    // So, first you need to check WHICH user is logged in
    // And then you need to add the credentials to THAT user's credentials array
    // 
  } catch (err) {
    console.log("Error adding credentials: ", err);
    res.status(500).json({ message: "Error adding credentials" });
  }
};

const getCredentials = async (req, res) => {
  try {
    console.log("getCredentials running...");
    console.log("Oi, you got the credentials!");
  } catch (err) {
    console.log("Error getting credentials: ", err);
    res.status(500).json({ message: "Error getting credentials" });
  }
};

const updateCredentials = async (req, res) => {
  try {
  } catch (err) {
    console.log("Error updating credentials: ", err);
    res.status(500).json({ message: "Error updating credentials" });
  }
};

const deleteCredentials = async (req, res) => {
  try {
  } catch (err) {
    console.log("Error deleting credentials: ", err);
    res.status(500).json({ message: "Error deleting credentials" });
  }
};

export { 
    getCredentials, 
    addCredentials, 
    updateCredentials, 
    deleteCredentials,
};
