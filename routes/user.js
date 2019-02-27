var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// restrict index for logged in user only
router.get('/login',(req,res,next)=>{
  res.render('user/login')
})
router.post('/login', passport.authenticate('local',{
  successRedirect: '/ticket',
  failureRedirect: '/user/login',
  failureFlash: true,
  successFlash: 'Logged In!'
}));

router.get('/register',(req,res,next)=>{
  if(!req.user) res.render('user/register')
  else{
    req.flash('info','You are already registered!')
    res.render('user/login')
  }
})
router.post('/register', function(req, res, next) {
  console.log('registering user');
  User.register(new User({username: req.body.username,
                                    name: req.body.name,
                                    phone:req.body.phone}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/')
})

module.exports = router;
