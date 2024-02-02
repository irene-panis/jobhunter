import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import jwt from 'jsonwebtoken';

const userController = {
  register: async (req, res) => {
    try {
      const { first_name, email, password } = req.body;
      const newUser = await User.create({
        first_name,
        email,
        password,
      });
      const accessToken = signToken(newUser);
      const refreshToken = jwt.sign(newUser.toJSON(), process.env.JWT_REFRESH_SECRET);
      res.status(201).json({
        message: "Registration successful",
        user: newUser,
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (err) {
      // Handle unique constraint violation error
      if (err.code === 11000) {
        if (err.keyPattern && err.keyPattern.email) {
          return res
            .status(400)
            .json({ 
              error: 'duplicate_email',
              message: "Email is already registered" 
            });
        }
      } else if (err.name === 'ValidationError') {
        return res
          .status(400)
          .json({
            error: 'validation_error',
            message: "Password must be at least 8 characters."
          });
      } else {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ 
            error: 'invalid_credentials',
            message: "Invalid credentials" 
          });
      }

      const passwordMatch = await user.isCorrectPassword(password);

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ 
            error: 'invalid_credentials',
            message: "Invalid credentials" 
        });
      }

      const accessToken = signToken(user);
      res.status(201).json({
        message: "Login successful",
        user: user,
        accessToken: accessToken,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
