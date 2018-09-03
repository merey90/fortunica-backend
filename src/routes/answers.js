'use strict';
const express = require('express'),
      router = express.Router(),
      Answer = require('../models/answer');

router.post('/', async (req, res, next) => {
  if(!req.body.conversation) {
    res.status(422).send({ error: 'Please choose a valid conversation.' });
    return next();
  }

  if(!req.body.content) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }

  const answer = new Answer({
    conversationId: body.conversation,
    content: req.body.content,
    user: req.body.user
  });

  try {
    const newAnswer = await answer.save();
    res.status(201).send({response:'Answer sent: ' + newAnswer._id});
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let answer = await Answer.findOneAndUpdate({_id: req.params.id },req.body,{new: true});
    res.send({answer});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
