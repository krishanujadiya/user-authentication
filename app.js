var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const mongoose = require('mongoose')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// // JWT token verification middleware
// function verifyToken(req, res, next) {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ error: 'Access denied' });

//   jwt.verify(token, 'secret_key', (err, decoded) => {
//     if (err) return res.status(401).json({ error: 'Invalid token' });
//     req.userId = decoded._id;
//     next();
//   });
// }

// Protected routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', productRouter);

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

if (process.env.ENV === 'dev') {

const connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/* Display message in the console if the connection is successful. */
mongoose.connection.once('open', () => {
  console.log('connected!')
})
}
module.exports = app;
