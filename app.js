var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var sass          = require('node-sass-middleware')

var routes        = require('./routes/index');
var pokemon       = require('./routes/pokemon');
var item          = require('./routes/item');
var location      = require('./routes/location');
var request       = require('./routes/request');

var app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/pokemon', pokemon);
app.use('/item', item);
app.use('/location', location);
app.use('/request', request);

// SASS Integration
app.use(
  sass({
    src         : path.join(__dirname, '/public/stylesheets/sass'), //where the sass files are 
    dest        : path.join(__dirname, '/public/stylesheets'), //where css should go
    debug       : false, // obvious
    outputStyle : 'compressed',
    force       : true,
    prefix      : '/stylesheets' //prefix of when we call it
  })
); 

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error : err,
      response : err.err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
    response : err.err
  });
});

app.listen(app.get('port'), function() {
  var portNumber = app.get('port');
  var msg = 'http://localhost:' + portNumber;
  console.log(msg)
});

module.exports = app;
