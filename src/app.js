'use strict';
const createError = require('http-errors'),
      express = require('express'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan');

const usersRouter = require('./routes/users'),
      clientsRouter = require('./routes/clients'),
      questionsRouter = require('./routes/questions'),
      answersRouter = require('./routes/answers'),
      conversationsRouter = require('./routes/conversations');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
app.use('/conversations', conversationsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
