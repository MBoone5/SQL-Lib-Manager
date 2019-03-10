// imports
const express = require('express');
const path = require('path');
const logger = require('morgan');

// initializing the app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev')); // dev logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// --------- routing -----------
// main routing module
const router = require('./routes/index');
app.use('/', router);

// global error handler
app.use((err, req, res, next) => {
  // render the error page
  res.render('error', {error: err});
});

module.exports = app;