var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/ticket')
  req.flash('warning','There is no home page yet!')
  res.render('index', {user:req.user});
});

module.exports = router;
