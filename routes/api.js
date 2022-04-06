var express = require('express');
var router = express.Router();

const dbService = require('../db.js');

const db = dbService.getDb();

router.get('/data', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
