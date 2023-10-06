const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
    User.find({})
    .then(docs => {
        console.log(docs)
        res.render('test', { docs });
    })
    .catch(err => console.log(err))
});

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const user = new User({ username, password });
    await user.save();

    // Generate a JWT token for the registered user
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};