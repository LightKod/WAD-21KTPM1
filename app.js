var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts')
const passport = require('passport');

var homeRouter = require('./components/user/home/home.router');
var productsRouter = require('./components/user/product/product.router');
var cartRouter = require('./components/user/cart/cart.router');
var loginRouter = require('./components/user/login/login.router');
var registerRouter = require('./components/user/register/register.router');
//Admin Routers
var adminDashboardRouter = require('./components/admin/dashboard');
var adminLoginRouter = require('./components/admin/login');
var adminRegisterRouter = require('./components/admin/register');
var adminCardListRouter = require('./components/admin/card');
var adminUserListRouter = require('./components/admin/userManagement');
var app = express();
//connect database server
var connect =require('./config/mongodbconect')
connect()
const session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')

app.use('/admin/dashboard',adminDashboardRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/admin/register', adminRegisterRouter);
app.use('/admin/card', adminCardListRouter);
app.use('/admin/card/edit', adminCardListRouter);
app.use('/admin/user', adminUserListRouter);

app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter)
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
