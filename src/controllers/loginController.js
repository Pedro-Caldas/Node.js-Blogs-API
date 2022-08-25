require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getByEmail } = require('../services/usersServices');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  const error = new Error();
  error.message = 'JWT_SECRET wasn\'t defined at .env';
  throw error;
}

const validateBody = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Some required fields are missing' });
    return false;
  }

  return true;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateBody(req, res)) return;

    const validUser = await getByEmail(email, password);
    if (!validUser) return res.status(400).json({ message: 'Invalid fields' });

    const token = jwt.sign({ email }, JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Internal error', error: err.message });
  }
};

module.exports = {
  login,
};