const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
// var passportJWT = require("passport-jwt");

// var ExtractJwt = passportJWT.ExtractJwt;
// var JwtStrategy = passportJWT.Strategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const boardsRouter = require('./components/boards');
const authRouter = require('./components/auth');
const cardRouter = require('./components/card');

//auth passport jwt
// const authService = require('./components/auth/authService');
// const jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = process.env.KEY_SECRET;

// const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//   // usually this would be a database call:
//   const user = authService.getUserByUsername(jwt_payload.username);
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });

// passport.use(strategy);


//connect to database
mongoose.connect(process.env.URI, {useNewUrlParser: true});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boards',boardsRouter);
app.use('/auth',authRouter);
app.use('/card',cardRouter);

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

module.exports = app;
