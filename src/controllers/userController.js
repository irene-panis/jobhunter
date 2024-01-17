const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {
  register: async (req, res) => {
    try {
      const { first_name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        first_name,
        email,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({ message: "Registration successful", user: newUser });
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
  /* learn to implement jwt
  login: async (req, res) => {
    try {

    } catch (err) {

    }
  }
  */
};

module.exports = userController;