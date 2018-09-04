'use strict';
const express = require('express'),
      router = express.Router(),
      Client = require('../models/client');


/**
 * Get list of all clients
 */
router.get('/', async (req, res, next) => {
  try {
    const clients = await Client.find().lean();
    res.send( clients );
  } catch (error) {
    next(error);
  }
});

/**
 * Get a client by name(IE: authorization)
 */
router.get('/:name', async (req, res, next) => {
  try {
    const client = await Client.findOne({ name: req.params.name });
    console.log(client);
    res.send({ client });
  } catch (error) {
    next(error);
  }
});

/**
 * Register new client
 */
router.post('/', async (req, res, next) => {
  if(!req.body.name) {
    res.status(422).send({ error: 'Please enter a name of new Client.' });
    next();
  }

  if(!req.body.zodiac) {
    res.status(422).send({ error: 'Please choose a zodiac of new Client.' });
    next();
  }

  const client = new Client({
    name: req.body.name,
    zodiac: req.body.zodiac
  });

  try {
    const newClient = await client.save();
    res.status(201).send({ client: newClient });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
