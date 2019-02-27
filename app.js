var createError = require('http-errors');
var flash = require('express-flash');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require('express-hbs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

var db = require('./models/db');

var indexRouter = require('./routes/index');
var inventoryRouter = require('./routes/inventory');
var customerRouter = require('./routes/customer');
var ticketRouter = require('./routes/ticket');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views',
  defaultLayout:"./views/layout.hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Gadget Pro Tulsa'));
app.use(session({
    resave: false,
    cookie: { maxAge: 6000000 },
    secret: config.session.ecret,
    saveUninitialized: true,
    cookie:{secure:false} // Need to change to true when site has SSL
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);
app.use('/customer', customerRouter);
app.use('/ticket', ticketRouter);
app.use('/user',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// allow CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


module.exports = app;
