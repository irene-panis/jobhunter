const jwt = require("jsonwebtoken");

const expiration = "1h";

const signToken = ({ first_name, email, _id }) => {
  const payload = { first_name, email, _id };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
};

module.exports = signToken;
