'use strict';
const express = require('express'),
      router = express.Router(),
      User = require('../models/user');

/**
 * Get list of experts
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.send({ users });
  } catch (error) {
    next(error);
  }
});

/**
 * Register new expert
 */
router.post('/', async (req, res, next) => {
  if(!req.body.name) {
    res.status(422).send({ error: 'Please enter a name of new User.' });
    return next();
  }

  const user = new User({
    name: req.body.name
  });

  try {
    const newUser = await user.save();
    res.status(201).send({response:'User saved: ' + newUser._id});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
