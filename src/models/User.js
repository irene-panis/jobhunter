const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
        tpye: Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
  }
);

const User = model('user', userSchema);

module.exports = User;