const Job = require("../models/Job");

const jobController = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getJobById: async (req, res) => {
    try {
      const job = await Job.findOne({ _id: req.params.id });

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addJob: async (req, res) => {
    try {
      const { position, company, location, notes } = req.body;
      const job = await Job.create({
        position,
        company,
        location,
        notes,
      });
      res.status(200).json(job);
    } catch (err) {
      res.status(500).send(err);
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
      res.json(updatedJob);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  deleteJob: async (req, res) => {
    try {
      const jobId = req.params.id;

      const deletedJob = await Job.findByIdAndDelete(jobId);

      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json({ message: "Job deleted successfully" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = jobController;
