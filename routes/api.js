var express = require('express');
var router = express.Router();

const msInDays = 1000 * 3600 * 24;

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

router.post('/post/fulfill', async function (req, res, next){
  const db = dbService.getDb();
  const { id, fulfillUser } = req.body;
  const nowDays = Math.floor(Date.now()/msInDays)*msInDays;
  await db.collection('posts')
    .updateOne({ id }, { $set: { 
      fulfilled_by: fulfillUser,
      fulfilled_date: nowDays,
    }
  })
  res.sendStatus(200);


})

module.exports = router;
