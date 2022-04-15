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
  res.render('pages/example', {foo:'bar'});
});

// send over HTML of a component, useful for rendering components with new data without reloading entire page
router.post('/test', function(req, res, next) {
  res.render('components/button', { size: 'small', type: 'primary', text: 'close', id: 'test'});
});


module.exports = router;
