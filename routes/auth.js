

const express = require('express');
const { signup, loginUser } = require("../controllers/authController");
const bcrypt = require('bcrypt');

const router = express.Router();

// Register Route
// router.post('/register', async (req, res) => {
//   console.log(req.body);
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const user = await signup(name, email, hashedPassword);
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log(error)
//   }
// });

router.post('/register', signup)

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
