import User from "../models/User.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("All Users are as follows ----> \n ", users);

    res.status(200).json(users);
  } catch (err) {
    console.error("Error getting users: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

// getUsers();

export { getUsers };
