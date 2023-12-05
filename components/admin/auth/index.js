const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', { layout: 'admin/layouts/simple-layout', title: 'Login'});
});
router.get('/login', function(req, res, next) {
  res.render('admin/login', { layout: 'admin/layouts/simple-layout', title: 'Login'});
});

router.get('/register', function(req, res, next) {
  res.render('admin/register', { layout: 'admin/layouts/simple-layout', title: 'Register'});
});

router.post('/', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      console.log('Error from server:', err); // Log error from server
      return res.status(500).send(err);
    }
    if (!user) {
      console.log('Error from user:', info.message); // Log error from user
      return res.status(400).send(info.message);
    }
    // NEED TO CALL req.login()!!!
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/admin/dashboard');
    });
  })(req, res, next);
}
);

router.get('/logout', function (req, res, next) {
 req.logOut(function(err){
   if (err) { return next(err); }
   return res.redirect('/admin');
 })
  })


module.exports = router;
