var express = require('express');
var router = express.Router();

const msInDays = 1000 * 3600 * 24;

const dbService = require('../db.js');
const short = require('short-uuid');
const uuid = short();

router.post('/post', function(req, res, next) {
  const db = dbService.getDb();
  const { category } = req.body;
  const post = {
    id: uuid.new(),
    created: Date.now(),
    points: category === 'giveaway' ? -10 : 50,
    create_points: category === 'giveaway' ? 50 : -10,
    ...req.body,
  }
  db.collection('posts').insertOne(post)
  .then(obj => {
    return res.sendStatus(200);  
  })
  .catch(err => {
    console.error(err)
    return res.sendStatus(500);
  })
})

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
  const { id, fulfillUser, username } = req.body;
  const offset = new Date().getTimezoneOffset();
  const nowDays = Math.floor(Date.now()/msInDays)*msInDays + offset*60*1000;

  try {
    const { points, create_points } = await db.collection('posts')
      .find({ id });

    // modify post creator's points
    await db.collection('users')
      .updateOne({ username }, {
        $inc: { points: create_points }
    });

    // modify fulfilling user's points
    await db.collection('users')
      .updateOne({ fulfillUser }, {
        $inc: { points }
    });
    
    // mark post as fulfilled
    await db.collection('posts')
      .updateOne({ id }, { $set: { 
        fulfilled_by: fulfillUser,
        fulfilled_date: nowDays,
      }
    })
    res.sendStatus(200);
  }
  catch(err){
    console.error(err);
    res.sendStatus(500)
  }
})

module.exports = router;
