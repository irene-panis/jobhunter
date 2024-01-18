const User = require("../models/User");
const signToken = require("../utils/auth");

const userController = {
  register: async (req, res) => {
    try {
      const { first_name, email, password } = req.body;
      const newUser = await User.create({
        first_name,
        email,
        password,
      });
      const token = signToken(newUser);
      res.status(201).json({
        message: "Registration successful",
        user: newUser,
        token: token,
      });
    } catch (err) {
      // Handle unique constraint violation error
      if (err.code === 11000) {
        if (err.keyPattern && err.keyPattern.email) {
          return res
            .status(400)
            .json({ message: "Email is already registered" });
        }
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await user.isCorrectPassword(password);

      if (!passwordMatch) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const token = signToken(user);
      res.status(201).json({
        message: "Login successful",
        user: user,
        token: token,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
