var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();

const dbService = require('../db.js');

const default_user = 'user';

const msInDays = 1000 * 3600 * 24;

const sortPosts = (posts) => {
  posts.sort((p1,p2) => {
    if (p1.need_by === p2.need_by) return p1.created - p2.created;
    else if (p1.need_by === 'ASAP') return -1
    else if (p1.need_by === 'anytime') return 1
    else if (p2.need_by === 'anytime') return -1;
    else if (p2.need_by === 'ASAP') return 1;
    else return p1.need_by - p2.need_by;
  })
}

const parseUsername = async (req, res, next) => {
  // if the user has put a username into the query string
  if (req.query.username) {
    // check if the username exists in the database, if so, assign the session username
    const db = dbService.getDb();
    const userExists = await db.collection('users').countDocuments({ username: req.query.username }, { limit: 1 })
    if (userExists) {
      req.session.username = req.query.username;
    }
  }
  // otherwise use the default username
  if (!req.session.username) req.session.username = default_user;
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
      username: { $ne: req.session.username },
      fulfilled_by: { $exists: false },
      $or: [
        { need_by: { $type: 'string'}},
        { need_by: { $gte : nowDays }},
      ]
    })
    .toArray()

  sortPosts(feed);

  const users = await db.collection("users").find({}).toArray()
  
  res.render('pages/index', { posts: feed, users });

});

router.get('/profile', async (req, res, next) => {
  const db = dbService.getDb();

  const user = await db.collection('users').findOne({ username: req.session.username });

  const nowDays = Math.floor(Date.now()/msInDays)*msInDays;
  const posts = await db.collection("posts")
    .find({
      username: req.session.username,
      // username: 'user',
      fulfilled_by: { $exists: false },
      $or: [
        { need_by: { $type: 'string'}},
        { need_by: { $gte : nowDays }},
      ]
    })
    .toArray()

  sortPosts(posts);
  
  // a users history is all the fulfilled posts they've either created or fulfilled
  const history = await db.collection("posts")
    .find({
      fulfilled_by: { $exists: true },
      $or: [
        { fulfilled_by: req.session.username },
        { username: req.session.username },
      ]
    })
    .toArray()
  
  history.sort((p1,p2) => p2.fulfilled_date - p1.fulfilled_date);

  console.log(history)

  const users = await db.collection("users").find({}).toArray()

  res.render('pages/profile', { name: user.name, username: user.username, image: user.image, points: user.points, posts, users, history });
});

// Renders the "example" page
router.get('/example', function(req, res, next) {
  res.render('pages/example', {foo:'bar'});
});

// send over HTML of a component, useful for rendering components with new data without reloading entire page
router.post('/request-details', async function(req, res, next) {
  const db = dbService.getDb();
  const post = await db.collection('posts').findOne({ id: req.body.id })
  const users = await db.collection('users').find({}).toArray();
  const user = await db.collection('users').findOne({ username: post.username })
  res.render('components/request-details', { title: post.title, points: post.points, image: user.image,
    name: user.name, category: post.category, need_by: post.need_by, description: post.description,
    username: post.username, postId: post.id, users });
});


module.exports = router;
