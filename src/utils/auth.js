const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '1h';

const signToken = ({ first_name, email, _id }) => {
  const payload = { first_name, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = signToken;