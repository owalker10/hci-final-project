var express = require('express');
var router = express.Router();

// Renders the homepage
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/profile', function(req, res, next) {
  res.render('pages/profile');
});

// Renders the "example" page
router.get('/example', function(req, res, next) {
  res.render('pages/example');
});

module.exports = router;
