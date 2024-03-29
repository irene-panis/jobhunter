import { Schema, model } from 'mongoose';

const jobSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notes: {
      type: String
    },
    date_applied:{
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: 'open'
    },
    interview_date: {
      type: Date,
    },
    interview_location: {
      type: String
    }
  }
);

const Job = model('job', jobSchema);

export default Job;