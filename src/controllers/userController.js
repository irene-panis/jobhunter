import User from "../models/User.js";
import { signToken } from "../utils/auth.js";
import Job from "../models/Job.js";

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
      res.status(201).json({
        message: "Registration successful",
        user: newUser,
        accessToken: accessToken,
      });
    } catch (err) {
      // Handle unique constraint violation error
      if (err.code === 11000) {
        if (err.keyPattern && err.keyPattern.email) {
          return res.status(400).json({
            error: "duplicate_email",
            message: "Email is already registered",
          });
        }
      } else if (err.name === "ValidationError") {
        return res.status(400).json({
          error: "validation_error",
          message: "Password must be at least 8 characters.",
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
        return res.status(400).json({
          error: "invalid_credentials",
          message: "Invalid credentials",
        });
      }

      const passwordMatch = await user.isCorrectPassword(password);

      if (!passwordMatch) {
        return res.status(400).json({
          error: "invalid_credentials",
          message: "Invalid credentials",
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
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    try {

      if (req.body.first_name) {
        user.first_name = req.body.first_name;
      }

      if (req.body.email) {
        const password = req.body.password;
        const passwordMatch = await user.isCorrectPassword(password);
        if (!passwordMatch) {
          return res.status(400).json({
            error: "invalid_credentials",
            message: "Invalid credentials",
          });
        }
        if (user.email !== req.body.email) {
          const testEmail = await User.findOne({ email: req.body.email });
          if (testEmail) {
            return res.status(400).json({
              error: "dupe_email",
              message: "Duplicate email",
            });
          }
        }
        user.email = req.body.email;
      }

      if (req.body.new_pass) {
        const currentPass = req.body.current_pass;
        const passwordMatch = await user.isCorrectPassword(currentPass);
        if (!passwordMatch) {
          return res.status(400).json({
            error: "invalid_credentials",
            message: "Invalid credentials",
          });
        }
        if (req.body.new_pass.length < 8) {
          return res.status(400).json({
            error: "validation_error",
            message: "Password must be at least 8 characters.",
          });
        }
        user.password = req.body.new_pass;
      }

      await user.save();

      const accessToken = signToken(user);

      return res
        .status(200)
        .json({ 
          message: "User updated successfully", 
          user: user,
          accessToken: accessToken
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordInput = req.body.password;

      const passwordMatch = await user.isCorrectPassword(passwordInput);

      if (!passwordMatch) {
        return res.status(400).json({
          error: "invalid_credentials",
          message: "Invalid credentials",
        });
      }

      // convert ObjectIDs to strings
      const jobIds = user.applied_jobs.map(id => id.toString());
      // delete each job associated with the user
      for (const jobId of jobIds) {
        await Job.findByIdAndDelete(jobId);
      }

      await User.findByIdAndDelete(userId);
  
      return res.json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};

export default userController;
