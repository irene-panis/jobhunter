const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    applied_jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
  }
);

const User = model('user', userSchema);

module.exports = User;