const express = require('express');
const router = express.Router();

const Tortilla = require('../models/Tortilla');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/new', (req, res, next) => {
  res.render('create');
});

router.post('/new', async (req, res, next) => {
  const newTortilla = req.body;
  try {
    await Tortilla.create(newTortilla);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
