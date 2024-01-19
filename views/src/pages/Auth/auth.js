import axios from "axios";

const API_ENDPOINT = "http://localhost:5000/api/auth";

const storeToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    console.log("Token successfully saved in the localStorage", token);
  } else {
    console.log("Token is undefined or null: ", token);
  }
};

const register = async (name, username, email, password) => {
  try {
    const response = await axios.post(API_ENDPOINT + "/register", {
      name,
      username,
      email,
      password,
    });

    if (response.status === 201) {
      // Extract token:
      const token = response.data.token;

      // Store the token in localStorage:
      storeToken(token);
      console.log("Successfully stored the token in localStorage!");
    }

    return response;
  } catch (error) {
    console.error("Registration failed: ", error.response.data);
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_ENDPOINT + "/login", {
      username,
      password,
    });

    if (response.status === 200) {
      // Extract token:
      const token = response.data.token;

      // Store the token in localStorage:
      storeToken(token);
      console.log("Successfully stored the token in localStorage!");

      // Saving the username in localStorage to get the username for navbar:
      localStorage.setItem("user", response.data.username);
      console.log("Username saved to localStorage:", response.data.username);
    }

    return response;
  } catch (error) {
    console.error("Login failed: ", error.response.data);
    throw error;
  }
};

const AuthService = {
  register,
  login,
};

export default AuthService;
