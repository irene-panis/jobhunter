const { Schema, model } = require('mongoose');

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
    }
  }
);

const Job = model('job', jobSchema);

module.exports = Job;