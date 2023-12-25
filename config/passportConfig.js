const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var GoogleStrategy = require('passport-google-oidc');
const User = require('../models/User');
// Kích hoạt và sử dụng Passport trong ứng dụng

function generateUniqueId(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}
/// Cấu hình Passport Local Strategy cho đăng ký
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    console.log(email);
    console.log(password);
    const id= generateUniqueId(email);
    // Kiểm tra xem email đã được sử dụng chưa
    User.findOne({ 'id': id }).then((user) => {
      if (user) {
        return done(null, false, { message: 'Email đã tồn tại.' });
      } else {
        
        // Tạo người dùng mới và lưu vào cơ sở dữ liệu
        const newUser = new User();
        newUser.id = id;
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        newUser.save().then(() => {
          console.log({ 'id': id, 'email': email });
        }).catch((err) => {
          console.log(err);
        })
          return done(null, newUser);
        }
      }).catch((err) => {
          return done(err);
        });;
      }
));

// Cấu hình Passport Local Strategy cho đăng nhập
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    console.log(email);
    console.log(password);
    const id= generateUniqueId(email);
    // Kiểm tra xem người dùng có tồn tại không
    User.findOne({ 'id': id }).then((user) => {
      if (!user) {
        console.log('Tài Khoảng không tồn tại.');
        return done(null, false, { message: 'Tài Khoảng không tồn tại.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Mật Khẩu không đúng.' });
      }
      console.log(user);
      return done(null, user);
    }).catch((err) => {
      return done(err);
    });
  }));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/login/oauth2/redirect/google',
  scope: [ 'profile','email' ],
  prompt: 'select_account'
}, function verify(issuer, profile, done) {
  console.log(profile);
  const id= generateUniqueId(profile.emails[0].value);
    // Kiểm tra xem email đã được sử dụng chưa
    User.findOne({ 'id': id }).then((user) => {
      if (user) {
        return done(null, user);
      } else {
        
        // Tạo người dùng mới và lưu vào cơ sở dữ liệu
        const newUser = new User();
        newUser.id = id;
        newUser.email = profile.email;
        newUser.password = bcrypt.hashSync(profile.id, bcrypt.genSaltSync(10));
        newUser.save().then(() => {
          console.log({ 'id': id, 'email': email });
        }).catch((err) => {
          console.log(err);
        })
          return done(null, newUser);
        }
      }).catch((err) => {
          return done(err);
        });;
  // return cb(null, profile);
 
}));
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log('serializeUser');
    console.log(user);
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log('deserializeUser');
    console.log(user);
    return cb(null, user);
  });
});