// defs & imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// initializing the app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --------- routing -----------
const router = require('./routes');
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// dev server
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App running on port 3000');
});