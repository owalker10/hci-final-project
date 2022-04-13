var express = require('express');
var router = express.Router();

// Renders the homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Renders the "example" page
router.get('/example', function(req, res, next) {
  res.render('example', { title: 'Example' });
});

module.exports = router;
