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

// detailed book router
router.route('/books/:id')
  .all((req, res, next) => {
    /* instead of finding the book on both the get and post, 
    find it once and pass it through middleware */
    Books.findByPk(req.params.id).then((result) => {
      res.locals.book = result;
      next();
    });
  })
  // GET - book details
  .get(function (req, res) {
    res.render('update-book', {target: `/books/${req.params.id}`});
  })
  // POST - update book details
  .post((req, res) => {
    res.locals.book.update(req.body).then((result) => {
      res.redirect(`/books/${result.id}`);
    }).catch((err) => {
      console.log(err);
    });
  });

// POST - delete book
router.get('/books/:id/delete', function (req, res) {
  res.render('index', { title: 'Express' });
});

// export routing handler
module.exports = router;
