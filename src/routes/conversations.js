'use strict';
const express = require('express'),
      router = express.Router(),
      Conversation = require('../models/conversation'),
      Question = require('../models/question'),
      Answer = require('../models/answer');

const ConversationsController = require('./../controllers/conversations.controller');

/**
 * Returns list of conversations between 2 people
 * 
 * :forClient param is to mark conversation for new messages according to whom this
 * list would be presented
 */
router.get('/:userId/:clientId/:forClient', async (req, res, next) => {
  const filter = {
      user: req.params.userId,
      client: req.params.clientId
    };

  const messageModel = req.params.forClient === 'true' ? Answer : Question;

  try {
    const result = await ConversationsController.getConversationsByUsers(filter, messageModel);
    if(!!result.error){
      return next(result.error);
    }
    res.send( result.conversations );
  } catch (error) {
    next(error);
  }
  
});

/**
 * Returns conversation's messages.
 * 
 * :forClient param is to mark conversation to be readen according to who
 * is reading the dialog
 */
router.get('/:id/:forClient', async (req, res, next) => {
  try {
    let question, answer;

    if(req.params.forClient === 'true'){
      answer = await Answer.findOneAndUpdate({conversationId: req.params.id },{opened: true},{new: true}).lean();
      question = await Question.findOne({conversationId: req.params.id}).lean();
    } else {
      answer = await Answer.findOne({conversationId: req.params.id}).lean();
      question = await Question.findOneAndUpdate({conversationId: req.params.id },{opened: true},{new: true}).lean();
    }
    res.send({question, answer});
  } catch (error) {
    next(error);
  }
});

module.exports = router;