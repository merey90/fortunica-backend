'use strict';
const express = require('express'),
      router = express.Router(),
      Conversation = require('../models/conversation'),
      Question = require('../models/question');

router.post('/', async (req, res, next) => {
  if(!req.body.user) {
    return res.status(422).send({ error: 'Please choose a valid expert for your message.' });
  }

  if(!req.body.title) {
    return res.status(422).send({ error: 'Please enter a title.' });
  }

  if(!req.body.content) {
    return res.status(422).send({ error: 'Please enter a message.' });
  }

  const conversation = new Conversation({
    client: req.body.client,
    user: req.body.user,
    title: req.body.title
  });

  try {
    const newConversation = await conversation.save();

    const question = new Question({
      conversationId: newConversation._id,
      content: req.body.content,
      client: req.body.client
    });

    const newQuestion = await question.save();
    res.status(201).send({conversation: newConversation});
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let question = await Question.findOneAndUpdate({_id: req.params.id },req.body,{new: true});
    res.send({question});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
