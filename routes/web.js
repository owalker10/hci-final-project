var express = require('express');
var router = express.Router();

const dbService = require('../db.js');

const default_user = 'user';

const msInDays = 1000 * 3600 * 24;

const parseUsername = (req, res, next) => {
  // if the user has put a username into the query string
  if (req.query.username) {
    // check if the username exists in the database, if so, assign the session username
    const db = dbService.getDb();
    if (db.collection.countDocuments({ username: req.query.username }, { limit: 1 }))
      req.session.username = req.query.username;
  }
  // otherwise use the default username
  else if (!req.session.username) req.session.username = default_user;
  res.locals.currentUser = req.session.username
  next()
}
router.use(parseUsername)

// Renders the homepage
router.get('/', async (req, res, next) => {
  const db = dbService.getDb();
  const nowDays = Math.floor(Date.now()/msInDays)*msInDays;
  // feed is all posts not created by current user with most recent first
  // additionally, requests with expired "need_by" dates are excluded
  const feed = await db.collection("posts")
    .find({
      username: { $ne: default_user },
      fullfilled_by: { $exists: false },
      $or: [
        { need_by: { $type: 'string'}},
        { need_by: { $gte : nowDays }},
      ]
    })
    .toArray()

  const users = await db.collection("users").find({}).toArray()
  
  res.render('pages/index', { posts: feed, users });

});

router.get('/profile', function(req, res, next) {
  res.render('pages/profile');
});

// Renders the "example" page
router.get('/example', function(req, res, next) {
  res.render('pages/example', {foo:'bar'});
});

// send over HTML of a component, useful for rendering components with new data without reloading entire page
router.post('/test', function(req, res, next) {
  res.render('components/button', { size: 'small', type: 'primary', text: 'close', id: 'test'});
});

// send over HTML of a component, useful for rendering components with new data without reloading entire page
router.post('/request-details', async function(req, res, next) {
  const db = dbService.getDb();
  const post = await db.collection('posts').findOne({ id: req.body.id })
  const user = await db.collection('users').findOne({ username: post.username })
  console.log('post', post)
  res.render('components/request-details', { title: post.title, points: post.points, image: user.image,
    name: user.name, category: post.category, need_by: post.need_by, description: post.description });
});


module.exports = router;
