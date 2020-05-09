var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');
var passport = require('passport');
var DiscordStrategies = require('./strategies/discordstrategies');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var formidable = require('formidable');
var db = require('./database/database');
var config = require('./siteconfig.json');
require('dotenv').config();

db.then(() => console.log("Connected to Kurisu database."))

//routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');

var app = express();
app.use(helmet());
// Middleware
app.use(session({
  secret: config.secret,
  cookie: {
    maxAge: 60000 * 60 * 72
  },
  saveUninitialized: false,
  name: 'Yukiko_Yummy_cookie',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by', 'Poggy!');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
