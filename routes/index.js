// imports
const express = require('express');
const router = express.Router();
const Books = require('../models').Books;
const sequelize = require('sequelize');
const createError = require('http-errors');


// redirect to books from root
router.get('/', (req, res, next) => {
  res.redirect('/books');
});

// GET - main books page 
router.get('/books', (req, res, next) => {
  Books.findAll({
    order: sequelize.literal('year DESC')
  }).then((result) => {
    res.render('index', { books: result });
  }).catch((err) => {
    next(err);
  });
});

// routing wrapper for new books
router.route('/books/new') 
  // GET -  new book form
  .get((req, res, next) => {
    Promise.resolve().then(() => {
      res.render('new-book');
    }).catch((err) => {
      next(err);
    });
  })
  // POST - new book form
  .post((req, res, next) => {
    Books.create(req.body).then(() => {
      res.redirect('/books');
    }).catch((err) => {
      next(err);
    });
  });


// middleware to find the book by id
router.all('/books/:id', (req, res, next) => {
  /* instead of finding the book on 3 different routes, 
  find it once and pass it through middleware */
  Books.findByPk(req.params.id).then((result) => {
    res.locals.book = result;
    next();
  }).catch((err) => {
    next(err);
  });
});

// GET - book details
router.get('/books/:id', (req, res, next) => {
  Promise.resolve().then(() => { // Promise.resolve() removes the overhead of try {}
    res.render('update-book', { target: `/books/${req.params.id}` });
  }).catch((err) => {
    next(err);
  });
});

// POST - update book details
router.post('/books/:id', (req, res, next) => {
  res.locals.book.update(req.body).then(() => {
    res.redirect('/books');
  }).catch((err) => {
    next(err);
  });
});

// POST - delete book
router.post('/books/:id/delete', (req, res, next) => {
  res.locals.book.destroy().then(() => {
    res.redirect('/books');
  }).catch((err) => {
    next(err);
  });
});

// 404 route catch
router.use((req, res, next) => {
  next(createError(404));
});

// err handler
router.use((err, req, res, next) => {
  if(err.status === 404) { //if the route isn't found
    res.render('page-not-found');
  } else { // if the error occurs in code
    next(createError(500, err));
  }
});


// export routing handler
module.exports = router;
