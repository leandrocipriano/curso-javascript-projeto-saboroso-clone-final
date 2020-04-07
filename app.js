var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Formidable 
var formbidable = require('formidable');
var path = require('path');


// Redis Configuration
const redis = require('redis');
const session = require('express-session');
//var connectRedis = require('connect-redis');
//var RedisStore = connectRedis(session);
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const redisOptions = {
  host: "localhost",
  logErrors: true,
  port: 6379
};

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var app = express();

app.use(function(req, res, next){

  if(req.method === 'POST')
  {
    var form = formbidable.IncomingForm({
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true
    });

    form.parse(req, function(err, fields, files){

      //Adicionando os files nas rotas
      req.fields = fields;
      req.files = files;

      //Enviar para próxima rota
      next();

    });
    
  } else {
    //Enviar para próxima rota
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  cookie: {
    maxAge: 6.04e+8 // week in seconds
  },
  rolling: true,
  secret:'P@ssW0rD',
  //Caso a sessão expire, ele cria uma nova
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient })
}));

app.use(function(req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

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
