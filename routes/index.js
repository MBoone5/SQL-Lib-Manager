const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

// redirect to books from root
router.get('/', function(req, res) {
  res.redirect('/books');
});

// GET - main books page 
router.get('/books', function (req, res) {
  Books.findAll().then((result) => {
    res.render('index', { books: result });
  }).catch((err) => {
    
  });
});

// GET -  new book form
router.get('/books/new', function (req, res) {
  res.render('index', { title: 'Express' });
});

// POST - new book form

// GET - book details
router.get('/books/:id', function (req, res) {
  res.render('index', { title: 'Express' });
});

// POST - update book details

// POST - delete book
router.get('/books/:id/delete', function (req, res) {
  res.render('index', { title: 'Express' });
});

// export routing object
module.exports = router;
