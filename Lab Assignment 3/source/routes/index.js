var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express' });
});


router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

module.exports = router;
