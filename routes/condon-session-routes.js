/*
==================================
; Title: condon-session-routes.js
; Author: Laurel Condon
; Date: 09/17/2023
; Description: session-routes.js
===============================
*/

// Create variables to require
const express = require('express');
const router = express.Router();
const User = require('./condon-user');
const bcrypt = require('bcrypt');

const saltRounds = 10;


// Signup operation
router.post('/api/signup', async (req, res) => {
    try {
      // Query the users collection using findOne() with the username from the RequestBody
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) {
        // Create a new user object with hashed password and save to MongoDB
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const newRegisteredUser = {
          username: req.body.username,
          password: hashedPassword,
          // Map other properties from the RequestBody
        };
        await User.create(newRegisteredUser);
        res.status(200).json({ message: 'User registered successfully.' });
      } else {
        res.status(401).json({ message: 'Username already exists.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  // Login operation
  router.post('/api/login', async (req, res) => {
    try {
      // Query the users collection using findOne() with the username from the RequestBody
      const user = await User.findOne({ username: req.body.username });
  
      if (user) {
        // Compares the users saved password with one entered
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json({ message: 'Login successful.' });
        } else {
          res.status(401).json({ message: 'Username is already in use' });
        }
      } else {
        res.status(501).json({ message: 'MongoDB Exception' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  module.exports = router;