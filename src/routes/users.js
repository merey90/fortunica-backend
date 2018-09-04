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
    res.send( users );
  } catch (error) {
    next(error);
  }
});

/**
 * Return expert or register new if not found
 */
router.get('/:name', async (req, res, next) => {
  if(!req.params.name) {
    res.status(422).send({ error: 'Please enter a name of new User.' });
    return next();
  }
  try {
    let user = await User.findOne({name: req.params.name});

    if(!user){
      const newUser = new User({
        name: req.params.name
      });
      user = await newUser.save();
    }

    res.status(201).send({user});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
