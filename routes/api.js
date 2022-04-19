var express = require('express');
var router = express.Router();

const dbService = require('../db.js');

// const db = dbService.getDb(); dont do this until you're in the api fn

router.get('/data', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
