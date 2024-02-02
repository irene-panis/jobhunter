import Job from "../models/Job.js";
import User from '../models/User.js';

const jobController = {
  getUserJobs: async (req, res) => {
    try {
      const user = await User
        .findOne({ email: req.user.data.email })
        .select('applied_jobs');
      const jobIds = user.applied_jobs;
      const jobs = await Job
        .find({ _id: { $in: jobIds } })
        .sort({ date_applied: -1 });
      return res.status(200).json(jobs);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err);
    }
  },
  getRecentJobs: async (req, res) => {
    try {
      const user = await User
        .findOne({ email: req.user.data.email })
        .select('applied_jobs');
      const jobIds = user.applied_jobs;
      const jobs = await Job
        .find({ _id: { $in: jobIds } })
        .sort({ date_applied: -1 })
        .limit(3);
      return res.status(200).json(jobs);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
  },
  getJobById: async (req, res) => {
    try {
      const job = await Job.findOne({ _id: req.params.id });

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      return res.status(200).json(job);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  addJob: async (req, res) => {
    try {
      const { 
        position,
        company, 
        location, 
        notes,
        status,
        interview_date,
        interview_location 
      } = req.body;
      const job = await Job.create({
        position,
        company,
        location,
        notes,
        status,
        interview_date,
        interview_location 
      });
      const filter = { email: req.user.data.email };
      const update = { $push: { applied_jobs: job._id } };
      const user = await User.findOneAndUpdate(
        filter,
        update,
        { new: true }
      );
      if (!user) {
        // If no user found with the specified email
        return res.status(404).json({ message: 'User not found' });
      }
      // Successfully updated user
      return res.status(200).json(job);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  updateJob: async (req, res) => {
    try {
      const jobId = req.params.id;
      const {
        position,
        company,
        location,
        notes,
        status,
        interview_date,
        interview_location,
      } = req.body;
      const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId },
        {
          $set: {
            position: position,
            company: company,
            location: location,
            notes: notes,
            status: status,
            interview_date: interview_date,
            interview_location: interview_location,
          },
        },
        { new: true, runValidators: true }
      );
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      return res.status(200).json(updatedJob);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  deleteJob: async (req, res) => {
    try {
      const jobId = req.params.id;

      const deletedJob = await Job.findByIdAndDelete(jobId);

      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      return res.json({ message: "Job deleted successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};

export default jobController;
