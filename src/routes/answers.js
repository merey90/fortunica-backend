'use strict';
const express = require('express'),
      router = express.Router(),
      Answer = require('../models/answer');

router.post('/', async (req, res, next) => {
  if(!req.body.conversation) {
    return res.status(422).send({ error: 'Please choose a valid conversation.' });
  }

  if(!req.body.content) {
    return res.status(422).send({ error: 'Please enter a message.' });
  }

  const answer = new Answer({
    conversationId: req.body.conversation,
    content: req.body.content,
    user: req.body.user
  });

  try {
    const newAnswer = await answer.save();
    res.status(201).send({answer: newAnswer});
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
