var express = require('express');
var router = express.Router();

const dbService = require('../db.js');

// const db = dbService.getDb(); dont do this until you're in the .get(), .post() etc

router.delete('/post', function(req, res, next) {
  const db = dbService.getDb();
  const id = req.query.id;
  db.collection('posts').deleteOne({ id })
  .then(obj => {
    return res.sendStatus(200);  
  })
  .catch(err => {
    console.error(err)
    return res.sendStatus(500);
  })
});

module.exports = router;
