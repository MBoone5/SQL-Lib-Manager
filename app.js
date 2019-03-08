// imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// initializing the app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// --------- routing -----------
// main routing module
const router = require('./routes/index');
app.use('/', router);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals
//   res.locals.error = err;
  
//   // render the error page
//   res.render('error');
// });

module.exports = app;