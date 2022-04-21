var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()

var session = require('express-session')

var dayjs = require('dayjs')

var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');

const dbService = require('./db.js');
dbService.connectToServer(err => {
  if (err) console.error(err)
})

var app = express();

console.log(`env: ${process.env.NODE_ENV}`)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'not important', // this is all fake data in a non-sensitive environment
  resave: false,
  saveUninitialized: true
}))

app.locals.dayjs = dayjs;



app.use('/', webRouter);
app.use('/api', apiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};
  if (req.app.get('env') === 'dev') console.error(err)

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});


app.locals.getFieldFromUser = (users,field,username) => {
  return users.find(user => user.username === username)[field]
}

module.exports = app;
