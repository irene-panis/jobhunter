const jwt = require("jsonwebtoken");

const expiration = "1h";

const signToken = ({ first_name, email, _id }) => {
  const payload = { first_name, email, _id };
  return jwt.sign({ data: payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: expiration,
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { signToken, authenticateToken };
