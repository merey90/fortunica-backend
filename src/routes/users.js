'use strict';
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send({ title: 'Users' });
});

module.exports = router;
