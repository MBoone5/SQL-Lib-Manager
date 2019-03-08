const express = require('express');
const router = express.Router();
const Books = require('../models').Books;
const sequelize = require('sequelize');


// redirect to books from root
router.get('/', function(req, res) {
  res.redirect('/books');
});

// GET - main books page 
router.get('/books', function (req, res) {
  Books.findAll({
    order: sequelize.literal('year DESC')
  }).then((result) => {
    res.render('index', { books: result });
  }).catch((err) => {
    console.log(err);
  });
});

// routing wrapper for new books
router.route('/books/new') 
  // GET -  new book form
  .get((req, res) => {
    res.render('new-book');
  })
  // POST - new book form
  .post((req, res) => {
    Books.create(req.body).then((result) => {
      res.redirect(`/books/${result.id}`);
    }).catch((err) => {
      console.log(err);
    });
  });


// middleware to find the book by id
router.use('/books/:id', (req, res, next) => {
  /* instead of finding the book on 3 different routes, 
  find it once and pass it through middleware */
  Books.findByPk(req.params.id).then((result) => {
    res.locals.book = result;
    next();
  });
});

// GET - book details
router.get('/books/:id', (req, res) => {
  res.render('update-book', {target: `/books/${req.params.id}`});
});

// POST - update book details
router.post('/books/:id', (req, res) => {
  res.locals.book.update(req.body).then(() => {
    res.redirect('/books');
  }).catch((err) => {
    console.log(err);
  });
});

// POST - delete book
router.post('/books/:id/delete', function (req, res) {
  res.locals.book.destroy().then(() => {
    res.redirect('/books');
  }).catch((err) => {
    console.log(err);
  });
});

// export routing handler
module.exports = router;
