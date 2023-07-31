import Credentials from "../models/Credentials.js";

// TO-DO:
// getCredentials 
// addCredentials
// updateCredentials
// deleteCredentials

const getCredentials = async (req, res) => {
  try {
    console.log("Oi, you got the credentials!");
  } catch (err) {
    console.log("Error getting credentials: ", err);
    res.status(500).json({ message: "Error getting credentials" });
  }
};
const addCredentials = async (req, res) => {
  try {
  } catch (err) {
    console.log("Error adding credentials: ", err);
    res.status(500).json({ message: "Error adding credentials" });
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
